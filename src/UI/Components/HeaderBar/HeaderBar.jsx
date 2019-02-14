import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MenuIcon from 'Components/HeaderBar/Components/MenuIcon/MenuIcon';
import NotificationIcon from 'Components/HeaderBar/Components/NotificationIcon/NotificationIcon';
import UserIcon from 'Containers/HeaderBar/Components/UserIcon';
import SideBar from 'Containers/HeaderBar/Components/SideBar';
import Styles from './HeaderBar.scss';

export default class HeaderBar extends React.Component {
    constructor(props) {
        super(props);

        this.openSideBar = this.openSideBar.bind(this);
        this.closeSideBar = this.closeSideBar.bind(this);
    }

    openSideBar() {
        const { setSideBarVisibility } = this.props;
        setSideBarVisibility(true);
    }

    closeSideBar() {
        const { setSideBarVisibility } = this.props;
        setSideBarVisibility(false);
    }

    render() {
        const { sideBarVisibile, isSessionUser } = this.props;
        return (
            <div className={Styles.Container}>
                {
                    isSessionUser ? (
                        <div className={Styles.Header}>
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
                        visible={sideBarVisibile}
                        onClose={this.closeSideBar}
                    />, document.body)
                }
            </div>
        );
    }
}

HeaderBar.propTypes = {
    setSideBarVisibility: PropTypes.func,
    sideBarVisibile: PropTypes.bool,
    isSessionUser: PropTypes.bool,
};

HeaderBar.defaultProps = {
    setSideBarVisibility: () => {},
    sideBarVisibile: false,
    isSessionUser: false,
};
