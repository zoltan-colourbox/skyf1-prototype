import React from 'react';
import { connect } from 'react-redux';
import SideBar from 'Components/SideBar/SideBar';
import { fetchFolders } from 'Actions/Folders';

class SideBarContainer extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchFolders(0));
    }

    render() {
        const { folders } = this.props;
        return <SideBar folders={folders} {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    return {
        folders: state.folders.folders,
        folderId: state.folders.selectedFolder,
        isReloading: state.folders.isFetching,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReload: () => dispatch(fetchFolders()),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);
