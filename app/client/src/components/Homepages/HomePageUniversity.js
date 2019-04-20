import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import * as API from '../../services/diplomaService';
import '../../css/offCanvas.css';
import UniversityAllUploads from './UniversityComponents/DiplomaList';
import UniversityNewUpload from './UniversityComponents/UniversityNewUpload';

import Sidebar from '../Generic/Sidebar'
import HeaderNavBar from '../Generic/HeaderNavBar';
import DataTable from '../Generic/DataTable';

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

    render(){
        return(    
            <div>
              <Sidebar/>
              <div className="page-container">
                <HeaderNavBar/>
                <main className='main-content bgc-grey-100'>
                  <div id='mainContent'>
                    <div className="container-fluid">
                      <h4 className="c-grey-900 mT-10 mB-30">Data Tables</h4>
                      <div className="row">
                        <div className="col-md-12">
                          <DataTable/>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
        
                <footer className="bdT ta-c p-30 lh-0 fsz-sm c-grey-600">
                  <span>Copyright © 2017 Designed by <a href="https://colorlib.com" target='_blank' title="Colorlib">Colorlib</a>. All rights reserved.</span>
                </footer>
              </div>
            </div>          
        );
    }
}

export default withRouter(HomePageUniversity);