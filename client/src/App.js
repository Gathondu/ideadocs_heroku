import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css'

import IdeasContainer from './components/ideas/idea_container'
import BoardTitle from './components/boards'
import NavBar from './components/base/navbar';
import Login from './components/user/login';

class App extends Component {
  state = {
    transitionIn: false,
    notification: null,
    disabled: false,
  };

  setNotification = (notification) => {
    this.setState(
      { notification, transitionIn: true },
      this.hideNotificationWithDelay
    )
  };

  disableLogin = () => {
    this.setState({ disabled: true });
  }

  hideNotificationWithDelay = () => {
    setTimeout(() => this.setState({ transitionIn: false }), 1000)
  };

  handleLogout = () => {
    axios.delete('/logout')
        .then(res => {
          sessionStorage.setItem('token', '');
          this.setNotification('Logged out');
          window.location = '/';
        })
        .catch(error => console.log(error));
};

  render() {
    const {
      transitionIn,
      notification,
      disabled,
    } = this.state;
    return (
      <div className="App">
        <Router>
          <NavBar
            transition={transitionIn}
            notification={notification}
            disabled={disabled}
            handleLogout={this.handleLogout}
            />
          <Switch>
            <Route exact path="/login" render={(props) =>
              <Login
                disableLogin={this.disableLogin}
                setNotification={this.setNotification}
                {...props} />}
                />
            <Route exact path="/boards" render={(props) => <BoardTitle onChange={this.setNotification} {...props}/>} />
            <Route exact path="/board/:id/ideas" render={(props) => <IdeasContainer onChange={this.setNotification} {...props}/>} />
            <Route exact path="/idea/:id" render={(props) => <Login {...props}/>} />
          </Switch>
        </Router>
      </div>
    );
  }
};

export default App
