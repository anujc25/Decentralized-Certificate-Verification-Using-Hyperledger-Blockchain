import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import * as API from '../../services/diplomaService';
import '../../css/offCanvas.css';
import UniversityAllUploads from './UniversityComponents/DiplomaList';
import UniversityNewUpload from './UniversityComponents/UniversityNewUpload';

import EmployerDataTable from '../Generic/Tables/EmployerDataTable';

class HomePageEmployer extends Component{

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

    render(){
        return(    
            <div>
            <h4 className="c-grey-900 mT-10 mB-30">Shared Diploma</h4>
            <div className="row">
              <div className="col-md-12">
                <EmployerDataTable/>
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

export default withRouter(HomePageEmployer);