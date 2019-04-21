import React, { Component } from 'react'
import { save } from 'save-file'
import * as DiplomaAPI from '../../../services/diplomaService'
class UniversityTableRow extends Component {

  downloadDiploma = (event) => {
    console.log(this.props.value[5])
    var ipfsHash = this.props.value[5]
    
    DiplomaAPI.downloadStudentDiploma(ipfsHash)
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
        <td>{this.props.value[0]}</td>
        <td>{this.props.value[1]}</td>
        <td>{this.props.value[2]}</td>
        <td>{this.props.value[3]}</td>
        <td>{this.props.value[4]}</td>
        <td>{this.props.value[5]}</td>
        <td> <button className="btn cur-p btn-primary" onClick={this.downloadDiploma}><i className="c-white-500 ti-download" /> </button></td>
      </tr>
    )
  }
}

export default UniversityTableRow
