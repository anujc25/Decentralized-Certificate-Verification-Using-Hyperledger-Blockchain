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
import img1 from '../images/bg.jpg'

class LandingPage extends Component {

  state = {
    loginError: '',
    username: '',
    secret: '' ,
    role: 'STUDENT'   
}

  doLogin = (e) => {

  var payload = {
      username: this.state.username,
      secret : this.state.secret,
      role : this.state.role
  }

  API.universityLogin(payload)
      .then((res) => {
        console.log(res);
        if (!res.error && res.result && res.result.role) {
          if (res.result.role != ''){
            var obj = {
              userName: this.state.username,
              role: this.state.role
            }
            this.props.SaveUser(obj)
            this.props.history.push('/homepage/' + res.result.role)
          }
          else {
            this.setState({
              loginError: "Login Failed. " + res.error,
            });
          }
        } else {
          this.setState({
            loginError: "Login Failed. " + res.error,
          });            
        }
      });
  }

  render () {
    return (

      // <div classNameName='site-wrapper'>

      //   <div classNameName='site-wrapper-inner'>

      //     <div className='cover-container'>
      //       <main role='main' className='inner cover'>
      //         <h1 className='cover-heading'>TrustCert</h1>
      //         <form encType="multipart/form-data" onSubmit={this.onSubmit}>
      //           <label for="issuer">Username</label>
      //           <input type="text" className="form-control" id="studentEmail"  placeholder="Enter Username"
      //               onChange={(event) => {
      //               this.setState({
      //                       ...this.state,
      //                       username: event.target.value
      //                   });
      //               }}
      //           >
      //           </input>
      //           <label for="issuer">Secret</label>
      //           <input type="text" className="form-control" id="studentEmail"  placeholder="Enter Secret"
      //               onChange={(event) => {
      //               this.setState({
      //                       ...this.state,
      //                       secret: event.target.value
      //                   });
      //               }}
      //           >
      //           </input>
      //           <label for="issuer">Role</label>
      //           <select name="role" onChange={(event) => {
      //               this.setState({
      //                 ...this.state,
      //                 role: event.target.value
      //               })
      //           }}>
      //             <option value="STUDENT">STUDENT</option>
      //             <option value="UNIVERSITY">UNIVERSITY</option>
      //             <option value="EMPLOYER">EMPLOYER</option>
      //           </select>
      //         </form>
      //         <p className='lead'>
      //           <button type='text' className='btn btn-primary' onClick={() => this.props.history.push('/registeruniversity')}>Register</button>

      //           <div style={{ 'width': '5px',
      //             'height': 'auto',
      //             'display': 'inline-block' }} />

      //           <button type='text' className='btn btn-primary' onClick={this.doLogin}>Login</button>
      //         </p>
      //         <p className='lead'>
      //         {this.state.loginError}
      //         </p>
      //       </main>



      //     </div>

      //   </div>

      // </div>
    
    

    <div className='peers ai-s fxw-nw h-100vh'>
      <div className='d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv' style={{ 'background-image': `url(${img1})` }}>
       
      </div>
      <div className='col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r' style={{ 'min-width': '320px;' }}>
        <h2 className='fw-300 c-grey-900 mB-40'>Welcome to TrustCert</h2>
  
                    <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                      <div className="form-group row">
                      <label for="inputPassword3" class="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                          <input type="email" class="form-control" id="inputEmail3" placeholder="Email"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                          <input type="password" class="form-control" id="inputPassword3" placeholder="Password"/>
                        </div>
                      </div>
                      <fieldset className="form-group">
                        <div className="row">
                          <div className="col-sm-10">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                                    Student
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                                    University
                              </label>
                            </div>
                            <div className="form-check disabled">
                              <label className="form-check-label">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3"/>
                                    Employer
                              </label>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <div className="form-group row">
                        <div className="col-sm-10">
                          <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                      </div>
                    </form>
      </div>
    </div>

    )
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({SaveUser : SaveUser}, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(LandingPage))
