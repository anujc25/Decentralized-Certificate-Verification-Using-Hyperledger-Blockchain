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

class UniversityDataTable extends Component {


  state = {      
    allDiplomas :[]
  };

  dataTable = null

  componentWillMount () {
    console.log("componentWillMount")
    let data = { "username" : this.props.userDetail.userName}
    API.allUniversityDiplomas(data).then((res) => {
      console.log(res)
      this.setState({
        allDiplomas: res
      })
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
                    // <tr key={index}>
                    //     <td>{diploma.degree}</td>
                    //     <td>{diploma.department}</td>
                    //     <td>{diploma.emailId}</td>
                    //     <td>{diploma.name}</td>
                    //     <td>{diploma.term}</td>
                    //     <td onClick={this.downloadDiploma}>{diploma.ipfsLink}</td>
                    //     {
                    //         this.props.role == "STUDENT" ? 
                    //         <td>
                    //             <button className="btn btn-primary my-2" onClick={()=>{
                    //                 this.setState({
                    //                     ...this.state,
                    //                     showUploadDiplomaPopuup: !this.state.showUploadDiplomaPopuup,
                    //                     uuid: diploma.diplomaUUID
                    //                 })
                    //             }}
                    //             >Share</button>
                    //         </td> : null
                    //     }   
                    // </tr>           
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

export default withRouter(connect(mapStateToProps)(UniversityDataTable))
