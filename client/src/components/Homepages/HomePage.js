import React, {Component} from 'react';
import HomePageUniversity from './HomePageUniversity'
import HomePageStudent from './HomePageStudent'
import HomePageEmployer from './HomePageEmployer'
import {withRouter } from 'react-router-dom';

class HomePage extends Component{
    
    state = {
        userIdentity :"UNIVERSITY"
    }

    renderRelaventPage = () => {
        if (this.state.userIdentity == "STUDENT" ){
            console.log("Inside Student")
            return(
                <HomePageStudent/>
            );
        }
        
        if (this.state.userIdentity == "UNIVERSITY" ){
            return(
                <HomePageUniversity/>
            );
        }

        if (this.state.userIdentity == "EMPLOYER" ){
            return(
                <HomePageEmployer/>
            );
        }
    }
    render(){
        return(
            <div className="container">
                <div className="row">

                {this.renderRelaventPage()} 
                    
                </div>
            </div>
        );
    }
}

export default withRouter(HomePage);