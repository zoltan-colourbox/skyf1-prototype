import React from 'react';
import Styles from './HeaderBar.scss';
import SessionUser from '../../../Globals/SessionUser';

export default class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: SessionUser.name,
            isSessionUser: SessionUser.is,
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

    userChanged() {
        this.setState({
            name: SessionUser.name,
            isSessionUser: SessionUser.is,
        });
    }

    render() {
        const { isSessionUser, name } = this.state;
        return (
            <div className={Styles.Container}>
                {
                    isSessionUser ? (
                        <React.Fragment>
                            <span>{name}</span>
                            <span> | </span>
                            <button type="button" onClick={this.onClick}>Logout</button>
                        </React.Fragment>
                    ) : null
                }
            </div>
        );
    }
}
