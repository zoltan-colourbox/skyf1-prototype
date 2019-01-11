import React from 'react';
import Styles from './HeaderBar.scss';
import MenuIcon from './Components/MenuIcon/MenuIcon';
import NotificationIcon from './Components/NotificationIcon/NotificationIcon';
import UserIcon from './Components/UserIcon/UserIcon';
import SessionUser from '../../../Globals/SessionUser';

export default class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSessionUser: SessionUser.is,
        };

        this.userChanged = this.userChanged.bind(this);
    }

    componentWillMount() {
        SessionUser.on('change', this.userChanged);
    }

    componentWillUnmount() {
        SessionUser.off('change', this.userChanged);
    }

    userChanged() {
        this.setState({
            isSessionUser: SessionUser.is,
        });
    }

    render() {
        const { isSessionUser } = this.state;
        return (
            <div className={Styles.Container}>
                {
                    isSessionUser ? (
                        <div className={Styles.Table}>
                            <div className={Styles.Left}>
                                <MenuIcon />
                            </div>
                            <div className={Styles.Center}>
                                <a href="/folder/root" className={Styles.Logo}>
                                    <img src="/skyfish-logo-small.svg" alt="Skyfish" />
                                </a>
                            </div>
                            <div className={Styles.Right}>
                                <NotificationIcon />
                                <UserIcon />
                            </div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}
