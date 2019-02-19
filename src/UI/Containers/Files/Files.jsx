import { connect } from 'react-redux';
import Files from 'Components/Files/Files';

const mapStateToProps = (state) => {
    return {
        files: state.files.files,
        isFetching: state.files.isFetching,
        folderId: state.files.folderId,
    };
};

export default connect(mapStateToProps)(Files);
