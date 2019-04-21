import React, { Component } from 'react'
import ListItem from '../Common/ListItem'
class Sidebar extends Component {
  componentDidMount () {
  }

  render () {
    let sideBarOptionsList

    if (this.props.userDetail && this.props.userDetail.role) {
      switch (this.props.userDetail.role) {
        case 'UNIVERSITY':
          // sideBarOptionsList
          break
      }
    }
    return (
      <div className='sidebar'>
        <div className='sidebar-inner'>
          <div className='sidebar-logo'>
            <div className='peers ai-c fxw-nw'>
              <div className='peer peer-greed'>
                <a className='sidebar-link td-n' href='/'>
                  <div className='peers ai-c fxw-nw'>
                    <div className='peer'>
                      <div className='logo'>
                        <img src='/logo.svg' alt='' />
                      </div>
                    </div>
                    <div className='peer peer-greed'>
                      <h5 className='lh-1 mB-0 logo-text'>TrustCert</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div className='peer'>
                <div className='mobile-toggle sidebar-toggle'>
                  <a href='' className='td-n'>
                    <i className='ti-arrow-circle-left' />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ul className='sidebar-menu scrollable pos-r'>
            <ListItem value='Dashboard' icon='ti-home' />
            <ListItem value='Upload Diploma' icon='ti-share' />
            <ListItem value='Logout' icon='ti-power-off' />
          </ul>
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

export default Sidebar
