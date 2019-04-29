var express = require('express')
var router = express.Router()

var ipfs = require('../libs/ipfs')
var diploma = require('../libs/diploma')

router.get('/diploma/download/:hash', async function (req, res) {
  var response = await ipfs.downloadFileFromIPFS(req.params.hash)

  if (!response.err) {
    res.status(200).send(response)
  } else {
    res.status(500).send(response)
  }
})

router.get('/diploma/history/:username/:uuid', async function (req, res) {
  var response = await diploma.getDiplomaHistory(req.params.username, req.params.uuid)

  if (!response.err) {
    res.status(200).send(response)
  } else {
    res.status(500).send(response)
  }
})

module.exports = router
