var express = require('express')
var router = express.Router()

var diploma = require('../libs/diploma')
var chaincode = require('../fabric/chaincode')

router.post('/studentdiploma', async function (req, res) {
  console.log('BOdy:', req.body)
  console.log('File:', req.files)

  var result = await diploma.uploadDiploma(req.body, req.files.selectedFile)

  if (result.bSuccess) {
    res.status(200).send({ Status: 'Diploma successfully uploaded to blockchain.' })
  } else {
    res.status(500).send({ Status: 'Diploma upload failed:' + result.err })
  }
})

router.get('/studentdiploma', async function (req, res) {
  var response = await chaincode.queryDiplomaByIssuer(req.body.username)

  if (response.Error === '') {
    res.status(200).send(response.result)
  } else {
    res.status(500).send(response.result)
  }
})

module.exports = router
