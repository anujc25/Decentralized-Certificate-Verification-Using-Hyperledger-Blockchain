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



        <div class='peers ai-s fxw-nw h-100vh'>
          <div class='d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv' style={{ 'background-image': `url(${img1})` }}>
            <div class='pos-a centerXY'>
              <div class='bgc-white bdrs-50p pos-r' style={{ 'width': '120px', 'height': '120px' }}>
                <img class='pos-a centerXY' src='assets/static/images/logo.png' alt='' />
              </div>
            </div>
          </div>
          <div class='col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r' style={{ 'min-width': '320px;' }}>
            <h4 class='fw-300 c-grey-900 mB-40'>Login</h4>
            <form>
              <div class='form-group'>
                <label class='text-normal text-dark'>Username</label>
                <input type='email' class='form-control' placeholder='John Doe' />
              </div>
              <div class='form-group'>
                <label class='text-normal text-dark'>Password</label>
                <input type='password' class='form-control' placeholder='Password' />
              </div>
              <div class='form-group'>
                <div class='peers ai-c jc-sb fxw-nw'>
                  <div class='peer'>
                    <div class='checkbox checkbox-circle checkbox-info peers ai-c'>
                      <input type='checkbox' id='inputCall1' name='inputCheckboxesCall' class='peer' />
                      <label for='inputCall1' class=' peers peer-greed js-sb ai-c'>
                        <span class='peer peer-greed'>Remember Me</span>
                      </label>
                    </div>
                  </div>
                  <div class='peer'>
                    <button class='btn btn-primary'>Login</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ SaveUser: SaveUser }, dispatch)
}

export default withRouter(connect(null, mapDispatchToProps)(LandingPage))
