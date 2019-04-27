var express = require('express')
var router = express.Router()

var ipfs = require('../libs/ipfs')
var chaincode = require('../fabric/chaincode')
var fs = require('fs');

// TODO: remove username from request route, use session to get username
// TODO: get student email from login session and central backend
router.get('/diploma/:username/:studentemail', async function (req, res) {
  var studentEmails = [req.params.studentemail]
  var response = await chaincode.queryDiplomaForStudent(req.params.username, studentEmails)

  if (response.result && response.result.length > 0) {
    for (let i = 0; i < response.result.length; i++) {
      
      var link = response.result[i].ipfsLink
      var fileResponse = await ipfs.downloadFileFromIPFS(link)

      if (!fileResponse.err) {
        console.log("Dowload preview success for : ", link)
        var path = 'public/downloads/'
        if(!fs.existsSync(path))
          fs.mkdirSync(path);

        if (!fs.existsSync(path + link + '.pdf')) {
          var wstream = fs.createWriteStream(path + link + '.pdf');
          wstream.write(fileResponse.result);
          wstream.end();
        }
      } else {
        console.log("Dowload preview failed for : ", response.result[i].ipfsLink)
      }

    } 
  }

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
