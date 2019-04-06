var express = require('express')
var router = express.Router()

var chaincode = require('../fabric/chaincode')

// TODO: remove username from request route, use session to get username
router.get('/diploma/:username', async function (req, res) {
  var response = await chaincode.queryDiplomaForEmployer(req.params.username)

  if (response.Error === '') {
    res.status(200).send(response.result)
  } else {
    res.status(500).send(response.result)
  }
})

module.exports = router
