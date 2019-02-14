import { combineReducers } from 'redux';
import SideBar from './SideBar';
import SessionUser from './SessionUser';
import Folders from './Folders';

export default combineReducers({
    SideBar,
    SessionUser,
    Folders,
});
