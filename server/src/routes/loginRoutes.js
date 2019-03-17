var express = require('express')
var router = express.Router()
var login = require('../fabric/login.js')

router.post('/university', (req, res) => {
  login.loginUniversity(req.body.username, req.body.secret)
    .then((response) => {
      res.send(response)
    })
    .catch(function (error) {
      var response = { result: null, error: error }
      res.status(500).send(response)
      console.log(error)
    })
})

module.exports = router
