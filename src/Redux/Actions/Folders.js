import { createAPI } from 'Factories/API';

export const SELECT_FOLDER = 'SELECT_FOLDER';

export const REQUEST_FOLDERS = 'REQUEST_FOLDERS';
function requestFolders() {
    return {
        type: REQUEST_FOLDERS,
    };
}

export const RECEIVE_FOLDERS = 'RECEIVE_FOLDERS';
function receiveFolders(folders) {
    return {
        type: RECEIVE_FOLDERS,
        folders,
        receivedAt: Date.now(),
    };
}

export const INVALIDATE_FOLDERS = 'INVALIDATE_FOLDERS';
export function invalidateFolders() {
    return {
        type: INVALIDATE_FOLDERS,
    };
}

export function fetchFolders(folder) {
    return (dispatch, getState) => {
        const { sessionUser } = getState();

        dispatch(requestFolders(folder));

        createAPI(sessionUser.userData.token).folder()
            .then(json => dispatch(receiveFolders(json)));
    };
}
