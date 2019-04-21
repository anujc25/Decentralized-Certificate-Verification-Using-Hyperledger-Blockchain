import React, {Component} from 'react';
import HomePageUniversity from './HomePageUniversity'
import HomePageStudent from './HomePageStudent'
import HomePageEmployer from './HomePageEmployer'
import {withRouter } from 'react-router-dom';
import {connect} from 'react-redux'

import Sidebar from '../Generic/Sidebar'
import HeaderNavBar from '../Generic/HeaderNavBar';

class HomePage extends Component{
    
    renderRelaventPage = () => {        
        console.log(this.props.userDetail)
        if (this.props.userDetail && this.props.userDetail.role){
            console.log(this.props.userDetail.role)
            switch(this.props.userDetail.role){
                case 'UNIVERSITY':
                    return(
                        <HomePageUniversity/>
                    );
                    break;
                case 'STUDENT':
                    console.log("Inside Student")
                    return(
                        <HomePageStudent/>
                    );
                    break;
                case 'EMPLOYER':
                    return(
                        <HomePageEmployer/>
                    );
                    break;
                default:                
                    this.props.history.push('/')
                    break;
            }
        }

        // TODO: REMOVE BELOW DEFAULT
        return(
            <HomePageUniversity/>
        );

        this.props.history.push('/')                    
    }
    render(){
        return(
            <div>
                <Sidebar/>
                <div className="page-container">
                    <HeaderNavBar/>
                    <main className='main-content bgc-grey-100'>
                        <div id='mainContent'>
                            <div className="container-fluid">
                            {this.renderRelaventPage()}                       
                            </div>
                        </div>
                    </main>            
              </div>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        userDetail: state.userDetail
    }
}

export default withRouter(connect(mapStateToProps)(HomePage))
