import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import StudentEmailsDataTable from '../Generic/Tables/StudentEmailsDataTable';
import StudentDataTable from '../Generic/Tables/StudentDataTable';
import * as BackendAPI from '../../services/backendAPI'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {SaveEmailIds} from '../../actions/actions'

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
        console.log("this.props.studentViewUpdate",this.props.studentViewUpdate)
        if (this.props.studentViewUpdate && this.props.studentViewUpdate.view){
            if(this.props.studentViewUpdate.view == "Dashboard"){
                return(
                    <StudentDataTable/>
                );
                
            }
            else{
                return(
                    <StudentEmailsDataTable/>
                    );
            }
        }
    }

    render(){
        return(    
            <div>
            <h4 className="c-grey-900 mT-10 mB-30">My Diploma</h4>
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
      userDetail: state.userDetail,
      studentViewUpdate: state.studentViewUpdate
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({SaveEmailIds : SaveEmailIds}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePageUniversity));
