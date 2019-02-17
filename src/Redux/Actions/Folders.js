import { createAPI } from 'Factories/API';

export const SELECT_FOLDER = 'SELECT_FOLDER';
export function selectFolder(id) {
    const folderId = id === 'root' ? 0 : (id === null ? null : parseInt(id, 0)); // eslint-disable-line no-nested-ternary
    return {
        type: SELECT_FOLDER,
        folderId,
    };
}

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

export function fetchFolders(folder) {
    return (dispatch, getState) => {
        const { sessionUser, folders } = getState();
        if (!folders.isFetching) {
            dispatch(requestFolders(folder));

            createAPI(sessionUser.userData.token).folder()
                .then(json => dispatch(receiveFolders(json)));
        }
    };
}
