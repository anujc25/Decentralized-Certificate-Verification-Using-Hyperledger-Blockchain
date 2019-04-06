import React, { Component } from 'react'
import * as API from '../../../services/getAllDiplomas';
class DiplomaList extends Component {

    state = { 
        data : { "username" : "z-test-employer-1"},
        allDiplomas :[]
    };

    componentDidMount(){
       
        if (this.props.role == "UNIVERSITY") {
            API.allUniversityDiplomas(this.state.data).then((res) =>{
                this.setState({
                    allDiplomas : res
                })
            })
        }

        else if (this.props.role == "STUDENT") {
            API.allStudentDiplomas(this.state.data).then((res) =>{
                this.setState({
                    allDiplomas : res
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
                        <tr>
                            <td>{diploma.degree}</td>
                            <td>{diploma.department}</td>
                            <td>{diploma.emailId}</td>
                            <td>{diploma.name}</td>
                            <td>{diploma.term}</td>
                            <td>{diploma.ipfsLink}</td>
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
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderDiplomaInformation()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default DiplomaList
