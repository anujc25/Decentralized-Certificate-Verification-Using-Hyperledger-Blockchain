import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import * as API from '../services/diplomaService'
import '../css/popup.css'
import {connect} from 'react-redux'

class ShareDiplomaPopup extends Component{
   state = {
        emailId: '',
        shareResult: ''
    };

    shareDiplomaClick(e) {
        e.preventDefault();
        var payload = {
            username: this.props.userDetail.userName,
            employerEmail: this.state.emailId,
            diplomaUuid: this.props.uuid
        }
        API.shareStudentDiploma(payload)
        .then((res) => {
            console.log(res);
            if (!res.error && res.result) {
                this.setState({
                    ...this.state,
                    shareResult: "Share Success. " + res.result,
                });            
            } else {
                this.setState({
                    ...this.state,
                    shareResult: "Share Failed. " + res.error,
                });            
            }
        });
    }

    render(){
        return(
            <div className='popup'>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                        </div>
                        <div className="col-sm-6 rounded" style={{"background-color":"#222"}}>
                            <h2>Share Diploma</h2>

                            <div className="form-group">
                                <form>
                                    <label>Diploma UUID: {this.props.uuid}</label>
                                    <label>Employer Email-Id</label>
                                    <input type="text" className="form-control" id="studentEmail" placeholder="Enter Email-Id"
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
                                        <button className='btn btn-primary' onClick={(e) => this.shareDiplomaClick(e)}>Share</button>
                                        <button className='btn btn-primary' onClick={() => this.props.closeUploadPopup()}>Close</button>
                                    </div>

                                </form>
                                <label for="message">{this.state.shareResult}</label>
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

export default withRouter(connect(mapStateToProps)(ShareDiplomaPopup));