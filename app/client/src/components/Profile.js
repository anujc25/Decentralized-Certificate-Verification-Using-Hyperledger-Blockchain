import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import * as API from '../services/backendAPI'

class Profile extends Component{
 
    state = {
        oldPassword:'',
        newPassword : '',
        message:""
    };

    onSubmit = (e) => {
        let payload;
        let url;

        if(this.props.userDetail.role == "STUDENT"){
            url = "/students/"+this.props.userDetail.userName+"/passwordchange"
        } 
        else if(this.props.userDetail.role == "UNIVERSITY"){
            url = "/students/"+this.props.userDetail.userName+"/passwordchange"
        }
        else{
            url = "/students/"+this.props.userDetail.userName+"/passwordchange"
        }
        payload = {
            "oldPassword":this.state.oldPassword,
            "newPassword":this.state.newPassword
        }

        API.updatePassword(url,payload)
            .then((res) => {
                console.log(res);
                if ("Jay" == "Jay"){
                    this.setState({
                        message: "Password Changed successfully",
                    }); 
                }
                else{
                    this.setState({
                        message: "Password Changed Failed",
                    }); 
                }
            })
        
    }

    render(){
        return(
            <div class="row gap-20 masonry pos-r">
            <div class="masonry-item col-md-6">
            <div>
                    <div class="layers bd bgc-white p-15">
                      <div class="layer w-100 mB-10">
                        <h4 class="c-grey-900">Email Id</h4>
                        <label>{this.props.userDetail.userName}</label>
                      </div>
                    </div>
                  </div>
                  <div style={{ 'width': '5px',
                  'height': 'auto',
                  'display': 'inline-block' }} />

                  <div>
                    <div class="layers bd bgc-white p-15">
                      <div class="layer w-100 mB-10">
                        <h4 class="c-grey-900">Role</h4>
                        <label>{this.props.userDetail.role}</label>
                      </div>
                    </div>
                  </div>
                  <div style={{ 'width': '5px',
                  'height': 'auto',
                  'display': 'inline-block' }} />

                  <div>
                    <div class="layers bd bgc-white p-15">
                      <div class="layer w-100 mB-10">
                        <h4 class="c-grey-900">First Name</h4>
                        <label>{this.props.userDetail.firstName}</label>
                      </div>
                    </div>
                  </div>
                  <div style={{ 'width': '5px',
                  'height': 'auto',
                  'display': 'inline-block' }} />

                  <div>
                    <div class="layers bd bgc-white p-15">
                      <div class="layer w-100 mB-10">
                        <h4 class="c-grey-900">Last Name</h4>
                        <label>{this.props.userDetail.lastName}</label>
                      </div>
                    </div>
                  </div>
             </div>  
             
            
            <div class="masonry-item col-md-6">
                <div class="bgc-white p-20 bd">
                    <h6 class="c-grey-900">Update Password</h6>
                    <div class="mT-30">
                        <form onSubmit={this.onSubmit}>
                            <div class="form-row">
                                <div class="form-group col-md-10">

                                    <label>Old Password</label>
                                    <input type="text" className="form-control" id="oldPassword"  placeholder="Enter Old Password"
                                                onChange={(event) => {
                                                this.setState({
                                                        ...this.state,
                                                        oldPassword: event.target.value
                                                    });
                                                }}
                                            >
                                    </input>

                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-10">

                                    <label>New Password</label>
                                    <input type="text" className="form-control" id="newPassword" placeholder="Enter New Password"
                                        onChange={(event) => {
                                            this.setState({
                                                    ...this.state,
                                                    newPassword: event.target.value
                                                });
                                            }}
                                    >
                                    </input>

                                </div>
                            </div>
                            
                            <button className='btn btn-primary' type="submit">Submit</button>
                        </form>
                        <label>{this.state.message}</label>
                    </div>
                </div> 
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

export default connect(mapStateToProps)(Profile)

