import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
        </Switch>
      </div>
    );
  }
}

export default App;
