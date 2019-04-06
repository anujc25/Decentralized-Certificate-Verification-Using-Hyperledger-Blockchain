import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import * as API from '../../services/diplomaService';
import '../../css/offCanvas.css';
import DiplomaList from './UniversityComponents/DiplomaList';
import AddEmailPopup from '../AddEmailPopup';

class HomePageStudent extends Component{

    state = {
        showUploadDiplomaPopuup: false
    };

    togglePopup() {
        this.setState({
            showUploadDiplomaPopuup: !this.state.showUploadDiplomaPopuup
        });
    }

    renderEmailIdInformation = () => {
      if (this.state.allDiplomas && this.state.allDiplomas.length > 0) {
          return this.state.allDiplomas.map((diploma,index)=>{
              return(
                      <tr>
                          <td>{diploma.degree}</td>
                          <td>{diploma.department}</td>
                      </tr>           
              );
          });
      }     
    }

    render(){
        return(
            <div className="container">
        
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading text-muted">Student Page</h1>
                        <p className="lead text-muted">Click on Add EmailId button to register new email-id</p>
                        <p>
                            {/* <a className="btn btn-primary my-2" onClick={() => this.props.history.push('/homepage/university/uploadcertificate')}>Upload New Certificate</a> */}
                            <a className="btn btn-primary my-2" onClick={this.togglePopup.bind(this)}>Add EmailId</a>
                            {/* <button onClick={this.togglePopup.bind(this)}>show popup</button> */}
                            <a className="btn btn-primary my-2" onClick={() => this.props.history.push('/')}>Logout</a>
                        </p>
                    </div>
                </section>

                <div class="media text-muted pt-1">
                        Registered Email-Ids
                </div>
                <div class="my-3 p-3 bg-white rounded shadow-sm">
                    <div class="media text-muted pt-3">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>Email-Id</th>
                                    <th>Verified</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderEmailIdInformation()}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="media text-muted pt-1">
                        My Diploma
                </div>

                <DiplomaList role="STUDENT"/>

                {this.state.showUploadDiplomaPopuup ? 
                    <AddEmailPopup closeUploadPopup={this.togglePopup.bind(this)}/>
                    : null
                }

            </div>    
        );
    }
}

export default withRouter(HomePageStudent);