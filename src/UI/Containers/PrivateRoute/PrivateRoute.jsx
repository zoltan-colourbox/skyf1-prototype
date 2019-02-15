import { connect } from 'react-redux';
import PrivateRoute from 'Components/PrivateRoute/PrivateRoute';

const mapStateToProps = (state) => {
    return {
        isSessionUser: !!state.sessionUser.userData.token,
    };
};

export default connect(
    mapStateToProps,
)(PrivateRoute);
