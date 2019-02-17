import React from 'react';
import { connect } from 'react-redux';
import Folder from 'Pages/Folder/Folder';
import { selectFolder } from 'Actions/Folders';

class FolderContainer extends React.Component {
    componentDidMount() {
        const { match } = this.props;
        this.selectFolder(match.params.id);
    }

    componentDidUpdate() {
        const { match } = this.props;
        this.selectFolder(match.params.id);
    }

    componentWillUnmount() {
        this.selectFolder(null);
    }

    selectFolder(folderId) {
        this.props.selectFolder(folderId); // eslint-disable-line react/destructuring-assignment
    }

    render() {
        return <Folder {...this.props} />;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectFolder: folderId => dispatch(selectFolder(folderId)),
    };
};

export default connect(null, mapDispatchToProps)(FolderContainer);
