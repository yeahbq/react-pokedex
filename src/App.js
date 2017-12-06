import React, { Component } from 'react';
import './App.css';
import Pokemon from './components/Pokemon'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pokemon/>
      </div>
    );
  }
}

export default App;
