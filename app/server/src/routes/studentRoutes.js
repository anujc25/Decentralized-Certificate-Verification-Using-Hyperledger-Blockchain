var express = require('express')
var router = express.Router()

var chaincode = require('../fabric/chaincode')

// TODO: remove username from request route, use session to get username
// TODO: get student email from login session and central backend
router.get('/diploma/:username/:studentemail', async function (req, res) {
  var studentEmails = [req.params.studentemail]
  var response = await chaincode.queryDiplomaForStudent(req.params.username, studentEmails)

  if (response.Error === '') {
    res.status(200).send(response.result)
  } else {
    res.status(500).send(response.result)
  }
})

// TODO: remove username from request route, use session to get username
router.post('/diploma/share/:username', async function (req, res) {
  var response = await chaincode.shareDiplomaWithEmployer(req.params.username, req.body.employerEmail, req.body.diplomaUuid)
  console.log("/student/diploma/share response: ", response.result)
  if (response.Error === '') {
    res.status(200).send({ Status: 'Diploma successfully shared with the employer.' })
  } else {
    res.status(500).send({ Status: 'Diploma sharing failed:' + response.Error })
  }
})

module.exports = router
