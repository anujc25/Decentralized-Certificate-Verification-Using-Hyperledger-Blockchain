import React, { Component } from 'react'
import { save } from 'save-file'

import * as API from '../../../services/getAllDiplomas';
import * as DiplomaAPI from '../../../services/diplomaService';
import * as BackendAPI from '../../../services/backendAPI';
import {connect} from 'react-redux';
import ShareDiplomaPopup from '../../shareDiplomaPopup'

class DiplomaList extends Component {

    state = { 
        data : { "username" : this.props.userDetail.userName},
        emailIds : "",
        showUploadDiplomaPopuup : false,
        uuid : "",
        allDiplomas :[]
    };

    togglePopup() {
        this.setState({
            showUploadDiplomaPopuup: !this.state.showUploadDiplomaPopuup
        });
    }

    downloadDiploma = (event) => {
        console.log(event.currentTarget.innerText)
        var ipfsHash = event.currentTarget.innerText
        
        DiplomaAPI.downloadStudentDiploma(ipfsHash)
        .then((res) => {
          console.log(res);
            if (!res.error && res.result) {
             save(res.result.data, "diploma.pdf")
            } else {
              console.log("Fail to download diploma.")
            }
        }).catch((res) => {
            console.log(res)
            console.log("Fail to download diploma.")
        });
    }

    componentDidMount(){
       
        if (this.props.role == "UNIVERSITY") {
            API.allUniversityDiplomas(this.state.data).then((res) =>{
                this.setState({
                    allDiplomas : res
                })
            })
        }

        else if (this.props.role == "STUDENT") {

            BackendAPI.allStudentEmailIds(this.state.data).then((res) =>{
                var studentEmailIds = ""

                if (res && res.length > 0) {
                    res.map((e) => {
                        studentEmailIds += e.email
                        studentEmailIds += ","
                    })
                }

                this.setState({
                    ...this.state,
                    emailIds : studentEmailIds
                }, () => {
                var payload = {
                    username: this.state.data.username,
                    emailIds: this.state.emailIds
                }
                API.allStudentDiplomas(payload).then((res) =>{
                    this.setState({
                        allDiplomas : res
                    })
                })
            })
            })
        }
        
        else if (this.props.role == "EMPLOYER") {
            API.allEmployerDiplomas(this.state.data).then((res) =>{
                this.setState({
                    allDiplomas : res
                })
            })
        }
    }

    renderDiplomaInformation = () => {
        if (this.state.allDiplomas && this.state.allDiplomas.length > 0) {
            return this.state.allDiplomas.map((diploma,index)=>{
                return(
                        <tr key={index}>
                            <td>{diploma.degree}</td>
                            <td>{diploma.department}</td>
                            <td>{diploma.emailId}</td>
                            <td>{diploma.name}</td>
                            <td>{diploma.term}</td>
                            <td onClick={this.downloadDiploma}>{diploma.ipfsLink}</td>
                            {
                                this.props.role == "STUDENT" ? 
                                <td>
                                    <button className="btn btn-primary my-2" onClick={()=>{
                                        this.setState({
                                            ...this.state,
                                            showUploadDiplomaPopuup: !this.state.showUploadDiplomaPopuup,
                                            uuid: diploma.diplomaUUID
                                        })
                                    }}
                                    >Share</button>
                                </td> : null
                            }   
                        </tr>           
                );
            });
        }     
    }
    
    render () {
        return (
            <div className='container'>
                <div class="my-3 p-3 bg-white rounded shadow-sm">
                    <div class="media text-muted pt-3">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>Degree</th>
                                    <th>department</th>
                                    <th>emailId</th>
                                    <th>name</th>
                                    <th>term</th>
                                    <th>ipfsLink</th>
                                    {
                                        this.props.role == "STUDENT" ? <th>Share</th> : null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderDiplomaInformation()}
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.state.showUploadDiplomaPopuup ? 
                    <ShareDiplomaPopup closeUploadPopup={this.togglePopup.bind(this)} uuid = {this.state.uuid}/>
                    : null
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userDetail: state.userDetail
    }
}

export default connect(mapStateToProps)(DiplomaList)
