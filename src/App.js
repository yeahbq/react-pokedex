import React, { Component } from 'react';
import './App.css';
import Pokemon from './components/Pokemon'
import Pager from './components/Pager'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pager/>
      </div>
    );
  }
}

export default App;
