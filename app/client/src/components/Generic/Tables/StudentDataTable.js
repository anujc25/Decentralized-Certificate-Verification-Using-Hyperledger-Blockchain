import React, { Component } from 'react'
import ApplyDataTableProperties from '../../../assets/scripts/datatable/index.js'
import * as $ from 'jquery'
import 'datatables.net'
import * as API from '../../../services/getAllDiplomas'
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
    uuid : ""
  };

  dataTable = null

  componentWillMount () {
    console.log("componentWillMount")
    let payload = { "username" : this.props.userDetail.userName}

    // TODO: remove below hardcoded line
    payload = { "username" : "tejas.panchal@sjsu.edu"}

    // get student emailIds
    BackendAPI.allStudentEmailIds(payload).then((res) =>{
        var studentEmailIds = ""
        var ids = []

        if (res && res.length > 0) {
            res.map((e) => {
                ids.push(e.email)
                studentEmailIds += e.email
                studentEmailIds += ","
            })
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
    let t = $('#dataTable').DataTable()
    console.log("Datatable:", t)
    this.dataTable = t
  }

  applyDataTable(){
    ApplyDataTableProperties()
  }

  renderDiplomaInformation = () => {
    if (this.state.allDiplomas && this.state.allDiplomas.length > 0) {    
        return this.state.allDiplomas.map((diploma,index)=>{
          let array = [
            diploma.name,
            diploma.emailId,
            diploma.department,
            diploma.degree,
            diploma.term,
            diploma.ipfsLink
          ]
            return(                    
                <Row value={array} />        
            );
        });
    }     
}

  render () {
  
    return (
      <div>
        <div className='bgc-white bd bdrs-3 p-20 mB-20'>
          {/* <h4 className='c-grey-900 mB-20'>Issued Student Diploma</h4> */}
          <table id='dataTable' className='table table-striped table-bordered' width='100%'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Degree</th>
                <th>Graduation Term</th>
                <th>IPFS Hash</th>
              </tr>
            </thead>
            <tbody>              
              {this.renderDiplomaInformation()}
            </tbody>
          </table>
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
