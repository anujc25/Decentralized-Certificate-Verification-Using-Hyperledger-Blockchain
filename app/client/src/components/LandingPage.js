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

class LandingPage extends Component {

  state = {
    loginError: '',
    username: '',
    secret: '' ,
    role: 'STUDENT'   
}

componentWillMount(){

  let username = localStorage.getItem("userName")
  let secret = localStorage.getItem("secret")
  let role = localStorage.getItem("role")
  console.log(username, secret, role)

  if (username && secret && role){
    this.setState({
      username: username,
      secret: secret ,
      role: role   
    });

    var payload = {
      username: username,
      secret : secret,
      role : role
    }
    this.doLogin(payload, false)
  }  
}

requestLogin = (e) => {
  var payload = {
      username: this.state.username,
      secret : this.state.secret,
      role : this.state.role
  }
  this.doLogin(payload, true)
}

  doLogin = (payload, bShowError) => {
    API.universityLogin(payload)
    .then((res) => {
      console.log(res);
      if (!res.error && res.result && res.result.role) {
        console.log(res.result.role, this.state.role)
        if (res.result.role === this.state.role){
          var obj = {
            userName: this.state.username,
            role: this.state.role
          }

          localStorage.setItem("userName", this.state.username);
          localStorage.setItem("secret", this.state.secret);
          localStorage.setItem("role", this.state.role);

          this.props.SaveUser(obj)
          this.props.history.push('/homepage')
        }
        else {
          if(bShowError){
            this.setState({
              loginError: "Login Failed. " + res.error,
            });
          }        
        }
      } else {
        if(bShowError){
          this.setState({
            loginError: "Login Failed!" + res.error,
          });            
        }
      }
    });
  }

  render () {
    console.log(this.state)
    return (

    <div className='peers ai-s fxw-nw h-100vh'>
      <div className='d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv' style={{ 'background-image': `url(${img1})` }}>
       
      </div>
      <div className='col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r' style={{ 'min-width': '320px;' }}>

        <h2 className='fw-300 c-grey-900 mB-40'>Welcome to TrustCert</h2>

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
                                          secret: event.target.value
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

              <div style={{ 'width': '5px',
                  'height': 'auto',
                  'display': 'inline-block' }} />

              <button type="text" className="btn btn-primary" onClick={() => this.props.history.push('/registeruniversity')}> Register </button>
            </div>
          </div>

          <h4 className='fw-300 c-grey-900 mB-40'>{this.state.loginError}</h4>
          
      </div>
    </div>

    )
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({SaveUser : SaveUser}, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(LandingPage))
