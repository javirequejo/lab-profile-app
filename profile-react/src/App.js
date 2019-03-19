import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/misc/Home';
import Login from './components/Login';
import Register from './components/Register';


class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
        </Switch>
      </div>
    );
  }
}

export default App;
