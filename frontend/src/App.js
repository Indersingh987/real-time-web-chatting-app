import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Welcome from './Welcome'
import Main from './Main'

function App() {
  return (
    <Router >
      <div className="app">
        <Switch >
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>

        <Switch >
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>

        <Switch >
          <Route path='/main'>
            <Main />
          </Route>
        </Switch>

        <Switch >
          <Route path='/' exact>
            <Welcome />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
