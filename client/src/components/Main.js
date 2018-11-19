import React, {Component} from 'react';
import crypto from 'crypto';

class Main extends Component{
    state = {
        selectedFile: '',
        hashResult: ''
    }

    constructor() {
        super();
        this.state = {
          selectedFile: '',
          hashResult: ''
        };
    }

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
                var pdfFile = e.target.result; 
                var sha256Hash = crypto.createHash('sha256');
                console.log("FILE NAME : ",selectedFile.name)
                sha256Hash.update(pdfFile);
                
                var generated_hash = sha256Hash.digest('hex');
                console.log( 'Generated Hash for file : ' +generated_hash);
                this.setState({ hashResult: generated_hash }); 
            }.bind(this); 
        }.bind(this))();
        
        reader.readAsDataURL(selectedFile);
    }
    
    
    render(){
        return(
            <div class="container">
                <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="file"
                            name="selectedFile"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success" type="submit">Submit</button>
                    </div>
                    <div className="form-group">
                            SHA-256 hash : 
                    </div>
                    <div className="form-group">
                        {this.state.hashResult}
                    </div>
                </form>
            </div>

        )
    }
}

export default Main;
