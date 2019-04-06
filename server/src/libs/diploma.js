'use strict'

var ipfs = require('./ipfs.js')
var chaincode = require('../fabric/chaincode')

exports.uploadDiploma = async function (fileMetadata, file) {
  var uploadStatus = await ipfs.uploadFileOnIPFS(fileMetadata, file)
  console.log('uploadStatus:', uploadStatus)
  if (uploadStatus.err) {
    return { bSuccess: false, err: uploadStatus.err }
  }
  console.log(fileMetadata)
  // TODO: remove fileMetadata.issuer as first argument from chaincode.addDiploma, use session to pass username
  var response = await chaincode.addDiploma(fileMetadata.issuer, fileMetadata.studentName, fileMetadata.studentEmail,
    fileMetadata.issuer, fileMetadata.term, fileMetadata.degree, fileMetadata.department, uploadStatus.hash)
  console.log('chaincode response: ', response)
  if (response.Error === '') {
    return { bSuccess: true, err: null }
  } else {
    return { bSuccess: false, err: response.Error }
  }
}
