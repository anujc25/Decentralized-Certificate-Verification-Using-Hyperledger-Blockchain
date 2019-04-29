import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import img1 from '../images/bg1.jpg'

class UniversityRegister extends Component{
    
    state = {
        UniversityName: '',
        UniversityEmail: '',
        UniversityContact: '',
        UniversityAddress: ''
    }

    render(){
        return(
            // <div className="container" >
            //     <div className="row">
            //     <div className="col-sm">
            //     </div>
            //     <div className="col-sm">
            //     <div className="row">
            //     </div>
            //     <div className="row">
            //     <form>
            //         <div className="form-group">

            //         <label for="universityname">University Name</label>
            //             <input type="text" className="form-control" id="universityname" aria-describedby="emailHelp" placeholder="Enter University Name"
            //                    onChange={(event) => {
            //                     this.setState({
            //                             ...this.state,
            //                             UniversityName: event.target.value
            //                         });
            //                     }}
            //                     >
            //             </input>
            //         </div>

            //         <div className="form-group">
            //         <label for="universityemail">Email</label>
            //         <input type="text" className="form-control" id="universityemail" aria-describedby="emailHelp" placeholder="Enter University Email"
            //             onChange={(event) => {
            //                 this.setState({
            //                         ...this.state,
            //                         UniversityEmail: event.target.value
            //                     });
            //                 }}
            //                 >
            //         </input>
            //         </div>

            //         <div className="form-group">
            //         <label for="universitycontact">Contact Number</label>
            //         <input type="text" className="form-control" id="universitycontactnumber" aria-describedby="emailHelp" placeholder="Enter Contact"
            //              onChange={(event) => {
            //                 this.setState({
            //                         ...this.state,
            //                         UniversityContact: event.target.value
            //                     });
            //                 }}
            //                 ></input>
            //         </div>

            //         <div className="form-group">
            //         <label for="universityaddress">Address</label>
            //         <input type="text" className="form-control" id="universityaddress" aria-describedby="emailHelp" placeholder="Enter Address"
            //             onChange={(event) => {
            //                 this.setState({
            //                         ...this.state,
            //                         UniversityAddress: event.target.value
            //                     });
            //                 }}
            //                 ></input>
            //         </div>

            //         <div class="form-check">
            //         </div>
            //         <button type="text" class="btn btn-primary" onClick={() => console.log("Api Call to ")}>Submit</button>
            //     </form>
            //     </div>
                
            //     </div>
            //     <div class="col-sm">
            //     </div>
                    
            //     </div>
            // </div>

            <div className='peers ai-s fxw-nw h-100vh'>
                <div className='d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv' style={{ 'background-image': `url(${img1})` }}>
                </div>

                <div className='col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r' style={{ 'min-width': '320px;' }}>

                    <h2 className='fw-300 c-grey-900 mB-40'>Please Register to use TrustCert Services</h2>
                    <form>
                    <div className="form-group row">
                    
                        <label for="universityname" class="col-sm-3 col-form-label">University Name</label>
                        <div className="col-sm-10">
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

                    </div>

                    <div className="form-group row">

                        <label for="universityemail"  class="col-sm-3 col-form-label">University Email</label>
                        <div className="col-sm-10">
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

                    </div>

                    <div className="form-group row">

                        <label for="universitycontact" class="col-sm-3 col-form-label" >Contact Number</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="universitycontactnumber" aria-describedby="emailHelp" placeholder="Enter Contact"
                                onChange={(event) => {
                                    this.setState({
                                            ...this.state,
                                            UniversityContact: event.target.value
                                        });
                                    }}
                                    >
                            </input>
                        </div>

                    </div>

                    <div className="form-group row">

                        <label for="universityaddress" class="col-sm-2 col-form-label" >Address</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="universityaddress" aria-describedby="emailHelp" placeholder="Enter Address"
                                onChange={(event) => {
                                    this.setState({
                                            ...this.state,
                                            UniversityAddress: event.target.value
                                        });
                                    }}
                                    >
                            </input>
                        </div>

                    </div>

                    <div class="form-check">
                    </div>

                    <button type="text" class="btn btn-primary" onClick={() => console.log("Api Call to :",this.state)}>Submit</button>
                </form>
                </div>
            </div>
        );
    }
}

export default withRouter(UniversityRegister);