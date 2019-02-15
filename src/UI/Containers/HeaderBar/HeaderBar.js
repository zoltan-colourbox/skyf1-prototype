import { connect } from 'react-redux';
import HeaderBar from 'Components/HeaderBar/HeaderBar';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        sideBarVisibile: state.sideBar.visible,
        isSessionUser: !!state.sessionUser.token,
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HeaderBar);