const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var login = require('./fabric/login.js')
var universityRoutes = require('./routes/universityRoutes')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// To handle multipart/form data(University File Upload)
const fileupload = require('express-fileupload');
app.use(fileupload());


app.post('/login/university', (req, res) => {
  login.loginUniversity(req.body.username, req.body.secret   )
    .then((response) => {
      res.send(response)
    })
    .catch(function (error) {
      var response = { result: null, error: error }
      res.status(500).send(response)
      console.log(error)
    })
})

app.use('/university', universityRoutes);

app.listen(process.env.PORT || 3001)
