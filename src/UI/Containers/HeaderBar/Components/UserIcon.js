import { connect } from 'react-redux';
import UserIcon from 'Components/HeaderBar/Components/UserIcon/UserIcon';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        name: state.sessionUser.name,
        imageUrl: state.sessionUser.profileImageUrl,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch({
            type: 'LOGOUT',
        }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIcon);