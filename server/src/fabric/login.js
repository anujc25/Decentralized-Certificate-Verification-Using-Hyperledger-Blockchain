'use strict'

const FabricCAServices = require('fabric-ca-client')
const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network')
const fs = require('fs')
const path = require('path')
const chaincode = require('./chaincode.js')

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

// loginUniversity user with userName, secret
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
    await wallet.import(userName, identity)

    var result = await chaincode.fetchUserRole(userName)
    response.result = result
    console.log('Response: ', response)
    return response
  } catch (error) {
    console.error(`Failed to authenticate: ${error}`)
    response.error = error.message
    return response
  }
}
