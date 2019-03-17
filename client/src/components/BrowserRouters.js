import React, { Component } from 'react'
import { Route, Link, Switch, Redirect, withRouter, BrowserRouter } from 'react-router-dom'
import HomePage from '../components/Homepages/HomePage'
import HomePageEmployer from '../components/Homepages/HomePageEmployer'
import HomePageStudent from '../components/Homepages/HomePageStudent'
import HomePageUniversity from '../components/Homepages/HomePageUniversity'

import RegisterUniversity from './UniversityRegister'
import LandingPage from './LandingPage'

class BrowserRouters extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => <HomePageUniversity />} />
          <Route exact path='/registeruniversity' render={() => <RegisterUniversity />} />
          <Route exact path='/homepage' render={() => <HomePage />} />
          <Route exact path='/homepage/student' render={() => <HomePageStudent />} />
          <Route exact path='/homepage/employer' render={() => <HomePageEmployer />} />
          <Route exact path='/homepage/university' render={() => <HomePageUniversity />} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default withRouter(BrowserRouters)
