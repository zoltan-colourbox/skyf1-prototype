
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

export default {
    getStoredUserData,
    getEmptyUserData,
    clearStoredUserData,
};

/* Profile / Account
updateProfileImageUrl(size = 'small') {
    return new Promise((resolve, reject) => {
        this.getProfileImageUrl(size)
            .then((responseImage) => {
                this.setUserData(Object.assign(this.getUserData(), {
                    profileImageUrl: responseImage.url,
                }));
                resolve(responseImage);
            })
            .catch((responseImage) => {
                reject(responseImage);
            });
    });
}

getProfileImageUrl(size = 'small') {
    return this.is ? API.profileimage(this.id, size) : new Promise((resolve, reject) => {
        reject(new Error('No user id. Can\'t get profile image url.'));
    });
}

if (SessionUser.profileImageUrl) {
    const image = new Image();
    image.onerror = () => {
        SessionUser.updateProfileImageUrl();
    };
    image.src = SessionUser.profileImageUrl;
}
*/
