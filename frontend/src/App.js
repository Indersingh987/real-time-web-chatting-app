import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom'
import Login from './Login'
import Chat from './Chat'
import RequestList from './RequestList'
import FriendList from './FriendList'
import Header from './Header'

function App() {
  const user = sessionStorage.getItem('user')
  return (
    <Router >
      <div className="app">
        {!user ? (<Login />):(<div className='app__main'>
          <div className='app__container'>
        <Header />
        <Switch >
          <Route path='/chat'>
              <Chat />
          </Route>
        </Switch>
        <Switch >
          <Route path='/requests'>
              <RequestList />
          </Route>
        </Switch>
        <Switch >
          <Route path='/friends'>
              <FriendList />
          </Route>
        </Switch>
        </div>
        </div>)}
      </div>
    </Router>
    
  );
}

export default App;
