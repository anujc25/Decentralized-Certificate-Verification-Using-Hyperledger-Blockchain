import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">VeriCert</h1>
        </header>
        <p className="App-intro">
          Upload certificate
        </p>
        <div>
          <Main/>
        </div>
      </div>
    );
  }
}

export default App;
