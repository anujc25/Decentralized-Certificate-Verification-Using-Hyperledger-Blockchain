var express = require('express')
var router = express.Router()

var chaincode = require('../fabric/chaincode')

// TODO: remove username from request route, use session to get username
// TODO: get student email from login session and central backend
router.get('/diploma/:username/:studentemail', async function (req, res) {
  var response = await chaincode.queryDiplomaForStudent(req.params.username, req.params.studentemail)

  if (response.Error === '') {
    res.status(200).send(response.result)
  } else {
    res.status(500).send(response.result)
  }
})

// TODO: remove username from request route, use session to get username
router.post('/diploma/share/:username', async function (req, res) {
  var response = await chaincode.shareDiplomaWithEmployer(req.params.username, req.body.employerEmail, req.body.diplomaUuid)

  if (response.Error === '') {
    res.status(200).send(response.result)
  } else {
    res.status(500).send(response.result)
  }
})

module.exports = router
