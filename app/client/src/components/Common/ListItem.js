import React, { Component } from 'react'

class ListItem extends Component {
  render () {
    let cssClass = 'c-blue-500 ' + this.props.icon
    return (
      <li className='nav-item mT-30 active'>
        <a className='sidebar-link' href='/'>
          <span className='icon-holder'>
            <i className={cssClass} />
          </span>
          <span className='title'>{this.props.value}</span>
        </a>
      </li>
    )
  }
}

export default ListItem
