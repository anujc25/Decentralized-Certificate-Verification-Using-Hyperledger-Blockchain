import React, { Component } from 'react'
import {withRouter } from 'react-router-dom';

class ListItem extends Component {

  changeViewFunction = (changeView) => {

    console.log("Inside the List Item")
    console.log("this.props.value:",this.props.value)
    
    if ( this.props.value === "Dashboard"){
      this.props.history.push('/homepage')
    }
    else if ( this.props.value === "Logout"){
      this.props.history.push('/')
    }
    

  }
  render () {
    let cssClass = 'c-blue-500 ' + this.props.icon
    return (
      <li className='nav-item mT-30 active' >
        <a className='sidebar-link' onClick={this.changeViewFunction} >
          <span className='icon-holder'>
            <i className={cssClass} />
          </span>
          <span className='title'>{this.props.value}</span>
        </a>
      </li>
    )
  }
}

export default withRouter (ListItem)
 
