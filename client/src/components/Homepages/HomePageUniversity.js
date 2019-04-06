import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import * as API from '../../services/diplomaService';
import '../../css/offCanvas.css';
import UniversityAllUploads from './UniversityComponents/DiplomaList';
import UniversityNewUpload from './UniversityComponents/UniversityNewUpload';

class HomePageUniversity extends Component{

    state = {
        showUploadDiplomaPopuup: false
    };

    togglePopup() {
        this.setState({
            showUploadDiplomaPopuup: !this.state.showUploadDiplomaPopuup
        });
    }

    render(){
        return(
            <div className="container">
        
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading text-muted">University Page</h1>
                        <p className="lead text-muted">Click on upload button to upload a new certificate</p>
                        <p>
                            {/* <a className="btn btn-primary my-2" onClick={() => this.props.history.push('/homepage/university/uploadcertificate')}>Upload New Certificate</a> */}
                            <a className="btn btn-primary my-2" onClick={this.togglePopup.bind(this)}>Upload Certificate</a>
                            {/* <button onClick={this.togglePopup.bind(this)}>show popup</button> */}
                            <a className="btn btn-primary my-2" onClick={() => this.props.history.push('/')}>Logout</a>
                        </p>
                    </div>
                </section>

                <div class="media text-muted pt-1">
                        Issued Diploma
                </div>

                <UniversityAllUploads role="UNIVERSITY"/>

                {this.state.showUploadDiplomaPopuup ? 
                    <UniversityNewUpload closeUploadPopup={this.togglePopup.bind(this)}/>
                    : null
                }

            </div>    
        );
    }
}

export default withRouter(HomePageUniversity);