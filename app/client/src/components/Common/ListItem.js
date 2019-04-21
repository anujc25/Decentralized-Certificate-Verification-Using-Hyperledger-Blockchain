import React, { Component } from 'react'
import {withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { UpdateUniversityView } from '../../actions/actions'

class ListItem extends Component {

  changeViewFunction = (changeView) => {

    console.log("Inside the List Item")
    console.log("this.props.value:",this.props.value)
    
    if ( this.props.value === "Dashboard"){
      this.props.UpdateUniversityView({"view":"Dashboard"})
      this.props.history.push('/homepage')
    }
    else if ( this.props.value === "Logout"){
      localStorage.setItem("userName", null);
      localStorage.setItem("secret", null);
      localStorage.setItem("role", null);
      this.props.history.push('/')
    }
    else if ( this.props.value === "Upload Diploma"){
      this.props.UpdateUniversityView({"view":"Upload Diploma"})
      this.props.history.push('/homepage')
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

function mapDispatchToProps(dispatch){
  return bindActionCreators({UpdateUniversityView : UpdateUniversityView}, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(ListItem))
 
