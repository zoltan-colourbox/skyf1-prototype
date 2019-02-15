import { connect } from 'react-redux';
import Login from 'Pages/Login/Login';
import { doLogin, setLoginError } from 'Actions/SessionUser';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        isFetching: state.sessionUser.isFetching,
        isError: state.sessionUser.isError,
        isSessionUser: !!state.sessionUser.userData.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (username, password) => dispatch(doLogin(username, password)),
        onChange: () => dispatch(setLoginError(false)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
