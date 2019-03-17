import React, { Component } from 'react'
import { Route, Link, Switch, Redirect,withRouter, BrowserRouter } from 'react-router-dom'
import '../css/cover.css'
import * as API from './../services/loginService';

class LandingPage extends Component {

  state = {
    loginError: '',    
}

  doLogin = (e) => {

    var payload = {
      username: "admin_test",
      secret : "admin_testpw"
  }

  API.universityLogin(payload)
      .then((res) => {
        console.log(res);
          if (!res.error && res.result && res.result.role) {
            switch (res.result.role) {
              case "STUDENT":
                this.props.history.push('/homepage/student')  
                break;
                case "UNIVERSITY":
                this.props.history.push('/homepage/university')  
                break;
                case "EMPLOYER":
                this.props.history.push('/homepage/employer')  
                break;
            
              default:
                this.setState({
                  loginError: "Login Failed. " + res.error,
                });
                break;
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

export default withRouter(LandingPage)
