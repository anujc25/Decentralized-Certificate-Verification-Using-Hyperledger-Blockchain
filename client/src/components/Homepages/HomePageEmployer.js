import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import * as API from '../../services/certificateUploadService';
import '../../css/offCanvas.css';
import SharedDiplomaList from './UniversityComponents/DiplomaList';
import UniversityNewUpload from './UniversityComponents/UniversityNewUpload';

class HomePageEmployer extends Component{

    state = {
        showUploadDiplomaPopuup: false
    };

    render(){
        return(
            <div className="container">
        
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading text-muted">Employer Page</h1>
                        <p>
                            <a className="btn btn-primary my-2" onClick={() => this.props.history.push('/')}>Logout</a>
                        </p>
                    </div>
                </section>
                <div class="media text-muted pt-1">
                        Diploma shared with me
                </div>
                <SharedDiplomaList role="EMPLOYER"/>
            </div>    
        );
    }
}

export default withRouter(HomePageEmployer);