import React, { Component } from 'react'
import ApplyDataTableProperties from '../../../assets/scripts/datatable/index.js'
import * as $ from 'jquery'
import 'datatables.net'
import * as API from '../../../services/getAllDiplomas'
import * as DiplomaAPI from '../../../services/diplomaService'
import * as BackendAPI from '../../../services/backendAPI'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Row from './UniversityTableRow'

class EmployerDataTable extends Component {


  state = {      
    allDiplomas :[]
  };

  dataTable = null

  componentWillMount () {
    console.log("componentWillMount")
    let data = { "username" : this.props.userDetail.userName}

    API.allEmployerDiplomas(data).then((res) =>{
      this.setState({
          allDiplomas : res
      })
    })
  }

  componentWillUpdate(){
    if (this.dataTable){
      this.dataTable.destroy();      
    }
  }

  componentDidUpdate(){        
    let t = $('#employerDataTable').DataTable()
    this.dataTable = t
  }

  renderDiplomaInformation = () => {
    if (this.state.allDiplomas && this.state.allDiplomas.length > 0) {    
        return this.state.allDiplomas.map((diploma,index)=>{
            return(                    
              <Row key={index} diploma={diploma} />    
            );
        });
    }     
}

  render () {
  
    return (
      <div>
        <div className='bgc-white bd bdrs-3 p-20 mB-20'>
          <table id='employerDataTable' className='table table-striped table-bordered' width='100%'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Degree</th>
                <th>Graduation Term</th>
                <th>Timestamp</th>
                <th>Download</th>
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

export default withRouter(connect(mapStateToProps)(EmployerDataTable))
