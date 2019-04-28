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

class Login extends Component {

  state = {        
        loginError: '',
        username: '',
        password: '' ,
        role: 'STUDENT',
  }

  componentWillMount(){

    let username = localStorage.getItem("userName")
    let password = localStorage.getItem("password")
    let role = localStorage.getItem("role")
    console.log(username, password, role)
  
    if (username && password && role){
      this.setState({
        username: username,
        password: password,
        role: role   
      });
  
      
      var payload = {
        username: username,
        password : password,
        role : role
      }
      this.doLogin(payload, false)
    }  
  }
  
  requestLogin = (e) => {
    var payload = {
        username: this.state.username,
        password : this.state.password,
        role : this.state.role
    }
    this.doLogin(payload, true)
  }
  
    doLogin = (payload, bShowError) => {
      var requestPayload = null
      if(payload.role === 'UNIVERSITY'){
        requestPayload = {
          universityPrimaryEmail: payload.username,
          password: payload.password
        }
        this.doUniversityLogin(requestPayload, bShowError)
      }
      else if(payload.role === 'STUDENT'){
        requestPayload = {
          studentPrimaryEmail: payload.username,
          password: payload.password
        }
        this.doStudentLogin(requestPayload, bShowError)
      }
      else if(payload.role === 'EMPLOYER'){
        requestPayload = {
          verifierPrimaryEmail: payload.username,
          password: payload.password
        }
        this.doEmployerLogin(requestPayload, bShowError)
      }
    }
  
    doUniversityLogin(payload, bShowError) {
      var userInfo = null
      API.universityLogin(payload)
        .then((res) => {
          if (res){
            var obj = {
              userName: res.universityPrimaryEmail,
              firstName: res.universityName,
              lastName: "",
              role: 'UNIVERSITY'
            }
            userInfo = obj          
            var payload = {
              username: res.universityPrimaryEmail,
              secret : res.secret,
              role: 'UNIVERSITY'
            }
            return API.blockchainLogin(payload)
          }
          else if (bShowError){
            this.setState({
              ...this.state,
              loginError: "Login failed"
            });
          }
          return false
        })
        .then((res) => {
          if(res) {
            this.loginSuccessful(userInfo)
          }
          else if (bShowError){
            this.setState({
              ...this.state,
              loginError: "Login failed"
            });
          }
        });
    }
  
    doStudentLogin(payload, bShowError) {
      var userInfo = null
      API.studentLogin(payload)
        .then((res) => {
          if (res){
            var obj = {
              userName: res.studentPrimaryEmail,
              firstName: res.studentFirstName,
              lastName: res.studentLastName,
              role: 'STUDENT'
            }
            userInfo = obj          
            var payload = {
              username: res.studentPrimaryEmail,
              secret : res.secret,
              role: 'STUDENT'
            }
            return API.blockchainLogin(payload)
          }
          else if (bShowError){
            this.setState({
              ...this.state,
              loginError: "Login failed"
            });
          }
          return false
        })
        .then((res) => {
          if(res) {
            this.loginSuccessful(userInfo)
          }
          else if (bShowError){
            this.setState({
              ...this.state,
              loginError: "Login failed"
            });
          }
        });        
    }
  
    doEmployerLogin(payload, bShowError) {
      var userInfo = null
      API.employerLogin(payload)
        .then((res) => {
          if (res){
            var obj = {
              userName: res.verifierPrimaryEmail,
              firstName: res.verifierFirstName,
              lastName: res.verifierLastName,
              role: 'EMPLOYER'
            }
            userInfo = obj          
            var payload = {
              username: res.verifierPrimaryEmail,
              secret : res.secret,
              role: 'EMPLOYER'
            }
            return API.blockchainLogin(payload)
          }
          else if (bShowError){
            this.setState({
              ...this.state,
              loginError: "Login failed"
            });
          }
          return false
        })
        .then((res) => {
          if(res) {
            this.loginSuccessful(userInfo)            
          }
          else if (bShowError){
            this.setState({
              ...this.state,
              loginError: "Login failed"
            });
          }
        });
    }

  loginSuccessful(userInfo){
    localStorage.setItem("userName", userInfo.userName);
    localStorage.setItem("password", this.state.password);
    localStorage.setItem("role", userInfo.role);    
    this.props.SaveUser(userInfo)
    this.props.history.push('/homepage')
  }

  render () {
    console.log(this.state)
    return (

    <div className='peers ai-s'>
      <form encType="multipart/form-data" onSubmit={this.onSubmit}>
      
        <div className="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label">Username</label>
          <div className="col-sm-10">
            <input type="text" class="form-control" id="studentEmail" placeholder="Enter Username" 
                  onChange={(event) => {
                                this.setState({
                                        ...this.state,
                                        username: event.target.value
                                    });
                                }}/>
          </div>
        </div>

        <div className="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="text" class="form-control" id="studentEmail" placeholder="Enter Secret"
                    onChange={(event) => {
                                this.setState({
                                        ...this.state,
                                        password: event.target.value
                                    });
                                }}
                  />
          </div>
        </div>

        <fieldset className="form-group"
                  onChange={(event) => {
                                  this.setState({
                                    ...this.state,
                                    role: event.target.value
                                  })
                              }}>

          <div className="row">
            <div className="col-sm-10">

              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="STUDENT"/>
                      Student
                </label>
              </div>

              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="UNIVERSITY"/>
                      University
                </label>
              </div>

              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="EMPLOYER"/>
                      Employer
                </label>
              </div>
            </div>
          </div>
        </fieldset>

      </form>
      <div className="form-group row">
        <div className="col-sm-10">
          <button type="text" className="btn btn-primary" onClick={this.requestLogin} >Login</button>
        </div>
      </div>


        <h4 className='fw-300 c-grey-900 mB-40'>{this.state.loginError}</h4>
          
    </div>

    )
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({SaveUser : SaveUser}, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Login))
