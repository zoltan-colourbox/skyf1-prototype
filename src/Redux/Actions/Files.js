import { createAPI } from 'Factories/API';

export const SELECT_FILE = 'SELECT_FILE';
export function selectFile(id) {
    const fileId = (id === null ? null : parseInt(id, 10)); // eslint-disable-line no-nested-ternary
    return {
        type: SELECT_FILE,
        fileId,
    };
}

export const REQUEST_FILES = 'REQUEST_FILES';
function requestFiles(id) {
    const folderId = (id === null ? null : parseInt(id, 10)); // eslint-disable-line no-nested-ternary
    return {
        type: REQUEST_FILES,
        folderId,
    };
}

export const RECEIVE_FILES = 'RECEIVE_FILES';
function receiveFiles(files) {
    return {
        type: RECEIVE_FILES,
        files,
        receivedAt: Date.now(),
    };
}

export function fetchFiles(folderId) {
    return (dispatch, getState) => {
        const { sessionUser, files } = getState();
        if (!files.isFetching && parseInt(folderId, 10) !== parseInt(files.folderId, 10)) {
            dispatch(requestFiles(folderId));

            createAPI(sessionUser.userData.token).files([folderId])
                .then(json => dispatch(receiveFiles(json.response.media)))
                .catch(() => dispatch(receiveFiles([])));
        }
    };
}
