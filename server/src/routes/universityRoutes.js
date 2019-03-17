var express = require('express');
var router = express.Router();

router.post('/studentcertificate', function (req, res) {

    console.log("BOdy:",req.body)
    console.log("File:",req.files)
    res.status(200).send({"Status":"ok"})
})

module.exports = router;

// app.post('/university/studentcertificate', (req, res) => {

//     console.log("BOdy:",req.body)
//     console.log("File:",req.files)
//         res.status(200).send({"Status":"ok"})
//   })