import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Route, Link, Switch, Redirect, withRouter, BrowserRouter } from 'react-router-dom'
import '../css/1.css'
import '../css/2.css'
import '../css/3.css'
import '../css/4.css'
import * as API from './../services/loginService'
import { SaveUser } from '../actions/actions'
import { connect } from 'react-redux'
import img1 from '../images/bg1.jpg'
import user from '../reducers/reducer-user';
import Login from './Login'
import Register from './Register'

class LandingPage extends Component {

  state = {
    isLoginPage: true   
}

componentWillMount(){  
}
  render () {
    console.log(this.state)
    return (

    <div className='peers ai-s fxw-nw h-100vh'>
      <div className='d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv' style={{ 'background-image': `url(${img1})` }}>
       
      <div className='col-4 col-md-4 offset-md-8 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r' style={{ 'min-width': '320px;', 'opacity': '0.9' }}>

        <h2 className='fw-300 c-grey-900 mB-40'>Welcome to TrustCert</h2>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a id = "navLogin" class="nav-link active" href="#" onClick={() => {
              document.getElementById("navLogin").className = "nav-link active"
              document.getElementById("navRegister").className = "nav-link"
              this.setState({
                ...this.state,
                isLoginPage: true
              })
            }}>Login</a>
          </li>
          <li class="nav-item">
            <a id = "navRegister" class="nav-link" href="#" onClick={() => {
              document.getElementById("navLogin").className = "nav-link"
              document.getElementById("navRegister").className = "nav-link active"
              this.setState({
                ...this.state,
                isLoginPage: false
              })
            }}>Register</a>
          </li>
        </ul>
        {this.state.isLoginPage ? 
          <Login/> : 
          <Register/>
        }     
      </div>
      </div>
    </div>

    )
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({SaveUser : SaveUser}, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(LandingPage))
