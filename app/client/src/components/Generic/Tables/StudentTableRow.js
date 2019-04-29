import React, { Component } from 'react'
import * as DiplomaAPI from '../../../services/diplomaService'
import { save } from 'save-file'

class StudentTableRow extends Component {

  downloadDiploma = (event) => {    
    DiplomaAPI.downloadStudentDiploma(this.props.diploma.ipfsLink)
    .then((res) => {
      console.log(res);
        if (!res.error && res.result) {
        save(res.result.data, "diploma.pdf")
        } else {
          console.log("Fail to download diploma.")
        }
    }).catch((res) => {
        console.log(res)
        console.log("Fail to download diploma.")
    });
  }

  render () {
    var filePath = 'http://localhost:3001/downloads/' + this.props.diploma.ipfsLink + '.pdf'
    return (
      <tr>
        <td>{this.props.diploma.name}</td>
        <td>{this.props.diploma.emailId}</td>
        <td>{this.props.diploma.department}</td>
        <td>{this.props.diploma.degree}</td>
        <td>{this.props.diploma.term}</td>
        <td>{(new Date(this.props.diploma.timestamp)).toLocaleString()}</td>
        <td style={{textAlign:"center"}}> <button className="btn cur-p btn-primary" onClick={this.downloadDiploma}><i className="c-white-500 ti-download" /> </button></td>
        <td style={{textAlign:"center"}}> <button className="btn cur-p btn-primary" data-toggle="modal" data-target="#shareDiploma" onClick={() => this.props.openPopup(this.props.diploma.diplomaUUID)}><i className="c-white-500 ti-share" /> </button></td>
        <td><embed src={filePath} width="100px" height="100px" /></td>        
      </tr>
    )
  }
}

export default StudentTableRow
