import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class UniversityRegister extends Component{
    
    state = {
        UniversityName: '',
        UniversityEmail: '',
        UniversityContact: '',
        UniversityAddress: ''
    }

    render(){
        return(
            <div className="container" >
                <div className="row">
                <div className="col-sm">
                </div>
                <div className="col-sm">
                <div className="row">
                </div>
                <div className="row">
                <form>
                    <div className="form-group">

                    <label for="universityname">University Name</label>
                        <input type="text" className="form-control" id="universityname" aria-describedby="emailHelp" placeholder="Enter University Name"
                               onChange={(event) => {
                                this.setState({
                                        ...this.state,
                                        UniversityName: event.target.value
                                    });
                                }}
                                >
                        </input>
                    </div>

                    <div className="form-group">
                    <label for="universityemail">Email</label>
                    <input type="text" className="form-control" id="universityemail" aria-describedby="emailHelp" placeholder="Enter University Email"
                        onChange={(event) => {
                            this.setState({
                                    ...this.state,
                                    UniversityEmail: event.target.value
                                });
                            }}
                            >
                    </input>
                    </div>

                    <div className="form-group">
                    <label for="universitycontact">Contact Number</label>
                    <input type="text" className="form-control" id="universitycontactnumber" aria-describedby="emailHelp" placeholder="Enter Contact"
                         onChange={(event) => {
                            this.setState({
                                    ...this.state,
                                    UniversityContact: event.target.value
                                });
                            }}
                            ></input>
                    </div>

                    <div className="form-group">
                    <label for="universityaddress">Address</label>
                    <input type="text" className="form-control" id="universityaddress" aria-describedby="emailHelp" placeholder="Enter Address"
                        onChange={(event) => {
                            this.setState({
                                    ...this.state,
                                    UniversityAddress: event.target.value
                                });
                            }}
                            ></input>
                    </div>

                    <div class="form-check">
                    </div>
                    <button type="text" class="btn btn-primary" onClick={() => console.log("Api Call to ")}>Submit</button>
                </form>
                </div>
                
                </div>
                <div class="col-sm">
                </div>
                    
                </div>
            </div>
        );
    }
}

export default withRouter(UniversityRegister);