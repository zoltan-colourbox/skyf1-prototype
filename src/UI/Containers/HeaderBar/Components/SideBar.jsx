import React from 'react';
import { connect } from 'react-redux';
import SideBar from 'Components/HeaderBar/Components/SideBar/SideBar';
import { fetchFolders } from 'Actions/Folders';

class SideBarContainer extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchFolders(0));
    }

    render() {
        const { folders } = this.props;
        // ... and renders the wrapped component with the fresh data!
        // Notice that we pass through any additional props
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
        // dispatching plain actions
        onReload: () => dispatch(fetchFolders()),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);
