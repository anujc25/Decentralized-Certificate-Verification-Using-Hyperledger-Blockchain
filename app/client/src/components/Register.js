import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Route, Link, Switch, Redirect, withRouter, BrowserRouter } from 'react-router-dom'
import '../css/1.css'
import '../css/2.css'
import '../css/3.css'
import '../css/4.css'
import * as API from './../services/backendAPI'
import { SaveUser } from '../actions/actions'
import { connect } from 'react-redux'
import img1 from '../images/bg1.jpg'
import user from '../reducers/reducer-user';

class Register extends Component {

  state = {
    loginError: '',
    emailId: '',
    firstName: '' ,
    lastName: '',
    password: '',
    role: ''   
}

componentWillMount(){ 
}

requestRegister = (e) => {
    var payload = {}
    if (this.state.role == "STUDENT"){
        payload = {
            role: this.state.role,
            body:{
                studentPrimaryEmail: this.state.emailId,
                studentFirstName: this.state.firstName,
                studentLastName: this.state.lastName,
                password: this.state.password
            }
        }
    }
    else if (this.state.role == "EMPLOYER") {
        payload = {
            role: this.state.role,
            body:{
                verifierPrimaryEmail: this.state.emailId,
                verifierFirstName: this.state.firstName,
                verifierLastName: this.state.lastName,
                verifierOrganization: "",
                password: this.state.password
            }
        }
    }  
    
    this.doRegister(payload, true)
}

doRegister = (payload, bShowError) => {
    if (this.state.role == "STUDENT") {

    }
    else if (this.state.role == "EMPLOYER") {

    }
    API.registerUser(payload)
    .then((res) => {
      console.log(res);
      if (!res.error && res.result && res.result.role) {
        console.log(res.result.role, this.state.role)
        if (res.result.role === this.state.role){
          var obj = {
            userName: this.state.username,
            role: this.state.role
          }
          this.props.history.push('/')
        }
        else {
            if(bShowError){
                this.setState({
                loginError: "Registration Failed. " + res.error,
                });
            }        
        }
      } else {
            if(bShowError){
            this.setState({
                loginError: "Registration Failed!" + res.error,
            });            
        }
      }
    });
  }

  render () {
    console.log(this.state)
    return (

    <div className='peers ai-s'>
        <form encType="multipart/form-data" onSubmit={this.onSubmit}>
        
        <div className="form-group row">
            <label for="studentEmail" class="col-form-label-new">Email-Id</label>
            <div className="col-sm-10">
              <input required type="text" class="form-control" id="emailId" placeholder="Enter Email-id" 
                    onChange={(event) => {
                                  this.setState({
                                          ...this.state,
                                          emailId: event.target.value
                                      });
                                  }}/>
            </div>
        </div>

        <div className="form-group row">
            <label for="firstName" class="col-form-label-new">First Name</label>
            <div className="col-sm-10">
                <input required type="text" class="form-control" id="firstName" placeholder="Enter First Name"
                    onChange={(event) => {
                        this.setState({
                                ...this.state,
                                firstName: event.target.value
                            });
                        }}
                />
            </div>
        </div>

        <div className="form-group row">
            <label for="lastName" class="col-form-label-new">Last Name</label>
            <div className="col-sm-10">
                <input required type="text" class="form-control" id="lastName" placeholder="Enter Last Name"
                    onChange={(event) => {
                        this.setState({
                                ...this.state,
                                lastName: event.target.value
                            });
                        }}
                />
            </div>
        </div>

        <div className="form-group row">
            <label for="password" class="col-form-label-new">Password</label>
            <div className="col-sm-10">
                <input required type="text" class="form-control" id="password" placeholder="Enter Password"
                    onChange={(event) => {
                        this.setState({
                                ...this.state,
                                password: event.target.value
                            });
                        }}
                />
            </div>
        </div>

        <div className="form-group row">
            <label for="password" class="col-form-label-new">Role</label>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Choose role
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#" onClick={() => {
                        document.getElementById("dropdownMenuButton").innerText = "Student"
                        this.setState({
                            ...this.state,
                            role: "STUDENT"
                        })
                    }}>Student</a>
                    <a class="dropdown-item" href="#" onClick={() => {
                        document.getElementById("dropdownMenuButton").innerText = "Verifier"
                        this.setState({
                            ...this.state,
                            role: "EMPLOYER"
                        })
                    }}>Verifier</a>
                </div>
            </div>
        </div>

        <div className="form-group row">
            <div className="col-sm-12">
              <button type="submit" className="btn btn-primary" onClick={this.requestRegister} >Register</button>
            </div>
        </div>

          
        </form>

        <h4 className='fw-300 c-grey-900 mB-40'>{this.state.loginError}</h4>
          
    </div>

    )
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({SaveUser : SaveUser}, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Register))


// validation