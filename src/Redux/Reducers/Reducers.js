import { combineReducers } from 'redux';
import sideBar from './SideBar';
import sessionUser from './SessionUser';
import folders from './Folders';

export default combineReducers({
    sideBar,
    sessionUser,
    folders,
});
