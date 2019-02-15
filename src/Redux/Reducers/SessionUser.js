import {
    setStoredUserData,
    getStoredUserData,
    getEmptyUserData,
    clearStoredUserData,
} from 'Globals/SessionUser_';

import {
    LOGOUT_USER,
    RECEIVE_LOGIN,
    REQUEST_LOGIN,
    SET_REQUEST_LOGIN_ERROR,
} from 'Actions/SessionUser';

const sessionUser = (state = {
    isFetching: false,
    isError: false,
    userData: getStoredUserData(),
    lastUpdated: null,
}, action) => {
    switch (action.type) {
    case LOGOUT_USER:
        clearStoredUserData();
        return Object.assign({}, state, {
            userData: getEmptyUserData(),
        });
    case RECEIVE_LOGIN:
        setStoredUserData(action.userData);
        return Object.assign({}, state, {
            isFetching: false,
            userData: Object.assign(getEmptyUserData(), action.userData),
            lastUpdated: action.receivedAt,
        });
    case REQUEST_LOGIN:
        return Object.assign({}, state, {
            isFetching: true,
        });
    case SET_REQUEST_LOGIN_ERROR:
        return Object.assign({}, state, {
            isError: action.isError,
        });
    default:
        return state;
    }
};

export default sessionUser;
