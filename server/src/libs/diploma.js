'use strict'

var ipfs = require('./ipfs.js')

exports.uploadDiploma = async function (fileMetadata, file) {
  var uploadStatus = await ipfs.uploadFileOnIPFS(fileMetadata, file)
  console.log('uploadStatus:', uploadStatus)
  if (uploadStatus.err) {
    return { bSuccess: false, err: uploadStatus.err }
  }
  return { bSuccess: true, err: null }
}
