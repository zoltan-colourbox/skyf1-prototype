import React from 'react';
import { Route, Redirect } from 'react-router';
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

    handleTokenChange(event) {
        this.setState({ token: event.target.value });
    }

    sendToken(event) {
        event.preventDefault();
        const { token } = this.state;
        SessionUser.checkUserCredential(token)
            .then(value => this.setState({ userLoggedIn: value }));
    }

    render() {
        const { userLoggedIn, token } = this.state;

        return (
            <div className="logon">
                <h1>Login</h1>
                <form onSubmit={this.sendToken}>
                    <input type="text" placeholder="Please enter your password" onChange={this.handleTokenChange} value={token} />
                    <input type="submit" value="Go" />
                </form>
                <Route>
                    {userLoggedIn ? <Redirect to="/folder/root" /> : null }
                </Route>
            </div>
        );
    }
}
