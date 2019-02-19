import React from 'react';
import { connect } from 'react-redux';
import Folder from 'Pages/Folder/Folder';
import { selectFolder } from 'Actions/Folders';
import { fetchFiles, selectFile } from 'Actions/Files';
import { showSideBar, hideSideBar } from 'Actions/SideBar';

class FolderContainer extends React.Component {
    componentDidMount() {
        const { match } = this.props;
        this.selectFolder(match.params.id);
        this.selectFile(match.params.id);
    }

    componentDidUpdate() {
        const { match } = this.props;
        this.selectFolder(match.params.id);
        this.selectFile(match.params.media_id);
    }

    componentWillUnmount() {
        this.selectFolder(null);
        this.selectFile(null);
    }

    selectFolder(folderId) {
        this.props.selectFolder(folderId); // eslint-disable-line react/destructuring-assignment
        this.props.fetchFiles(folderId); // eslint-disable-line react/destructuring-assignment
    }

    selectFile(mediaId) {
        this.props.selectFile(mediaId); // eslint-disable-line react/destructuring-assignment
    }

    render() {
        return <Folder {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    return {
        sideBarVisibile: state.sideBar.visible,
        selectedFolder: state.folders.selectedFolder,
        folders: state.folders.folders,
        selectedFile: state.files.selectedFile,
        APIToken: state.sessionUser.userData.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectFolder: folderId => dispatch(selectFolder(folderId)),
        selectFile: mediaId => dispatch(selectFile(mediaId)),
        fetchFiles: folderId => dispatch(fetchFiles(folderId)),
        setSideBarVisibility: visible => dispatch(visible ? showSideBar() : hideSideBar()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderContainer);
