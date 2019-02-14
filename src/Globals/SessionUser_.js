
export const getEmptyUserData = () => ({
    token: '',
    type: 1,
    ownerIdentifier: 0,
    validUntil: 0,
    name: '',
    email: '',
    profileImageUrl: '',
});

export const getStoredUserData = () => JSON.parse(localStorage.getItem('SessionUser.userData')) || getEmptyUserData();

export const clearStoredUserData = () => localStorage.setItem('SessionUser.userData', JSON.stringify(getEmptyUserData()));

export default {
    getStoredUserData,
    getEmptyUserData,
    clearStoredUserData,
};
