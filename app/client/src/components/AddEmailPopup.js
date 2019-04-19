import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import * as API from '../services/diplomaService';
import * as BackendAPI from '../services/backendAPI';
// import '../../css/offCanvas.css';
import '../css/popup.css';
import {connect} from 'react-redux';

class UniversityNewUpload extends Component{
   state = {
        'username': this.props.userDetail.userName,
        'emailId': '',
        'message':''
    };

    onSubmit = (e) => {
        e.preventDefault()

        var payload = {
            'studentPrimaryEmail': this.state.username,
            'studentSecondaryEmail': this.state.emailId
        }

        BackendAPI.addStudentEmailId(payload).then((res) =>{
            if (res.status == 200) {
                this.setState({
                    ...this.state,
                    message: 'Email-id successfully added. Please check your inbox.'
                })
            }
        })
    }

    render(){
        return(
            <div className='popup'>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                        </div>
                        <div className="col-sm-6 rounded" style={{"background-color":"#222"}}>
                            <h2>Register an Email-Id</h2>

                            <div className="form-group">
                                <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                                    <label for="issuer">Student Email-Id</label>
                                    <input type="text" className="form-control" id="studentEmail"  placeholder="Enter Email-Id"
                                        onChange={(event) => {
                                        this.setState({
                                                ...this.state,
                                                emailId: event.target.value
                                            });
                                        }}
                                    >
                                    </input>
                                    <div style={{ 'width': '5px',
                                                'height': 'auto',
                                                'display': 'inline-block' }} />
                                    <div>
                                        <button className='btn btn-primary' type="submit">Register</button>
                                        <button className='btn btn-primary' onClick={() => this.props.closeUploadPopup()}>Close</button>
                                    </div>

                                </form>
                                <label for="message">{this.state.message}</label>
                            </div>
                        </div>
                        <div class="col-sm-3">
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

export default withRouter(connect(mapStateToProps)(UniversityNewUpload));