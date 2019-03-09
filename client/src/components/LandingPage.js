import React, {Component} from 'react';
import { Route, Link,Switch,Redirect ,withRouter,BrowserRouter} from 'react-router-dom';
import '../css/cover.css'

class LandingPage extends Component{
    

    render(){
        return(
            // <div classNameName="container">
            //     <div classNameName="row">
            //     <button type="text" className="btn btn-primary" onClick={() => this.props.history.push("/registeruniversity")}>Register</button>
            //     <button type="text" className="btn btn-primary" onClick={() => this.props.history.push("/homepage")}>Login</button>
                    
            //     </div>
               
            // </div>

            <div classNameName="site-wrapper">

            <div classNameName="site-wrapper-inner">
      
              <div className="cover-container">
                <main role="main" className="inner cover">
                  <h1 className="cover-heading">Welcome to the Vericert Application</h1>
                  <p className="lead">Please click on Register if signing in for the first time</p>
                  <p className="lead">
                  <button type="text" className="btn btn-primary" onClick={() => this.props.history.push("/registeruniversity")}>Register</button>
                  
                  <div style={{"width":"5px",
                              "height":"auto",
                          "display":"inline-block"}}/>

                  <button type="text" className="btn btn-primary" onClick={() => this.props.history.push("/homepage")}>Login</button>
                  </p>
                  <p className="lead">
                  
                  </p>
                </main>
      

      
              </div>
      
            </div>
      
          </div>
        );
    }
}

export default withRouter(LandingPage);