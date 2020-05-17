import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import Landing from './components/views/LendingPage/LendingPage';
import Login from './components/views/LoginPage/LoginPage';
import Register from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

function App() {
  return (
    <div>
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Landing</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={Auth(Landing, null)} />
          <Route exact path="/login" component={Auth(Login, false)}  />
          <Route exact path="/register" component={Auth(Register, false)} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
