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
        let payload = { "username" : this.props.userDetail.userName}
        BackendAPI.allStudentEmailIds(payload).then((res) =>{
            var ids = []
            if (res && res.length > 0) {
                res.map((e) => {
                    ids.push(e.email)
                })
            }
            var obj = {
                emailIds: ids
            }
            this.props.SaveEmailIds(obj)
        })
    }

    render(){
        return(    
            <div>
            <h4 className="c-grey-900 mT-10 mB-30">My Diploma</h4>
            <div className="row">
              <div className="col-md-12">
                <StudentDataTable/>
                {/* <StudentEmailsDataTable/> */}
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

function mapDispatchToProps(dispatch){
    return bindActionCreators({SaveEmailIds : SaveEmailIds}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePageUniversity));