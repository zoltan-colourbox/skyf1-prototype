import { connect } from 'react-redux';
import FolderTreeLi from 'Components/FolderTree/Components/FolderTreeLi/FolderTreeLi';
import { collapseFolder } from 'Actions/Folders';

const mapStateToProps = (state, ownProps) => {
    return {
        collapsed: state.folders.collapsed.indexOf(ownProps.folder.id) > -1,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCollapse: (folderId, collapsed) => dispatch(collapseFolder(folderId, collapsed)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderTreeLi);
