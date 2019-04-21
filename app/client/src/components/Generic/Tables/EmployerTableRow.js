import React, { Component } from 'react'
import { save } from 'save-file'
import * as DiplomaAPI from '../../../services/diplomaService'
class EmployerTableRow extends Component {

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
      </tr>
    )
  }
}

export default EmployerTableRow
