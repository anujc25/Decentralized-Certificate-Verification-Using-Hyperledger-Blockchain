import React, { Component } from 'react'
import * as API from '../../../services/getAllDiplomas';
class UniversityAllUploads extends Component {

    state = { 
        data : { "username" : ""},
        allDiplomas :[
            {
                "degree": "MSSE",
                "department": "CE",
                "diplomaUUID": "92a90680-4c56-11e9-961b-6b84c4e69628",
                "emailId": "2222",
                "ipfsLink": "QmTDrucC7rozZxTbzc2K4GAY48ZRbaZktfSPHgCBv7XQvC",
                "issuer": "eDUwOTo6Q049ei10ZXN0LWdhcGUtMyxPVT1jbGllbnQrT1U9b3JnMTo6Q049ZmFicmljLWNhLXNlcnZlcixPVT1GYWJyaWMsTz1IeXBlcmxlZGdlcixTVD1Ob3J0aCBDYXJvbGluYSxDPVVT",
                "name": "1111",
                "term": "Spring 2019",
                "timestamp": "2019-03-22 03:57:12.563065796 +0000 UTC"
              },
              {
                "degree": "MSSE",
                "department": "CE",
                "diplomaUUID": "9e4c00b0-4c4b-11e9-ab5f-cf0095e41e93",
                "emailId": "bbb@gmail.com",
                "ipfsLink": "QmSQ8UNccvQPYDmZDMYK1JDcyPC9WTas2jiferS4BpdgbK",
                "issuer": "eDUwOTo6Q049ei10ZXN0LWdhcGUtMyxPVT1jbGllbnQrT1U9b3JnMTo6Q049ZmFicmljLWNhLXNlcnZlcixPVT1GYWJyaWMsTz1IeXBlcmxlZGdlcixTVD1Ob3J0aCBDYXJvbGluYSxDPVVT",
                "name": "aaa",
                "term": "spring 2019",
                "timestamp": "2019-03-22 02:38:47.607718269 +0000 UTC"
              }]
    };

    componentDidMount(){
       
        // API.allDiplomas(this.state.data).then((res) =>{
        //     this.setState({
        //         allDiplomas : res
        //     })

        // })
    }

    renderDiplomaInformation = () => {
        return this.state.allDiplomas.map((diploma,index)=>{
            return(
                
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
                            <tr>
                            <td>{diploma.degree}</td>
                            <td>{diploma.department}</td>
                            <td>{diploma.emailId}</td>
                            <td>{diploma.name}</td>
                            <td>{diploma.term}</td>
                            <td>{diploma.ipfsLink}</td>
                            </tr>   
                            </tbody>
                            </table>
                     </div>
        
                </div>
            );
        });
        
    }
  render () {
    return (
      <div className='container'>
        {this.renderDiplomaInformation()}
      </div>
    )
  }
}

export default UniversityAllUploads
