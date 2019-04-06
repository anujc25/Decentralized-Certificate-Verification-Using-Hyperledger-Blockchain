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
    secret: ''    
}

  doLogin = (e) => {

  var payload = {
      username: this.state.username,
      secret : this.state.secret
  }

  API.universityLogin(payload)
      .then((res) => {
        console.log(res);
        if (!res.error && res.result && res.result.role) {
          if (res.result.role != ''){
            this.props.SaveUser({userName: this.state.username})
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
              <h1 className='cover-heading'>Welcome to the Vericert Application</h1>
              <p className='lead'>Please click on Register if signing in for the first time</p>
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
