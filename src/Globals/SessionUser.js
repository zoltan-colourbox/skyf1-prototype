
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

export const setStoredUserData = userData => localStorage.setItem('SessionUser.userData', JSON.stringify(userData));

export const setStoredUserDataProfileImageUrl = (url) => {
    const userData = getStoredUserData();
    userData.profileImageUrl = url;
    setStoredUserData(userData);
};
