/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const FabricCAServices = require('fabric-ca-client')
const { FileSystemWallet, X509WalletMixin } = require('fabric-network')
const fs = require('fs')
const path = require('path')

// capture network variables from config.json
const configPath = path.join(process.cwd(), 'config.json')
const configJSON = fs.readFileSync(configPath, 'utf8')
const config = JSON.parse(configJSON)
var connectionFile = config.connection_file
var appAdmin = config.appAdmin
var appAdminSecret = config.appAdminSecret
var orgMSPID = config.orgMSPID
var caName = config.caName

const ccpPath = path.join(process.cwd(), connectionFile)
const ccpJSON = fs.readFileSync(ccpPath, 'utf8')
const ccp = JSON.parse(ccpJSON)

async function main () {
  try {
    // Create a new CA client for interacting with the CA.
    const caURL = ccp.certificateAuthorities[caName].url
    const ca = new FabricCAServices(caURL)

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet')
    const wallet = new FileSystemWallet(walletPath)
    console.log(`Wallet path: ${walletPath}`)

    // Check to see if we've already enrolled the admin user.
    const adminExists = await wallet.exists(appAdmin)
    if (adminExists) {
      console.log('An identity for the admin user "admin" already exists in the wallet')
      return
    }

    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await ca.enroll({ enrollmentID: appAdmin, enrollmentSecret: appAdminSecret })
    const identity = X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes())
    wallet.import(appAdmin, identity)

    //     const newIdentity = { type: 'X509',
    //   mspId: 'org1msp',
    //   certificate: '-----BEGIN CERTIFICATE-----\nMIICdzCCAh2gAwIBAgIUWqptCTgO6VuucCtRrY8yrN/GwDowCgYIKoZIzj0EAwIw\naDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMRQwEgYDVQQK\nEwtIeXBlcmxlZGdlcjEPMA0GA1UECxMGRmFicmljMRkwFwYDVQQDExBmYWJyaWMt\nY2Etc2VydmVyMB4XDTE5MDMwOTIwMDEwMFoXDTIwMDMwODIwMDYwMFowNTEcMA0G\nA1UECxMGY2xpZW50MAsGA1UECxMEb3JnMTEVMBMGA1UEAxMMYWMuc3R1ZGVudC4x\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAESgaVYo5M1ba7F50RbNopUKfjfaf6\niEeDbPYsH2C5OlNpMJo24exbLyhVwJSgjrGHGMgE0QQPJQ6pyVwlSozdSKOB1zCB\n1DAOBgNVHQ8BAf8EBAMCB4AwDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQUK2HSpVsg\nKAlSitDyyfP65SdvhYowHwYDVR0jBBgwFoAUmcYwjFkaQMpr+LL9okl7bMPe5QYw\ndAYIKgMEBQYHCAEEaHsiYXR0cnMiOnsiaGYuQWZmaWxpYXRpb24iOiJvcmcxIiwi\naGYuRW5yb2xsbWVudElEIjoiYWMuc3R1ZGVudC4xIiwiaGYuVHlwZSI6ImNsaWVu\ndCIsInJvbGUiOiJTVFVERU5UIn19MAoGCCqGSM49BAMCA0gAMEUCIQDYCWtC7nrd\nSagEyLIJ+7AdVeuRzDdVdXqu5bP5sX3bxgIgMxrMboMbG2GRCrpkB98EM5rALXBy\npYUyazBwQLYODUs=\n-----END CERTIFICATE-----\n',
    //   privateKey: '-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgmERHN6seeCCEKmUt\r\nzDneEdi5vxUUvXcxiRoHXdxN2LShRANCAARKBpVijkzVtrsXnRFs2ilQp+N9p/qI\r\nR4Ns9iwfYLk6U2kwmjbh7FsvKFXAlKCOsYcYyATRBA8lDqnJXCVKjN1I\r\n-----END PRIVATE KEY-----\r\n'
    // }
    // wallet.import('ac.student.1', newIdentity)

    console.log('msg: Successfully enrolled admin user ' + appAdmin + ' and imported it into the wallet')
  } catch (error) {
    console.error('Failed to enroll admin user ' + appAdmin + ', error: ' + error)
    process.exit(1)
  }
}

main()
