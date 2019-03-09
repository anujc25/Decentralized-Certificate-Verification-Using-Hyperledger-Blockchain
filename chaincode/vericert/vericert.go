package main

/* Imports
 * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
 * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
 */
import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/lib/cid"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// SmartContract Define the Smart Contract structure
type SmartContract struct {
}

// CertificateMetadata Define the car structure, with 4 properties.  Structure tags are used by encoding/json library
type CertificateMetadata struct {
	Timestamp  string `json:"timestamp"`
	Issuer     string `json:"issuer"`
	UploadedBy string `json:"uploadedBy"`
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
	if function == "queryCertificate" {
		return s.queryCertificate(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "addCertificate" {
		return s.addCertificate(APIstub, args)
	} else if function == "updateCertificate" {
		return s.updateCertificate(APIstub, args)
	} else if function == "fetchUserRole" {
		return s.fetchUserRole(APIstub)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract) queryCertificate(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	certificateMetadataAsBytes, err := APIstub.GetState(args[0])
	if certificateMetadataAsBytes == nil {
		return shim.Error("No certificate found!")
	}
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(certificateMetadataAsBytes)
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

func (s *SmartContract) addCertificate(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 4 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}

	var certificateHash = args[0]
	var certificateMetadata = CertificateMetadata{Timestamp: args[1], Issuer: args[2], UploadedBy: args[3]}

	certificateMetadataAsBytes, err := json.Marshal(certificateMetadata)
	if err != nil {
		return shim.Error(err.Error())
	}

	err = APIstub.PutState(certificateHash, certificateMetadataAsBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(nil)
}

func (s *SmartContract) updateCertificate(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	return shim.Success(nil)
}

func (s *SmartContract) fetchUserRole(APIstub shim.ChaincodeStubInterface) sc.Response {
	value, found, err := cid.GetAttributeValue(APIstub, "role")
	if err != nil {
		errResponse = "{\"error\": " + err.Error() + "\"}"
		return shim.Error(errResponse)
	}
	response := "{\"role\": " + value + "\"}"
	return shim.Success(response)
}

// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {
	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
