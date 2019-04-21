import React, { Component } from 'react'

class StudentEmailsTableRow extends Component {
  render () {
    return (
      <tr>
        <td>{this.props.value[0]}</td>
      </tr>
    )
  }
}

export default StudentEmailsTableRow
