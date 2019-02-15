import { connect } from 'react-redux';
import PublicRoute from 'Components/PublicRoute/PublicRoute';

const mapStateToProps = (state) => {
    return {
        isSessionUser: !!state.sessionUser.userData.token,
    };
};

export default connect(
    mapStateToProps,
)(PublicRoute);
