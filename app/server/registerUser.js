/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network')
const fs = require('fs')
const path = require('path')

// capture network variables from config.json
const configPath = path.join(process.cwd(), 'config.json')
const configJSON = fs.readFileSync(configPath, 'utf8')
const config = JSON.parse(configJSON)
var connectionFile = config.connection_file
var appAdmin = config.appAdmin
var orgMSPID = config.orgMSPID
var gatewayDiscovery = config.gatewayDiscovery

const ccpPath = path.join(process.cwd(), connectionFile)
const ccpJSON = fs.readFileSync(ccpPath, 'utf8')
const ccp = JSON.parse(ccpJSON)

var userName = ''
var userType = ''
var userEmail = ''

function usage () {
  console.log('Usage:')
  console.log('node registerUser.js <UNIVERSITY/EMPLOYER/STUDENT> <username> [<emailId>]')
}

function validateArgs () {
  if (process.argv.length < 3) {
    console.log('Invalid Arguments.')
    usage()
    return false
  }

  if (process.argv[2] === 'UNIVERSITY' || process.argv[2] === 'EMPLOYER' || process.argv[2] === 'STUDENT') {
    userType = process.argv[2]
  } else {
    console.log('Invalid Arguments.')
    usage()
    return false
  }
  userName = process.argv[3]

  if (userType === 'EMPLOYER' && process.argv.length < 4) {
    console.log('Invalid Arguments. EmailId required for userType=EMPLOYER')
    usage()
    return false
  }
  userEmail = process.argv[4]

  return true
}

if (!validateArgs()) {
  return
}

async function main () {
  try {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet')
    const wallet = new FileSystemWallet(walletPath)
    console.log(`Wallet path: ${walletPath}`)

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(userName)
    if (userExists) {
      console.log('An identity for the user "user1" already exists in the wallet')
      return
    }

    // Check to see if we've already enrolled the admin user.
    const adminExists = await wallet.exists(appAdmin)
    if (!adminExists) {
      console.log('An identity for the admin user "admin" does not exist in the wallet')
      console.log('Run the enrollAdmin.js application before retrying')
      return
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway()
    await gateway.connect(ccp, { wallet, identity: appAdmin, discovery: gatewayDiscovery })

    // Get the CA client object from the gateway for interacting with the CA.
    const ca = gateway.getClient().getCertificateAuthority()
    const adminIdentity = gateway.getCurrentIdentity()

    var allAttrs = []
    const attrRole = {
      name: 'role',
      value: userType,
      ecert: true
    }
    allAttrs.push(attrRole)

    if (userType === 'EMPLOYER'){
      const attrEmail = {
        name: 'emailId',
        value: userEmail,
        ecert: true
      }
      allAttrs.push(attrEmail)
    }

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register({ affiliation: 'org1', enrollmentID: userName, maxEnrollments: -1, role: 'client', attrs: allAttrs }, adminIdentity)

    console.log('userName:', userName)
    console.log('secret:', secret)

    const enrollment = await ca.enroll({ enrollmentID: userName, enrollmentSecret: secret })
    const userIdentity = X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes())

    console.log('\nUserIdentity:\n')
    console.log(userIdentity)

    wallet.import(userName, userIdentity)
    console.log('Successfully registered and enrolled admin user ' + userName + ' and imported it into the wallet')
  } catch (error) {
    console.error('Failed to register user ' + userName + ', error:', error)
    process.exit(1)
  }
}

main()
