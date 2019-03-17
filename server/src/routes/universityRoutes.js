var express = require('express')
var router = express.Router()

var diploma = require('../libs/diploma')

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

module.exports = router
