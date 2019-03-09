'use strict'

const FabricCAServices = require('fabric-ca-client')
const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network')
const fs = require('fs')
const path = require('path')

// capture network variables from config.json
const configPath = path.join(process.cwd(), '/config.json')
const configJSON = fs.readFileSync(configPath, 'utf8')
const config = JSON.parse(configJSON)
var connectionFile = config.connection_file
var gatewayDiscovery = config.gatewayDiscovery
var channelName = config.channelName
var chaincodeName = config.chaincodeName
var orgMSPID = config.orgMSPID
var caName = config.caName

// connect to the connection file
const ccpPath = path.join(process.cwd(), connectionFile)
const ccpJSON = fs.readFileSync(ccpPath, 'utf8')
const ccp = JSON.parse(ccpJSON)
const walletPath = path.join(process.cwd(), '/wallet')

// login user with userName, secret
exports.loginUniversity = async function (userName, secret) {
  try {
    var response = { result: null, error: null }

    const caURL = ccp.certificateAuthorities[caName].url
    const ca = new FabricCAServices(caURL)

    // Create a new file system based wallet for managing identities.
    const wallet = new FileSystemWallet(walletPath)

    const userExists = await wallet.exists(userName)
    if (userExists) {
      await wallet.delete(userName)
    }

    // Enroll the user, and import the new identity into the wallet.
    const enrollment = await ca.enroll({ enrollmentID: userName, enrollmentSecret: secret })
    const identity = X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes())
    wallet.import(userName, identity)

    response = fetchUserRole(userName)
    return response
  } catch (error) {
    console.error(`Failed to authenticate: ${error}`)
    response.error = error.message
    return response
  }
}

function fetchUserRole (userName) {
  try {
    var response = { result: null, error: null }

    // Create a new file system based wallet for managing identities.
    const wallet = new FileSystemWallet(walletPath)

    // Check to see if we've already enrolled the user.
    const userExists = wallet.exists(userName)
    if (!userExists) {
      console.log('An identity for the user ' + userName + ' does not exist in the wallet')
      response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first'
      return response
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway()
    gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery })

    // Get the network (channel) our contract is deployed to.
    const network = gateway.getNetwork(channelName)

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName)

    // fetchUserRole transaction - requires no arguments, ex: ('fetchUserRole')
    const result = contract.evaluateTransaction('fetchUserRole')
    response.result = result
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`)

    return response
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`)
    response.error = error.message
    return response
  }
}
