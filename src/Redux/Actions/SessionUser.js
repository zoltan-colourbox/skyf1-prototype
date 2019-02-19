import { createAPI } from 'Factories/API';

import {
    getEmptyUserData,
} from 'Globals/SessionUser';


export const UPDATE_PROFILE_IMAGE = 'UPDATE_PROFILE_IMAGE';
function setProfileImageUrl(url) {
    return {
        type: UPDATE_PROFILE_IMAGE,
        url,
    };
}

export function updateProfileImage(size = 'small') {
    return (dispatch, getState) => {
        const { sessionUser } = getState();

        createAPI(sessionUser.userData.token).profileImage(sessionUser.userData.ownerIdentifier, size)
            .then((json) => {
                dispatch(setProfileImageUrl(json.url));
            })
            .catch(() => {
                dispatch(setProfileImageUrl(''));
            });
    };
}

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
function requestLogin() {
    return {
        type: REQUEST_LOGIN,
    };
}

export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
function receiveLogin(userData) {
    return {
        type: RECEIVE_LOGIN,
        userData,
        isError: false,
        receivedAt: Date.now(),
    };
}

export const SET_REQUEST_LOGIN_ERROR = 'SET_REQUEST_LOGIN_ERROR';
export function setLoginError(isError = true) {
    return {
        type: SET_REQUEST_LOGIN_ERROR,
        isError,
    };
}

export function doLogin(username, password) {
    return (dispatch) => {
        dispatch(requestLogin());

        createAPI().userpasshmac(username, password)
            .then((json) => {
                const userData = Object.assign({}, json, {
                    name: username,
                    email: username,
                });
                dispatch(receiveLogin(userData));
                dispatch(updateProfileImage());
            }).catch(() => {
                dispatch(receiveLogin(getEmptyUserData()));
                dispatch(setLoginError(true));
            });
    };
}

export const LOGOUT_USER = 'LOGOUT_USER';
export function doLogout() {
    return {
        type: LOGOUT_USER,
    };
}
