'use strict'

const IPFS = require('ipfs')
var ipfsNode = new IPFS()

exports.startIPFSNode = function (callback) {
  ipfsNode.on('ready', async function () {
    const version = await ipfsNode.version()
    console.log('Ipfs Version:', version.version)
    callback()
  })
}

exports.uploadFileOnIPFS = async function (fileMetadata, fileObject) {
  try {
    const filesAdded = await ipfsNode.add({
      path: fileObject.name,
      content: fileObject.data
    })
    console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)
    return { hash: filesAdded[0].hash, err: null }
  } catch (error) {
    return { hash: null, err: error }
  }
}

exports.downloadFileFromIPFS = async function (fileHash) {
  try {
    const fileBuffer = await ipfsNode.cat(fileHash)
    return { result: fileBuffer, error: null }
  } catch (error) {
    return { result: null, error: error }
  }
}

exports.ipfsNode = ipfsNode
