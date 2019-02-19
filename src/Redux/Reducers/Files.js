import {
    SELECT_FILE,
    REQUEST_FILES,
    RECEIVE_FILES,
} from 'Actions/Files';

function files(state = {
    selectedFile: null,
    folderId: null,
    isFetching: false,
    didInvalidate: false,
    files: [],
    lastUpdated: null,
}, action) {
    switch (action.type) {
    case SELECT_FILE:
        return Object.assign({}, state, {
            selectedFile: action.fileId,
        });
    case REQUEST_FILES:
        return Object.assign({}, state, {
            isFetching: true,
            didInvalidate: false,
            folderId: action.folderId,
        });
    case RECEIVE_FILES:
        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            files: action.files,
            lastUpdated: action.receivedAt,
        });
    default:
        return state;
    }
}

export default files;
