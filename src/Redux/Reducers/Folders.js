import {
    SELECT_FOLDER,
    INVALIDATE_FOLDERS,
    REQUEST_FOLDERS,
    RECEIVE_FOLDERS,
} from 'Actions/Folders';

function folders(state = {
    selectedFolder: null,
    isFetching: false,
    didInvalidate: false,
    folders: [],
}, action) {
    switch (action.type) {
    case SELECT_FOLDER:
        return action.folder;
    case INVALIDATE_FOLDERS:
        return Object.assign({}, state, {
            didInvalidate: true,
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
