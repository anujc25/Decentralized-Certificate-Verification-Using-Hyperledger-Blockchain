const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var ipfs = require('./libs/ipfs.js')
var loginRoutes = require('./routes/loginRoutes')
var universityRoutes = require('./routes/universityRoutes')
var studentRoutes = require('./routes/studentRoutes')
var employeeRoutes = require('./routes/employeeRoutes')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// To handle multipart/form data(University File Upload)
const fileupload = require('express-fileupload')
app.use(fileupload())

app.use('/login', loginRoutes)
app.use('/university', universityRoutes)
app.use('/student', studentRoutes)
app.use('/employer', employeeRoutes)

ipfs.startIPFSNode(function () {
  console.log('Starting Node Server ...')
  app.listen(process.env.PORT || 3001)
})
