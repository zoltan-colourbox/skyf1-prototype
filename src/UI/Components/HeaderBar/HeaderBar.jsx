import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './HeaderBar.scss';
import MenuIcon from './Components/MenuIcon/MenuIcon';
import NotificationIcon from './Components/NotificationIcon/NotificationIcon';
import UserIcon from './Components/UserIcon/UserIcon';
import SessionUser from '../../../Globals/SessionUser';
import SideBar from './Components/SideBar/SideBar';

export default class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSessionUser: SessionUser.is,
            showSideBar: false,
        };

        this.userChanged = this.userChanged.bind(this);
        this.openSideBar = this.openSideBar.bind(this);
        this.closeSideBar = this.closeSideBar.bind(this);
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

    openSideBar() {
        console.log('open');
        this.setState({ showSideBar: true });
    }

    closeSideBar() {
        this.setState({ showSideBar: false });
    }

    render() {
        const { isSessionUser, showSideBar } = this.state;
        return (
            <div className={Styles.Container}>
                {
                    isSessionUser ? (
                        <div className={Styles.Table}>
                            <div className={Styles.Left}>
                                <MenuIcon onClick={this.openSideBar} className={Styles.MenuIcon} />
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
                {
                    ReactDOM.createPortal(<SideBar
                        visible={showSideBar}
                        onClose={this.closeSideBar}
                    />, document.body)
                }
            </div>
        );
    }
}
