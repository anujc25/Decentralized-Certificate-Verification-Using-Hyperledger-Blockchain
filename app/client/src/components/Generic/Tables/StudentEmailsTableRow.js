import React, { Component } from 'react'

class StudentEmailsTableRow extends Component {
  render () {
    return (
      <tr>
        <td>{this.props.email}</td>
      </tr>
    )
  }
}

export default StudentEmailsTableRow
