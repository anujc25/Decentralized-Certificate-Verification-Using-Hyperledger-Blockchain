import React, { Component } from 'react'
import ApplyDataTableProperties from '../../../assets/scripts/datatable/index.js'
import * as $ from 'jquery'
import 'datatables.net'
import {bindActionCreators} from 'redux'
import {SaveEmailIds} from '../../../actions/actions'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Row from './StudentEmailsTableRow'

class StudentEmailsDataTable extends Component {

  dataTable = null

  componentWillMount () {
    console.log("componentWillMount")
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
    if (this.dataTable){
      this.dataTable.destroy();      
    }    
    console.log("componentDidUpdate")    
    let t = $('#dataTable').DataTable()
    console.log("Datatable:", t)
    this.dataTable = t
  }

  applyDataTable(){
    ApplyDataTableProperties()
  }

  renderEmailInformation = () => {
    if (this.props.userDetail.emailIds && this.props.userDetail.emailIds.length > 0) {    
        return this.props.userDetail.emailIds.map((emailId,index)=>{
          let array = [
            emailId
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
                <th>Email-Ids</th>
              </tr>
            </thead>
            <tbody>              
              {this.renderEmailInformation()}
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentEmailsDataTable))
