import { createAPI } from 'Factories/API';

import {
    getEmptyUserData,
} from 'Globals/SessionUser';

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
