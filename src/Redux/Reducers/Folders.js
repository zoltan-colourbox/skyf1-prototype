import {
    SELECT_FOLDER,
    COLLAPSE_FOLDERS,
    REQUEST_FOLDERS,
    RECEIVE_FOLDERS,
} from 'Actions/Folders';

function folders(state = {
    selectedFolder: null,
    isFetching: false,
    didInvalidate: false,
    folders: [],
    collapsed: [],
    lastUpdated: null,
}, action) {
    switch (action.type) {
    case SELECT_FOLDER:
        return Object.assign({}, state, {
            selectedFolder: action.folderId,
        });
    case COLLAPSE_FOLDERS:
        return Object.assign({}, state, {
            collapsed: action.collapsed,
        });
    case REQUEST_FOLDERS:
        return Object.assign({}, state, {
            isFetching: true,
            didInvalidate: false,
        });
    case RECEIVE_FOLDERS:
        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            folders: action.folders,
            lastUpdated: action.receivedAt,
        });
    default:
        return state;
    }
}

export default folders;
