import React, { Component } from 'react'
import ApplyDataTableProperties from '../../../assets/scripts/datatable/index.js'
import * as $ from 'jquery'
import 'datatables.net'
import {bindActionCreators} from 'redux'
import {SaveEmailIds} from '../../../actions/actions'
import * as BackendAPI from '../../../services/backendAPI'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Row from './StudentEmailsTableRow'

class StudentEmailsDataTable extends Component {

  dataTable = null
  newEmailAddress = null

  componentWillMount () {    
    console.log("STUDENT EMAIL WILL MOUNT")
    if (this.dataTable){
      this.dataTable.destroy();      
    }
  }

  componentDidMount() {
    console.log("STUDENT EMAIL DID MOUNT")
    let t = $('#studentEmaildataTable').DataTable()
    this.dataTable = t
  }

  componentWillUpdate(){
    console.log("STUDENT EMAIL WILL UPDATE")
    if (this.dataTable){
      this.dataTable.destroy();      
    }
  }

  componentDidUpdate(){
    console.log("STUDENT EMAIL DID UPDATE")
    let t = $('#studentEmaildataTable').DataTable()
    this.dataTable = t
  }

  renderEmailInformation = () => {
    if (this.props.userDetail.emailIds && this.props.userDetail.emailIds.length > 0) {    
        return this.props.userDetail.emailIds.map((emailId,index)=>{
            return(                    
                <Row key={index} email={emailId} />        
            );
        });
    }    
}

registerEmail = () => {
  console.log("Email:", this.newEmailAddress)
  if(this.newEmailAddress){
    var payload = {
      'studentPrimaryEmail': this.props.userDetail.userName,
      'studentSecondaryEmail': this.newEmailAddress
    }

    BackendAPI.addStudentEmailId(payload).then((res) =>{
        if (res.status == 200) {
            console.log('Email-id successfully added. Please check your inbox.')
            // this.setState({
            //     ...this.state,
            //     message: 'Email-id successfully added. Please check your inbox.'
            // })
        }
    })
  }
}

onCloseModal = () => {
  this.newEmailAddress = null
}

  render () {
  
    return (
      <div>
        <div className='bgc-white bd bdrs-3 p-20 mB-20'>
          <table id='studentEmaildataTable' className='table table-striped table-bordered' width='100%'>
            <thead>
              <tr>
                <th>Email-Ids</th>
              </tr>
            </thead>
            <tbody>              
              {this.renderEmailInformation()}
            </tbody>
          </table>
          <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#registerNewEmail">
              Register New Email
            </button>

            <div className="modal fade" id="registerNewEmail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Register New Email</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group row">                        
                      <div className="col-sm-10">
                        <input type="text" class="form-control" id="register-new-email" placeholder="Enter Email" 
                              onChange={(event) => {this.newEmailAddress = event.target.value}}/>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onCloseModal()}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.registerEmail}>Save changes</button>
                  </div>
                </div>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentEmailsDataTable))
