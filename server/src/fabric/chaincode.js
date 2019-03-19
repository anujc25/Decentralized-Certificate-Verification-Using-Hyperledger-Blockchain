'use strict'

const { FileSystemWallet, Gateway } = require('fabric-network')
const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')

// capture network variables from config.json
const configPath = path.join(process.cwd(), '/config.json')
const configJSON = fs.readFileSync(configPath, 'utf8')
const config = JSON.parse(configJSON)
var connectionFile = config.connection_file
var gatewayDiscovery = config.gatewayDiscovery
var channelName = config.channelName
var chaincodeName = config.chaincodeName

// connect to the connection file
const ccpPath = path.join(process.cwd(), connectionFile)
const ccpJSON = fs.readFileSync(ccpPath, 'utf8')
const ccp = JSON.parse(ccpJSON)
const walletPath = path.join(process.cwd(), '/wallet')

// fetchUserRole involes fetchUserRole chaincode and get the user role from the certificate
exports.fetchUserRole = async function (userName) {
  try {
    var response = { result: null, error: null }
    var result = await getContract(userName)
    if (result.error) {
      response.error = result.error
      return response
    }

    // fetchUserRole transaction - requires no arguments, ex: ('fetchUserRole')
    result = await result.contract.evaluateTransaction('fetchUserRole')
    var role = JSON.parse(result.toString())
    console.log('ROLE:', role)
    return role
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`)
    return { role: '' }
  }
}

exports.addDiploma = async function (userName, studentName, studentEmail, issuer, term, degree, department, ipfsHash) {
  try {
    var response = { result: null, error: null }
    var result = await getContract(userName)
    if (result.error) {
      response.error = result.error
      return response
    }

    // addDiploma transaction - requires arguments [UUID, term, degree, dept, name, email, ipfslink]
    result = await result.contract.submitTransaction('addDiploma',
      uuidv1(), term, degree, department, studentName, studentEmail, ipfsHash)

    console.log('addDiploma result:', result)
    return result
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`)
    return ''
  }
}

async function getContract (userName) {
  // Create a new file system based wallet for managing identities.
  const wallet = new FileSystemWallet(walletPath)

  // Check to see if we've already enrolled the user.
  const userExists = await wallet.exists(userName)
  if (!userExists) {
    var errMsg = 'An identity for the user ' + userName + ' does not exist in the wallet'
    console.log(errMsg)
    return { contract: null, error: errMsg }
  }

  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway()
  await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery })

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork(channelName)

  // Get the contract from the network.
  const contract = network.getContract(chaincodeName)

  return { contract: contract, error: null }
}
