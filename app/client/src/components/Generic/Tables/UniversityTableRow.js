import React, { Component } from 'react'

class UniversityTableRow extends Component {
  render () {
    return (
      <tr>
        <td>{this.props.value[0]}</td>
        <td>{this.props.value[1]}</td>
        <td>{this.props.value[2]}</td>
        <td>{this.props.value[3]}</td>
        <td>{this.props.value[4]}</td>
        <td>{this.props.value[5]}</td>
      </tr>
    )
  }
}

export default UniversityTableRow
