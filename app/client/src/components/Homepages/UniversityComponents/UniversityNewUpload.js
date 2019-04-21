import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import * as API from '../../../services/diplomaService';
// import '../../css/offCanvas.css';
import '../../../css/popup.css';
import {connect} from 'react-redux'

class UniversityNewUpload extends Component{
   state = {
        selectedFile: '',
        // issuer:'',
        term:'',
        termYear:'',
        degree:'',
        department:'',
        studentName:'',
        studentEmail:'',
        message : ''
    };

    onChange = (e) => {
        switch (e.target.name) {
          case 'selectedFile':
            this.setState({ selectedFile: e.target.files[0] });
            break;
          default:
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const selectedFile = this.state.selectedFile;
        var reader = new FileReader();

        console.log("This.state",this.state);
        
        reader.onload = (function() { 
            return function(e) { 
                
                var formData  = new FormData(); 
                formData.append("issuer",this.props.userDetail.userName)
                formData.append("selectedFile",this.state.selectedFile)
                formData.append("term",this.state.term + " "+this.state.termYear)
                formData.append("degree",this.state.degree)
                formData.append("department",this.state.department)
                formData.append("studentName",this.state.studentName)
                formData.append("studentEmail",this.state.studentEmail)

                API.uploadStudentDiploma(formData)
                    .then((res) => {
                        console.log(res)
                        this.setState({
                            message: res.Status,
                        });                        
                    })
                    .catch((res) => {
                        console.log(res)
                        this.setState({
                            message: res.Status,
                        });   
                    });
            }.bind(this); 
        }.bind(this))();
        
        reader.readAsDataURL(selectedFile);
    }

    render(){
        return(
        
            <div class="masonry-item col-md-10">
                <div class="bgc-white p-20 bd">
                    <h6 class="c-grey-900">Upload New Certificate</h6>
                    <div class="mT-30">
                        <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                            <div class="form-row">
                                <div class="form-group col-md-6">

                                    <label>Student Name</label>
                                    <input type="text" className="form-control" id="studentName"  placeholder="Enter Student Name"
                                                onChange={(event) => {
                                                this.setState({
                                                        ...this.state,
                                                        studentName: event.target.value
                                                    });
                                                }}
                                            >
                                    </input>

                                </div>
                                <div class="form-group col-md-6">
                                    <label>Student Email</label>
                                    <input type="text" className="form-control" id="studentEmail"  placeholder="Enter Student Email"
                                                onChange={(event) => {
                                                    this.setState({
                                                            ...this.state,
                                                            studentEmail: event.target.value
                                                        });
                                                    }}>
                                    </input>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-6">

                                    <label>Degree</label>
                                    <input type="text" className="form-control" id="degree" placeholder="Enter Degree Name"
                                        onChange={(event) => {
                                            this.setState({
                                                    ...this.state,
                                                    degree: event.target.value
                                                });
                                            }}
                                    >
                                    </input>

                                </div>
                                <div class="form-group col-md-6">
                                    <label>Department </label>
                                    <input type="text" className="form-control" id="department" aria-describedby="emailHelp" placeholder="Enter Department Name"
                                        onChange={(event) => {
                                            this.setState({
                                                    ...this.state,
                                                    department: event.target.value
                                                });
                                            }}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <label>Term</label>
                                    <select id="term" class="form-control" 
                                                        onChange={(event) => {
                                                                        this.setState({
                                                                                ...this.state,
                                                                                term: event.target.value
                                                                            });
                                                                        }}>
                                        <option selected>Fall</option>
                                        <option>Spring</option>
                                        <option>Summer</option>
                                    </select>
                                    </div>
                                    <div class="form-group col-md-3">    
                                    <label>Year</label>                                        
                                    <select id="termYear" class="form-control"
                                                           onChange={(event) => {
                                                            this.setState({
                                                                    ...this.state,
                                                                    termYear: event.target.value
                                                                });
                                                            }}>
                                        <option selected>2019</option>
                                        <option>2020</option>
                                        <option>2021</option>
                                        <option>2022</option>
                                    </select>
                                </div>

                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>fileupload</label>
                                    <input className="form-control" type="file" name="selectedFile" onChange={this.onChange} />
                                </div>
                            </div>
                            
                            <button className='btn btn-primary' type="submit">Submit</button>
                        </form>
                        <label>{this.state.message}</label>
                    </div>
                </div> 
            </div>              
                 
        );
    }
}

function mapStateToProps(state){
    return {
        userDetail: state.userDetail
    }
}
export default withRouter(connect(mapStateToProps)(UniversityNewUpload))

