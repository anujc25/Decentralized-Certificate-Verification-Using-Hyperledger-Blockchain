import React, { Component } from 'react'
import * as API from '../../../services/getAllDiplomas';
class UniversityAllUploads extends Component {

    state = { 
        data : { "username" : "z-test-gape-3"},
        allDiplomas :[]
    };

    componentDidMount(){
       
        API.allDiplomas(this.state.data).then((res) =>{
            this.setState({
                allDiplomas : res
            })
        })
    }

    renderDiplomaInformation = () => {
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
    
    render () {
        return (
            <div className='container'>
                <div class="my-3 p-3 bg-white rounded shadow-sm">
                    <div class="media text-muted pt-1">
                        All Diploma
                    </div>
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

export default UniversityAllUploads
