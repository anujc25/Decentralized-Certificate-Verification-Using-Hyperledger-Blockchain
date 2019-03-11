import React, { Component } from 'react'
import { Route, Link, Switch, Redirect, withRouter, BrowserRouter } from 'react-router-dom'
import HomePage from '../components/Homepages/HomePage'
import RegisterUniversity from './UniversityRegister'
import LandingPage from './LandingPage'

class BrowserRouters extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => <LandingPage />} />
          <Route exact path='/registeruniversity' render={() => <RegisterUniversity />} />
          <Route exact path='/homepage' render={() => <HomePage />} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default withRouter(BrowserRouters)
