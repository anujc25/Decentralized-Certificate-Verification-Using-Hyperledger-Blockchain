import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import * as API from '../../services/diplomaService'
import '../../css/offCanvas.css'
import DiplomaList from './UniversityComponents/DiplomaList'
import AddEmailPopup from '../AddEmailPopup'
import {connect} from 'react-redux'

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
      if (this.props.userDetail.emailIds && this.props.userDetail.emailIds.length > 0) {
          return this.props.userDetail.emailIds.map((id,index)=>{
              return(
                      <tr>
                          <td align="left">{id}</td>
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


function mapStateToProps(state){
    return {
        userDetail: state.userDetail
    }
}

export default withRouter(connect(mapStateToProps)(HomePageStudent))