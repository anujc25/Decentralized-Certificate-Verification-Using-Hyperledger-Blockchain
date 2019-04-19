import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { Route, Link, Switch, Redirect,withRouter, BrowserRouter } from 'react-router-dom'
import '../css/cover.css'
import * as API from './../services/loginService'
import {SaveUser} from '../actions/actions'
import {connect} from 'react-redux'

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
    // <div classNameName="container">
    //     <div classNameName="row">
    //     <button type="text" className="btn btn-primary" onClick={() => this.props.history.push("/registeruniversity")}>Register</button>
    //     <button type="text" className="btn btn-primary" onClick={() => this.props.history.push("/homepage")}>Login</button>

    //     </div>

    // </div>

      <div classNameName='site-wrapper'>

        <div classNameName='site-wrapper-inner'>

          <div className='cover-container'>
            <main role='main' className='inner cover'>
              <h1 className='cover-heading'>TrustCert</h1>
              <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                <label for="issuer">Username</label>
                <input type="text" className="form-control" id="studentEmail"  placeholder="Enter Username"
                    onChange={(event) => {
                    this.setState({
                            ...this.state,
                            username: event.target.value
                        });
                    }}
                >
                </input>
                <label for="issuer">Secret</label>
                <input type="text" className="form-control" id="studentEmail"  placeholder="Enter Secret"
                    onChange={(event) => {
                    this.setState({
                            ...this.state,
                            secret: event.target.value
                        });
                    }}
                >
                </input>
                <label for="issuer">Role</label>
                <select name="role" onChange={(event) => {
                    this.setState({
                      ...this.state,
                      role: event.target.value
                    })
                }}>
                  <option value="STUDENT">STUDENT</option>
                  <option value="UNIVERSITY">UNIVERSITY</option>
                  <option value="EMPLOYER">EMPLOYER</option>
                </select>
              </form>
              <p className='lead'>
                <button type='text' className='btn btn-primary' onClick={() => this.props.history.push('/registeruniversity')}>Register</button>

                <div style={{ 'width': '5px',
                  'height': 'auto',
                  'display': 'inline-block' }} />

                <button type='text' className='btn btn-primary' onClick={this.doLogin}>Login</button>
              </p>
              <p className='lead'>
              {this.state.loginError}
              </p>
            </main>



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
