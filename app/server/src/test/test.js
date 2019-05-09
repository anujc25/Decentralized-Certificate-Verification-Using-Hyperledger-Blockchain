const csv = require('csv-parser')
const fs = require('fs');
const request = require('request')
var FormData = require('form-data')

var start_time = Date.now()
var end_time = Date.now()

fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
        var url = 'http://localhost:3001/university/studentdiploma'

        var req = request.post(url, function (err, resp, body) {
            if (err) {
                console.log('Error!');
            } else {
                console.log('URL: ' + body);
                end_time = Date.now()
                console.log("File uploaded for: ", row.studentName)
                console.log('Total time spent = ', end_time - start_time)
            }
        });

        var form = req.form();
        form.append('selectedFile', fs.createReadStream(row.selectedFile));
        form.append('issuer', row.issuer);
        form.append('term', row.term);
        form.append('degree', row.degree);
        form.append('department', row.department);
        form.append('studentName', row.studentName);
        form.append('studentEmail', row.studentEmail);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });