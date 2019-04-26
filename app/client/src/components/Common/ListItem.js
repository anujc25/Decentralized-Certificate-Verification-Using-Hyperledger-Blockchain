import React, { Component } from 'react'
import {withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { UpdateUniversityView } from '../../actions/actions'
import { UpdateStudentView } from '../../actions/actions'
import { UpdateEmployerView } from '../../actions/actions'

class ListItem extends Component {

  changeViewFunction = (changeView) => {

    console.log("Inside the List Item")
    console.log("this.props.value:",this.props.value)
    
    if ( this.props.value === "Dashboard"){
        if (this.props.userDetail.role === "UNIVERSITY"){

            this.props.UpdateUniversityView({"view":"Dashboard"})
            // this.props.history.push('/homepage')
        }

        else if (this.props.userDetail.role === "STUDENT"){

          this.props.UpdateStudentView({"view":"Dashboard"})
          // this.props.history.push('/homepage')
        }

        else if (this.props.userDetail.role === "EMPLOYER"){
          
          this.props.UpdateEmployerView({"view":"Dashboard"})
          // this.props.history.push('/homepage')
        }
        
      
    }
    else if ( this.props.value === "Profile"){
        if (this.props.userDetail.role === "UNIVERSITY"){

            this.props.UpdateUniversityView({"view":"Profile"})
            // this.props.history.push('/homepage')
        }

        else if (this.props.userDetail.role === "STUDENT"){

          this.props.UpdateStudentView({"view":"Profile"})
          // this.props.history.push('/homepage')
        }

        else if (this.props.userDetail.role === "EMPLOYER"){
          
          this.props.UpdateEmployerView({"view":"Profile"})
          // this.props.history.push('/homepage')
        }
        
      
    }
    else if ( this.props.value === "Logout"){
      localStorage.setItem("userName", null);
      localStorage.setItem("password", null);
      localStorage.setItem("role", null);
      this.props.history.push('/')
    }
    else if ( this.props.value === "Upload Diploma"){
      this.props.UpdateUniversityView({"view":"Upload Diploma"})
      // this.props.history.push('/homepage')
    }

    else if ( this.props.value === "My Emails"){
      this.props.UpdateStudentView({"view":"My Emails"})
      // this.props.history.push('/homepage')
    }
  }
  render () {
    let cssClass = 'c-blue-500 ' + this.props.icon
    return (
      <li className='nav-item mT-30 c-pointer active' onClick={this.changeViewFunction} >
        <a className='sidebar-link'>
          <span className='icon-holder'>
            <i className={cssClass} />
          </span>
          <span className='title'>{this.props.value}</span>
        </a>
      </li>
    )
  }
}

function mapStateToProps(state){
  return {
      userDetail: state.userDetail
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    UpdateUniversityView : UpdateUniversityView,
    UpdateStudentView : UpdateStudentView,
    UpdateEmployerView: UpdateEmployerView
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListItem))
 
