import React, { Component } from 'react'
import ListItem from '../Common/ListItem'
import {connect} from 'react-redux'

class Sidebar extends Component {

  componentDidMount () {
  }

  renderRelaventPage = () => {
    console.log(this.props.userDetail)
    if (this.props.userDetail && this.props.userDetail.role){
        
        switch(this.props.userDetail.role){
            case 'UNIVERSITY':
                return(
                  <ListItem value='Upload Diploma' icon='c-blue-500 ti-share' />
                );
                break;
            case 'STUDENT':
                return(
                  <ListItem value='My Emails' icon='c-blue-500 ti-share' />
                );
                break;
           
            default:                
                break;
        }
    }
  
  }

  render () {
    let sideBarOptionsList
    
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
                        <img src='/logo.png' alt='' />
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
            <ListItem value='Dashboard' icon='c-blue-500 ti-home' />
            {this.renderRelaventPage()}
            <ListItem value='Profile' icon='c-blue-500 ti-user' />
            <ListItem value='Logout' icon='c-red-500 ti-power-off' />
          </ul>
          
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userDetail: state.userDetail,
    studentViewUpdate: state.studentViewUpdate
  }
}

export default connect(mapStateToProps)(Sidebar)

