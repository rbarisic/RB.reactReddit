import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    debugger;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">RB.reactReddit</h1>
        </header>
        <div className="page-wrapper">
          <h2>Hot Articles</h2>
          <div className="App-intro">
            {this.props.component}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
