import React from 'react';
import {
    Route, Redirect,
} from 'react-router-dom';
import SessionUser from 'Globals/SessionUser';

export default class LogoutRedirect extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            doLogout: false,
        };

        this.userLogout = this.userLogout.bind(this);
        this.userLogin = this.userLogin.bind(this);
    }

    componentWillMount() {
        SessionUser.on('logout', this.userLogout);
        SessionUser.on('login', this.userLogin);
    }

    componentWillUnmount() {
        SessionUser.off('logout', this.userLogout);
        SessionUser.off('login', this.userLogin);
    }

    userLogout() {
        this.setState({
            doLogout: true,
        });
    }

    userLogin() {
        this.setState({
            doLogout: false,
        });
    }

    render() {
        const { doLogout } = this.state;
        return (
            doLogout ? (
                <Route>
                    <Redirect to={{
                        pathname: '/',
                    }}
                    />
                </Route>
            ) : null
        );
    }
}
