import React from 'react';
import { connect } from 'react-redux';
import UserIcon from 'Components/HeaderBar/Components/UserIcon/UserIcon';
import { doLogout, updateProfileImage } from 'Actions/SessionUser';

class UserIconContainer extends React.Component {
    componentDidMount() {
        this.updateProfileImageIfNeeded();
    }

    updateProfileImageIfNeeded() {
        const { dispatch, imageUrl } = this.props;
        const image = new Image();
        image.onerror = () => {
            dispatch(updateProfileImage());
        };
        image.src = imageUrl;
    }

    render() {
        return <UserIcon {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.sessionUser.userData.name,
        imageUrl: state.sessionUser.userData.profileImageUrl,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(doLogout()),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIconContainer);
