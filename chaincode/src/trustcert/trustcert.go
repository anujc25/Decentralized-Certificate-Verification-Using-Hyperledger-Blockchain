package main

/* Imports
 * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
 * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
 */
import (
	"bytes"
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/lib/cid"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

const UNIVERSITY_ROLE = "UNIVERSITY"

// SmartContract Define the Smart Contract structure
type SmartContract struct {
}

// DiplomaMetadata Defines the diploma structure, with 9 properties.  Structure tags are used by encoding/json library
type DiplomaMetadata struct {
	Timestamp   string `json:"timestamp"`
	DiplomaUUID string `json:"diplomaUUID"`
	Issuer      string `json:"issuer"`
	Term        string `json:"term"`
	Degree      string `json:"degree"`
	Department  string `json:"department"`
	Name        string `json:"name"`
	EmailId     string `json:"emailId"`
	IpfsLink    string `json:"ipfsLink"`
}

/*
 * The Init method is called when the Smart Contract "vericert" is instantiated by the blockchain network
 * Best practice is to have any Ledger initialization in separate function -- see initLedger()
 */
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Smart Contract "fabcar"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "queryDiploma" {
		return s.queryDiploma(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "addDiploma" {
		return s.addDiploma(APIstub, args)
	} else if function == "updateDiploma" {
		return s.updateDiploma(APIstub, args)
	} else if function == "queryDiplomaByIssuer" {
		return s.queryDiplomaByIssuer(APIstub, args)
	} else if function == "fetchUserRole" {
		return s.fetchUserRole(APIstub)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

// Expected args[]
// 	   0
// [diplomaUUID]
func (s *SmartContract) queryDiploma(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	diplomaMetadataAsBytes, err := APIstub.GetState(args[0])
	if diplomaMetadataAsBytes == nil {
		return shim.Error("No Diploma found for given ID!")
	}
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(diplomaMetadataAsBytes)
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

// Expected args[]
// 		0		1		2		3	  4		5	   6	7		8
// [timestamp, UUID, issuer, term, degree, dept, name, email, ipfslink]
func (s *SmartContract) addDiploma(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	fmt.Println("- start add diploma")
	// RBAC check
	value, _, err := cid.GetAttributeValue(APIstub, "role")
	if err != nil {
		errResponse := "{\"error\": " + err.Error() + "\"}"
		return shim.Error(errResponse)
	}
	if value != UNIVERSITY_ROLE {
		errResponse := "{\"error\": " + "Current role" + value + "is unauthorized for the transaction" + "\"}"
		return shim.Error(errResponse)
	}

	if len(args) != 9 {
		errResponse := "{\"error\": " + "Incorrect number of arguments. Expecting 9" + "\"}"
		return shim.Error(errResponse)
	}

	// Upload diploma transaction
	var diplomaUUID = args[1]
	var diplomaMetadata = DiplomaMetadata{Timestamp: args[0], DiplomaUUID: args[1], Issuer: args[2], Term: args[3], Degree: args[4], Department: args[5], Name: args[6], EmailId: args[7], IpfsLink: args[8]}

	diplomaMetadataAsBytes, err := json.Marshal(diplomaMetadata)
	if err != nil {
		return shim.Error(err.Error())
	}

	err = APIstub.PutState(diplomaUUID, diplomaMetadataAsBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// Indexing diploma for different query
	// Issuer - UUID index to query all the diploma uploaded by a issuer
	indexName := "issuer~uuid"
	issuerUuidIndexKey, err := APIstub.CreateCompositeKey(indexName, []string{diplomaMetadata.Issuer, diplomaMetadata.DiplomaUUID})
	if err != nil {
		return shim.Error(err.Error())
	}
	//  Save index entry to state. Only the key name is needed, no need to store a duplicate copy of the marble.
	//  Note - passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
	nilValue := []byte{0x00}
	APIstub.PutState(issuerUuidIndexKey, nilValue)

	// ==== Diploma saved and indexed. Return success ====
	fmt.Println("- end add diploma")
	return shim.Success(nil)
}

func (s *SmartContract) updateDiploma(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	return shim.Success(nil)
}

// ===========================================================================================
// constructQueryResponseFromIterator constructs a JSON array containing query results from
// a given result iterator
// ===========================================================================================
func constructQueryResponseFromIterator(resultsIterator shim.StateQueryIteratorInterface) (*bytes.Buffer, error) {
	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	return &buffer, nil
}

// ===========================================================================================
// addPaginationMetadataToQueryResults adds QueryResponseMetadata, which contains pagination
// info, to the constructed query results
// ===========================================================================================
func addPaginationMetadataToQueryResults(buffer *bytes.Buffer, responseMetadata *sc.QueryResponseMetadata) *bytes.Buffer {

	buffer.WriteString("[{\"ResponseMetadata\":{\"RecordsCount\":")
	buffer.WriteString("\"")
	buffer.WriteString(fmt.Sprintf("%v", responseMetadata.FetchedRecordsCount))
	buffer.WriteString("\"")
	buffer.WriteString(", \"Bookmark\":")
	buffer.WriteString("\"")
	buffer.WriteString(responseMetadata.Bookmark)
	buffer.WriteString("\"}}]")

	return buffer
}

// Expected args[]
// 	   0
// [issuer]
func (s *SmartContract) queryDiplomaByIssuer(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	// RBAC check
	value, _, err := cid.GetAttributeValue(APIstub, "role")
	if err != nil {
		errResponse := "{\"error\": " + err.Error() + "\"}"
		return shim.Error(errResponse)
	}
	if value != UNIVERSITY_ROLE {
		errResponse := "{\"error\": " + "Current role" + value + "is unauthorized for the transaction" + "\"}"
		return shim.Error(errResponse)
	}

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	fmt.Println("- start queryDiplomaByIssuer", args[0])
	issuer := args[0]

	// Query the Issuer~UUID index by color
	// This will execute a key range query on all keys starting with 'Issuer'
	issuerDiplomaResultsIterator, err := APIstub.GetStateByPartialCompositeKey("issuer~uuid", []string{issuer})
	if err != nil {
		return shim.Error(err.Error())
	}
	defer issuerDiplomaResultsIterator.Close()

	buffer, err := constructQueryResponseFromIterator(issuerDiplomaResultsIterator)
	if err != nil {
		return shim.Error(err.Error())
	}

	fmt.Printf("- queryDimplomaByIssuer queryResult:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())

	return shim.Success(nil)
}

func (s *SmartContract) fetchUserRole(APIstub shim.ChaincodeStubInterface) sc.Response {
	value, _, err := cid.GetAttributeValue(APIstub, "role")
	if err != nil {
		errResponse := "{\"error\": " + err.Error() + "\"}"
		return shim.Error(errResponse)
	}
	response := "{\"role\": \"" + value + "\"}"
	return shim.Success([]byte(response))
}

// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {
	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
