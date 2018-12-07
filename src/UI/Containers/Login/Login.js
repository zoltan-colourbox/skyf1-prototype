import React from 'react';
import { Redirect } from 'react-router';
import SessionUser from '../../../Globals/SessionUser';
import './Login.scss';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      token: '',
      userLoggedIn: false,
    };

    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.sendToken = this.sendToken.bind(this);
  }

  handleTokenChange(e) {
    this.setState({ token: e.target.value });
  }

  sendToken(e) {
    e.preventDefault();
    SessionUser.checkUserCredential(this.state.token)
      .then((value) => this.setState({ userLoggedIn: value }));
  }
  
  render() {
    return (
      <div className="logon">
        <h1>Login</h1>
        <form onSubmit={this.sendToken} >
        <input type="text" placeholder="Please enter your password" onChange={this.handleTokenChange} value={this.state.token} />
        <input type="submit" value="Go" />
        </form>
        { this.state.userLoggedIn &&
          <Redirect to="/folder/root" />
        }
      </div>
    );
  }
}
