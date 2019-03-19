import React, {Component} from 'react';
import * as API from '../../services/certificateUploadService';

class HomePageUniversity extends Component{
   state = {
        selectedFile: '',
        issuer:'',
        term:'',
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

        reader.onload = (function() { 
            return function(e) { 
                
                var formData  = new FormData(); 
                formData.append("issuer",this.state.issuer)
                formData.append("selectedFile",this.state.selectedFile)
                formData.append("term",this.state.term)
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
            <div className="container">
                <div className="row">
                <div className="col-sm">
                </div>
                <div className="col-sm">
                <h1> Home Page for University</h1>

                <div className="form-group">
                <form encType="multipart/form-data" onSubmit={this.onSubmit}>

                <label for="issuer">Student Name</label>
                <input type="text" className="form-control" id="studentName"  placeholder="Enter Student Name"
                            onChange={(event) => {
                            this.setState({
                                    ...this.state,
                                    studentName: event.target.value
                                });
                            }}
                            >
                    </input>

                    <label for="issuer">Student Email</label>
                    <input type="text" className="form-control" id="studentEmail"  placeholder="Enter Student Email"
                               onChange={(event) => {
                                this.setState({
                                        ...this.state,
                                        studentEmail: event.target.value
                                    });
                                }}
                                >
                        </input>

                    <label for="issuer">Issuer</label>
                    <input type="text" className="form-control" id="issuer"  placeholder="Enter Issuer Name"
                               onChange={(event) => {
                                this.setState({
                                        ...this.state,
                                        issuer: event.target.value
                                    });
                                }}
                                >
                        </input>

                    <label for="term">Term</label>
                    <input type="text" className="form-control" id="term" placeholder="Enter Graduation Term"
                               onChange={(event) => {
                                this.setState({
                                        ...this.state,
                                        term: event.target.value
                                    });
                                }}
                                >
                        </input>

                    <label for="degree">Degree</label>
                    <input type="text" className="form-control" id="degree" placeholder="Enter Degree Name"
                               onChange={(event) => {
                                this.setState({
                                        ...this.state,
                                        degree: event.target.value
                                    });
                                }}
                                >
                        </input>

                    <label for="department">Department </label>
                    <input type="text" className="form-control" id="department" aria-describedby="emailHelp" placeholder="Enter Department Name"
                               onChange={(event) => {
                                this.setState({
                                        ...this.state,
                                        department: event.target.value
                                    });
                                }}
                                >
                        </input>
                        
                        <label for="fileupload">fileupload</label>
                        <input className="form-control" type="file" name="selectedFile" onChange={this.onChange} />
                        <div style={{ 'width': '5px',
                                      'height': 'auto',
                                      'display': 'inline-block' }} />
                        <div>
                            <button className='btn btn-primary' type="submit">Submit</button>
                        </div>

                </form>
                <label for="message">{this.state.message}</label>
                </div>

                </div>
                <div class="col-sm">
                </div>
                    
                </div>
            </div>
        );
    }
}

export default HomePageUniversity;