import { connect } from 'react-redux';
import HeaderBar from 'Components/HeaderBar/HeaderBar';
import { showSideBar, hideSideBar } from 'Actions/SideBar';

const mapStateToProps = (state) => {
    return {
        isSessionUser: !!state.sessionUser.userData.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSideBarVisibility: visible => dispatch(visible ? showSideBar() : hideSideBar()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HeaderBar);
