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
    return (
      <tr>
        <td>{this.props.diploma.name}</td>
        <td>{this.props.diploma.emailId}</td>
        <td>{this.props.diploma.department}</td>
        <td>{this.props.diploma.degree}</td>
        <td>{this.props.diploma.term}</td>
        <td>{(new Date(this.props.diploma.timestamp)).toLocaleString()}</td>
        <td> <button className="btn cur-p btn-primary" onClick={this.downloadDiploma}><i className="c-white-500 ti-download" /> </button></td>
        <td> <button className="btn cur-p btn-primary" data-toggle="modal" data-target="#shareDiploma" onClick={() => this.props.openPopup(this.props.diploma.diplomaUUID)}><i className="c-white-500 ti-share" /> </button></td>
        
      </tr>
    )
  }
}

export default StudentTableRow
