import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import * as API from '../../services/certificateUploadService';
import '../../css/offCanvas.css';
import UniversityAllUploads from './UniversityComponents/UniversityAllUploads';
import UniversityNewUpload from './UniversityComponents/UniversityNewUpload';

class HomePageUniversity extends Component{
  
     render(){
        return(
            <div className="container">
            
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading text-muted">University Page</h1>
                        <p className="lead text-muted">Click on upload button to upload a new certificate</p>
                        <p>
                            <a className="btn btn-primary my-2" onClick={() => this.props.history.push('/homepage/university/uploadcertificate')}>Upload New Certificate</a>
                        </p>
                    </div>
                </section>

                <UniversityAllUploads/>

                </div>
                
           
        );
    }
}

export default withRouter(HomePageUniversity);