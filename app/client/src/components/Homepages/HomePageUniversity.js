import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import * as API from '../../services/diplomaService';
import '../../css/offCanvas.css';
import UniversityAllUploads from './UniversityComponents/DiplomaList';
import UniversityNewUpload from './UniversityComponents/UniversityNewUpload';

import UniversityDataTable from '../Generic/Tables/UniversityDataTable';
import {connect} from 'react-redux'

class HomePageUniversity extends Component{

    state = {
        showUploadDiplomaPopuup: false
    };

    togglePopup() {
        this.setState({
            showUploadDiplomaPopuup: !this.state.showUploadDiplomaPopuup
        });
    }

    componentDidMount(){
    }

    renderRelaventView = () => {
        console.log("this.props.universityViewUpdate",this.props.universityViewUpdate)
        if (this.props.universityViewUpdate && this.props.universityViewUpdate.view){
            if(this.props.universityViewUpdate.view == "Dashboard"){
                return(
                    <UniversityDataTable/>
                );
                
            }
            else{
                return(
                    <UniversityNewUpload/>
                    );
            }
        }
    }

    render(){
        return(    
            <div>
            <h4 className="c-grey-900 mT-10 mB-30">Issued Student Diploma</h4>
            <div className="row">
              <div className="col-md-12">
                {this.renderRelaventView()}
              </div>
            </div>
            </div>          
        );
    }
}

function mapStateToProps(state){
  return {
    universityViewUpdate: state.universityViewUpdate
  }
}

export default withRouter(connect(mapStateToProps)(HomePageUniversity))