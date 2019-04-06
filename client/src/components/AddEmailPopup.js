import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import * as API from '../services/certificateUploadService';
// import '../../css/offCanvas.css';
import '../css/popup.css';

class UniversityNewUpload extends Component{
   state = {
        emailId: ''
    };

    onSubmit = (e) => {
        e.preventDefault();
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

export default withRouter(UniversityNewUpload);