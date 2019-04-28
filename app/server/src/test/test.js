const csv = require('csv-parser');
const fs = require('fs');
const axios = require('axios')

fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
        console.log(row);

        var formData  = new FormData(); 
        formData.append("issuer",row.issuer)
        formData.append("selectedFile",row.filePath)
        formData.append("term",row.term)
        formData.append("degree",row.degree)
        formData.append("department",row.department)
        formData.append("studentName",row.studentName)
        formData.append("studentEmail",row.studentEmail)

        axios.post('http://localhost:3001/university/studentdiploma', formData)
        .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        })
        .catch((error) => {
            console.error(error)
        })
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });