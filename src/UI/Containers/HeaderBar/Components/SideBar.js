import { connect } from 'react-redux';
import SideBar from 'Components/HeaderBar/Components/SideBar/SideBar';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        folders: state.Folders.folders,
    };
};

export default connect(mapStateToProps)(SideBar);
