import React, { Component } from 'react'
import ApplyDataTableProperties from '../../../assets/scripts/datatable/index.js'
import * as $ from 'jquery'
import 'datatables.net'
import * as API from '../../../services/getAllDiplomas'
import * as diplomaAPI from '../../../services/diplomaService'
import * as BackendAPI from '../../../services/backendAPI'
import {bindActionCreators} from 'redux'
import {SaveEmailIds} from '../../../actions/actions'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Row from './StudentTableRow'

class StudentDataTable extends Component {


  state = {      
    allDiplomas :[],
    username: this.props.userDetail.userName,
    emailIds : "",
    showUploadDiplomaPopuup : false,
    diplomaUuid : "",
    employerEmailId: "",
    message: ""
  };

  dataTable = null

  componentWillMount () {
    console.log("componentWillMount")
    let payload = { "username" : this.props.userDetail.userName}

    // get student emailIds
    BackendAPI.allStudentEmailIds(payload).then((res) =>{
        var studentEmailIds = ""
        var ids = []

        if (res) {
          ids = Object.keys(res)
          if (ids && ids.length > 0) {
            ids.map((id) => {
              studentEmailIds += id
              studentEmailIds += ","
            })
          }
        }

        // get diploma for emailIds
        this.setState({
            ...this.state,
            emailIds : studentEmailIds
        }, () => {
            var payload = {
                username: this.state.username,
                emailIds: this.state.emailIds
            }
            API.allStudentDiplomas(payload).then((res) =>{
                this.setState({
                    allDiplomas : res
                })
            })
        })

        // save emailIds in reducer
        var obj = {
            emailIds: ids
          }
        this.props.SaveEmailIds(obj)
    })
  }

  componentDidMount(){
    console.log("componentDidMount")    
  }

  componentWillUpdate(){
    if (this.dataTable){
      this.dataTable.destroy();      
    }
  }

  componentDidUpdate(){    
    console.log("componentDidUpdate")    
    let t = $('#studentDataTable').DataTable()
    console.log("Datatable:", t)
    this.dataTable = t
  }

  applyDataTable(){
    ApplyDataTableProperties()
  }

  setPopupState(uuid) {
    this.setState({
      ...this.state,
      diplomaUuid: uuid,
      employerEmailId: "",
      message:""
    })
  }

  renderDiplomaInformation = () => {
    if (this.state.allDiplomas && this.state.allDiplomas.length > 0) {    
        return this.state.allDiplomas.map((diploma,index)=>{
            return(                    
                <Row key={index} openPopup={this.setPopupState.bind(this)} diploma={diploma} />        
            );
        });
    }     
  }

  shareDiploma = () => {
    var payload = {
      username: this.props.userDetail.userName,
      employerEmail: this.state.employerEmailId,
      diplomaUuid: this.state.diplomaUuid
    }
    diplomaAPI.shareStudentDiploma(payload)
    .then((res) => {
        console.log(res);
        this.setState({
            ...this.state,
            message: res.Status
        }); 
    })
    .catch((res) => {
        console.log(res)
        this.setState({
            message: res.Status,
        });   
    });
  }

  onCloseModal = () => {
    this.newEmailAddress = null
  }

  render () {
  
    return (
      <div>
        <div className='bgc-white bd bdrs-3 p-20 mB-20'>
          {/* <h4 className='c-grey-900 mB-20'>Issued Student Diploma</h4> */}
          <table id='studentDataTable' className='table table-striped table-bordered' width='100%'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Degree</th>
                <th>Graduation Term</th>
                <th>Timestamp</th>
                <th>Download</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>              
              {this.renderDiplomaInformation()}
            </tbody>
          </table>
        </div>
        <div className="modal fade" id="shareDiploma" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Share Diploma</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group row">                        
                  <div className="col-sm-12">
                    <label>Diploma UUID: {this.state.diplomaUuid}</label>
                  </div>
                  <div className="col-sm-12">
                    <input type="text" class="form-control" id="register-new-email" placeholder="Enter Email" 
                          onChange={(event) => {
                            this.setState({
                                    ...this.state,
                                    employerEmailId: event.target.value
                                });
                            }}/>
                  </div>
                  <div className="col-sm-12">
                    <label>{this.state.message}</label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onCloseModal()}>Close</button>
                <button type="button" className="btn btn-primary" onClick={this.shareDiploma}>Share</button>
              </div>
            </div>
          </div>
        </div>
    </div>      
    )
  }
}

function mapStateToProps (state) {
  return {
    userDetail: state.userDetail
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({SaveEmailIds : SaveEmailIds}, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentDataTable))
