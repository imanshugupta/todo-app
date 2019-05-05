import React, { Component } from 'react'
import Login from './LoginComponent'
import Todo from './TodoComponent';
import { userLogin } from '../redux/actionCreators';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  }
  
  handleLogin = (creds) => this.setState({authenticated: userLogin(creds)})

  handleLogout = () => this.setState({authenticated: false})

  render() {
    if(!this.state.authenticated) {
      return (
        <div>
          <Login handleLogin={this.handleLogin} />
        </div>
      )
    }
    return (
      <div>
        <Todo handleLogout={this.handleLogout} />
      </div>
    )
  }
}
