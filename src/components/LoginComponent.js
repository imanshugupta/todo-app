import React, { Component } from 'react'
import { Form, Input, Button } from 'reactstrap'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  
  handleInputChange = (event) => {
    let name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    this.props.handleLogin({username: this.state.username, password: this.state.password});
  }

  render() {
    return (
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-md-4 p-5 text-center m-auto bg-info'>
              <h1>Login</h1>

              <Form onSubmit={this.handleLogin} >
                <div className='form-group'>
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <div className='input-group-text'>@</div>
                    </div>
                    <Input type='text' name='username' onChange={this.handleInputChange} value={this.state.username} placeholder='Username' />
                  </div>
                </div>
                <div className='form-group'>
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <div className='input-group-text'>
                        <i className='fa fa-key'></i>
                      </div>
                    </div>
                    <Input type='password' name='password' onChange={this.handleInputChange} value={this.state.password} placeholder='Password' />
                  </div>
                </div>
                <Button type='submit'>Login</Button>
              </Form>
            </div>
          </div>
        </div>
    )
  }
}
