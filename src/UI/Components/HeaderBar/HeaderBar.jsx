import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Styles from './HeaderBar.scss';
import SessionUser from '../../../Globals/SessionUser';

export default class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: SessionUser.name,
            isLogged: SessionUser.isLogged,
        };

        this.onClick = this.onClick.bind(this);
        this.userChanged = this.userChanged.bind(this);
    }

    componentWillMount() {
        SessionUser.on('change', this.userChanged);
    }

    componentWillUnmount() {
        SessionUser.off('change', this.userChanged);
    }

    onClick() {
        SessionUser.logout();
    }

    userChanged(event, user) {
        this.setState({
            name: user.name,
            isLogged: user.isLogged,
        });
    }

    render() {
        const { isLogged, name } = this.state;
        return isLogged ? (
            <div className={Styles.Container}>
                <span>{name}</span>
                <span> | </span>
                <button type="button" onClick={this.onClick}>Logout</button>
            </div>
        ) : (
            <Route>
                <Redirect to="/" />
            </Route>
        );
    }
}
