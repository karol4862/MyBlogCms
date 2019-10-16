import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminPage from './AdminPage';
import LandingPage from './LandingPage';
import './styles/App.css';
import './styles/responsive.css';


export class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header> <h1> My Front-end <span className="yellow">  Blog </span> </h1></header>
        
        <Route path='/admin' component={AdminPage}/>
        <Route path='/' exact component={LandingPage}/>
      </div>
      </Router>
    );
  }
}

export default App;

