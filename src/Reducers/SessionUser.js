import { getStoredUserData, getEmptyUserData, clearStoredUserData } from 'Globals/SessionUser_';

const SessionUser = (state = getStoredUserData(), action) => {
    switch (action.type) {
    case 'LOGOUT':
        clearStoredUserData();
        return getEmptyUserData();
    default:
        return state;
    }
};

export default SessionUser;
