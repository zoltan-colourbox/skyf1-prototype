import { connect } from 'react-redux';
import UserIcon from 'Components/HeaderBar/Components/UserIcon/UserIcon';
import { doLogout } from 'Actions/SessionUser';

const mapStateToProps = (state) => {
    return {
        name: state.sessionUser.userData.name,
        imageUrl: state.sessionUser.userData.profileImageUrl,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(doLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIcon);
