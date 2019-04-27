import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import ApplySideBarProperties from '../../assets/scripts/sidebar/index.js'

class HeaderNavBar extends Component {
  componentDidMount () {
    ApplySideBarProperties()
  }

  render () {
    return (
      <div>
        <div className='header navbar'>
          <div className='header-container'>
            <ul className='nav-left'>
              <li>
                <a id='sidebar-toggle' className='sidebar-toggle' href='javascript:void(0);'>
                  <i className='ti-menu' />
                </a>
              </li>
              <li className='search-box'>
                <a className='search-toggle no-pdd-right' href='javascript:void(0);'>
                  <i className='search-icon ti-search pdd-right-10' />
                  <i className='search-icon-close ti-close pdd-right-10' />
                </a>
              </li>
              <li className='search-input'>
                <input className='form-control' type='text' placeholder='Search...' />
              </li>
            </ul>
            <ul className='nav-right'>
              <li className='dropdown'>
                <a href='javascript:void(0)' className='no-after peers fxw-nw ai-c lh-1'>
                  <div className='peer mR-10'>
                    <img className='w-2r bdrs-50p' src='https://randomuser.me/api/portraits/lego/5.jpg' alt='' />
                  </div>
                  <div className='peer'>
                    <span className='fsz-sm c-grey-900'>{this.props.userDetail.firstName} {this.props.userDetail.lastName}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userDetail: state.userDetail
  }
}
export default withRouter(connect(mapStateToProps)(HeaderNavBar))
