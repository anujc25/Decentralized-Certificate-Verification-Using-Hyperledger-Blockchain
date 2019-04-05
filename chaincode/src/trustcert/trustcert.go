package main

/* Imports
 * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
 * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
 */
import (
	"bytes"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/hyperledger/fabric/core/chaincode/lib/cid"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

const UNIVERSITY_ROLE = "UNIVERSITY"
const STUDENT_ROLE = "STUDENT"
const EMPLOYER_ROLE = "EMPLOYER"

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
	} else if function == "queryDiplomaForEmployer" {
		return s.queryDiplomaForEmployer(APIstub, args)
	} else if function == "queryDiplomaForStudent" {
		return s.queryDiplomaForStudent(APIstub, args)
	} else if function == "fetchUserRole" {
		return s.fetchUserRole(APIstub)
	} else if function == "shareDiploma" {
		return s.shareDiploma(APIstub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

// TODO: Check access before sending query result
// Expected args[]
// 	   0
// [diplomaUUID]
func (s *SmartContract) queryDiploma(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	response := Response{}

	if len(args) != 1 {
		response.Error = "Incorrect number of arguments. Expecting 1"
		return sendResponse(response, false)
	}

	diplomaMetadataAsBytes, err := APIstub.GetState(args[0])
	if diplomaMetadataAsBytes == nil {
		response.Error = "No Diploma found for given ID!"
		return sendResponse(response, false)
	}
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}

	response.Result = diplomaMetadataAsBytes
	return sendResponse(response, true)
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

// Expected args[]
// 	0		1		2	  3		4	   5	  6
// [UUID, term, degree, dept, name, email, ipfslink]
func (s *SmartContract) addDiploma(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	response := Response{}
	fmt.Println("- start add diploma")
	// RBAC check
	value, _, err := cid.GetAttributeValue(APIstub, "role")
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}
	if value != UNIVERSITY_ROLE {
		response.Error = "Current role" + value + "is unauthorized for the transaction"
		return sendResponse(response, false)
	}

	if len(args) != 7 {
		response.Error = "Incorrect number of arguments. Expecting 7"
		return sendResponse(response, false)
	}

	// fetching IssuerID from certificate
	issuerID, err := cid.GetID(APIstub)
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}

	// Upload diploma transaction
	diplomaUUID := args[0]
	timeStamp := time.Now().UTC().String()
	var diplomaMetadata = DiplomaMetadata{Timestamp: timeStamp, DiplomaUUID: args[0], Issuer: issuerID, Term: args[1], Degree: args[2], Department: args[3], Name: args[4], EmailId: args[5], IpfsLink: args[6]}

	diplomaMetadataAsBytes, err := json.Marshal(diplomaMetadata)
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}

	err = APIstub.PutState(diplomaUUID, diplomaMetadataAsBytes)
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}

	// Indexing diploma for different query
	// Issuer - UUID index to query all the diploma uploaded by a issuer
	indexName := "issuer~uuid"
	issuerUuidIndexKey, err := APIstub.CreateCompositeKey(indexName, []string{diplomaMetadata.Issuer, diplomaMetadata.DiplomaUUID})
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}
	//  Save index entry to state. Only the key name is needed, no need to store a duplicate copy of the marble.
	//  Note - passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
	nilValue := []byte{0x00}
	err = APIstub.PutState(issuerUuidIndexKey, nilValue)
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}

	// studentEmailId - UUID index to query all the diploma of a student
	// studentEmailId -> Student's emailId
	// uuid -> diplomaUUID
	indexName = "studentEmailId~uuid"
	emailidUuidIndexKey, err := APIstub.CreateCompositeKey(indexName, []string{diplomaMetadata.EmailId, diplomaMetadata.DiplomaUUID})
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}
	err = APIstub.PutState(emailidUuidIndexKey, nilValue)
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}

	// ==== Diploma saved and indexed. Return success ====
	fmt.Println("- end add diploma")
	return sendResponse(response, true)
}

func (s *SmartContract) updateDiploma(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	return sendResponse(Response{}, true)
}

// ===========================================================================================
// constructQueryResponseFromIterator constructs a JSON array containing query results from
// a given result iterator
// ===========================================================================================
func constructQueryResponseFromIterator(APIstub shim.ChaincodeStubInterface, resultsIterator shim.StateQueryIteratorInterface) ([]string, error) {
	// buffer is a JSON array containing QueryResults
	response := []string{}
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		_, compositeKeyParts, err := APIstub.SplitCompositeKey(queryResponse.Key)
		uuid := compositeKeyParts[1]

		diplomaMetadataAsBytes, err := APIstub.GetState(uuid)
		if diplomaMetadataAsBytes == nil || err != nil {
			continue
		}
		response = append(response, string(diplomaMetadataAsBytes))
	}
	return response, nil
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

// No arguments required
func (s *SmartContract) queryDiplomaByIssuer(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	response := Response{}

	// RBAC check
	value, _, err := cid.GetAttributeValue(APIstub, "role")
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}
	if value != UNIVERSITY_ROLE {
		response.Error = "Current role" + value + "is unauthorized for the transaction"
		return sendResponse(response, false)
	}

	// fetching IssuerID from certificate
	issuer, err := cid.GetID(APIstub)
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}

	// Query the Issuer~UUID index by issuer
	// This will execute a key range query on all keys starting with 'Issuer'
	issuerDiplomaResultsIterator, err := APIstub.GetStateByPartialCompositeKey("issuer~uuid", []string{issuer})
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}
	defer issuerDiplomaResultsIterator.Close()

	result, err := constructQueryResponseFromIterator(APIstub, issuerDiplomaResultsIterator)
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}

	fmt.Printf("- queryDimplomaByIssuer queryResult:\n%v\n", result)

	response.Result = result
	return sendResponse(response, true)
}

// No arguments required
func (s *SmartContract) queryDiplomaForEmployer(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	response := Response{}

	// RBAC check
	value, _, err := cid.GetAttributeValue(APIstub, "role")
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}
	if value != EMPLOYER_ROLE {
		response.Error = "Current role" + value + "is unauthorized for the transaction queryDiplomaForEmployer"
		return sendResponse(response, false)
	}

	// get emailId of employer from certificate
	employerEmailId, _, err := cid.GetAttributeValue(APIstub, "emailId")
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}

	if strings.Compare(employerEmailId, "") != 0 {
		// Query the employerEmailId~uuid index by emailId
		// This will execute a key range query on all keys starting with 'employerEmailId'
		employerDiplomaResultsIterator, err := APIstub.GetStateByPartialCompositeKey("employerEmailId~uuid", []string{employerEmailId})
		if err != nil {
			response.Error = err.Error()
			return sendResponse(response, false)
		}
		defer employerDiplomaResultsIterator.Close()

		result, err := constructQueryResponseFromIterator(APIstub, employerDiplomaResultsIterator)
		if err != nil {
			response.Error = err.Error()
			return sendResponse(response, false)
		}

		fmt.Printf("- queryDimplomaByEmployer queryResult:\n%v\n", result)

		response.Result = result
		return sendResponse(response, true)
	}

	response.Error = "No emailid found for the requesting user(employer)"
	return sendResponse(response, false)
}

// Expected args[]
// [list of students emailIds]
func (s *SmartContract) queryDiplomaForStudent(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	response := Response{}

	// RBAC check
	value, _, err := cid.GetAttributeValue(APIstub, "role")
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}
	if value != STUDENT_ROLE {
		response.Error = "Current role" + value + "is unauthorized for the transaction queryDiplomaForStudent"
		return sendResponse(response, false)
	}

	combinedResult := []string{}

	for _, studentEmailId := range args {
		if strings.Compare(studentEmailId, "") != 0 {
			// Query the studentEmailId~uuid index by emailId
			// This will execute a key range query on all keys starting with 'studentEmailId'
			emailIdDiplomaResultsIterator, err := APIstub.GetStateByPartialCompositeKey("studentEmailId~uuid", []string{studentEmailId})
			if err != nil {
				response.Error = err.Error()
				return sendResponse(response, false)
			}
			defer emailIdDiplomaResultsIterator.Close()

			result, err := constructQueryResponseFromIterator(APIstub, emailIdDiplomaResultsIterator)
			if err != nil {
				response.Error = err.Error()
				return sendResponse(response, false)
			}
			combinedResult = append(combinedResult, result...)
		}
	}

	fmt.Printf("- queryDimplomaForStudent queryResult:\n%v\n", combinedResult)

	response.Result = combinedResult
	return sendResponse(response, true)
}

func (s *SmartContract) fetchUserRole(APIstub shim.ChaincodeStubInterface) sc.Response {
	response := Response{}
	value, _, err := cid.GetAttributeValue(APIstub, "role")
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}
	response.Result = Role{Role: value}
	return sendResponse(response, true)
}

// Expected args[]
// 	0		1
// [emailID, UUID]
func (s *SmartContract) shareDiploma(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	response := Response{}

	if len(args) != 2 {
		response.Error = "Incorrect number of arguments. Expecting 2"
		return sendResponse(response, false)
	}

	// RBAC check
	value, _, err := cid.GetAttributeValue(APIstub, "role")
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}
	if value != STUDENT_ROLE {
		response.Error = "unauthorized! Only students are allowed to share their diploma"
		return sendResponse(response, false)
	}

	// Creating a compositeKey with the emailid of EMPLOYER who is granted access to diploma and diploma UUID
	// uuid -> Diploma UUID
	// employerEmailId -> Employer's emailId
	indexName := "employerEmailId~uuid"
	emailIdUuidIndexKey, err := APIstub.CreateCompositeKey(indexName, []string{args[0], args[1]})
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}
	nilValue := []byte{0x00}
	err = APIstub.PutState(emailIdUuidIndexKey, nilValue)
	if err != nil {
		response.Error = err.Error()
		return sendResponse(response, false)
	}
	return sendResponse(response, true)
}

// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {
	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}

func sendResponse(response Response, bSuccess bool) sc.Response {
	responseStr, _ := json.Marshal(response)
	if bSuccess {
		return shim.Success(responseStr)
	}
	return shim.Error(string(responseStr))
}
