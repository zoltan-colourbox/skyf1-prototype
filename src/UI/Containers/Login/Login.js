import React from 'react';
import './Login.scss';
import SessionUser from '../../../Globals/SessionUser';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      token: '',
    };

    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.sendToken = this.sendToken.bind(this);
  }

  handleTokenChange(e) {
    this.setState({ token: e.target.value });
  }

  sendToken({ token }) {
    SessionUser.checkUserCredential(this.state.token);
  }
  
  render() {
    return (
      <div className="logon">
        <h1>Login</h1>
        <input type="text" placeholder="Enter your pw" onChange={this.handleTokenChange} value={this.state.token} />
        <button onClick={()=>this.sendToken(this.state)}>Go</button>
      </div>
    );
  }
}
