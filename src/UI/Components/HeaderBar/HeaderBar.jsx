import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Styles from './HeaderBar.scss';
import MenuIcon from './Components/MenuIcon/MenuIcon';
import NotificationIcon from './Components/NotificationIcon/NotificationIcon';
import UserIcon from './Components/UserIcon/UserIcon';
import SessionUser from '../../../Globals/SessionUser';
import SideBar from './Components/SideBar/SideBar';

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSessionUser: SessionUser.is,
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
        const { setSideBarVisibility } = this.props;
        setSideBarVisibility(true);
    }

    closeSideBar() {
        const { setSideBarVisibility } = this.props;
        setSideBarVisibility(false);
    }

    render() {
        const { isSessionUser } = this.state;
        const { sideBarVisibile } = this.props;
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
};

HeaderBar.defaultProps = {
    setSideBarVisibility: () => {},
    sideBarVisibile: false,
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        sideBarVisibile: state.SideBar.visible,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatching plain actions
        setSideBarVisibility: visible => dispatch({
            type: 'SET_SIDEBAR_VISIBLE',
            visible,
        }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
