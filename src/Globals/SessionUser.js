import EventTrigger from 'event-trigger';
import API from './API';

let userData = {
    token: '',
    type: 1,
    ownerIdentifier: 0,
    validUntil: 0,
    name: '',
    email: '',
    profileImageUrl: '',
};

class SessionUser {
    constructor() {
        this.events = new EventTrigger();

        try {
            const data = JSON.parse(localStorage.getItem('SessionUser.userData'));
            if (data) {
                this.setUserData(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /** Get */

    get name() {
        return userData.name;
    }

    get id() {
        return userData.ownerIdentifier;
    }

    get profileImageUrl() {
        return userData.profileImageUrl;
    }

    get token() {
        return userData.token;
    }

    get is() {
        return this.id > 0;
    }

    /** Authentication */

    logout() {
        this.clearUserData();
        this.events.trigger('logout', this);
        this.events.trigger('change', this);
    }

    login(username, password) {
        if (this.is) {
            this.logout(false);
        }

        return new Promise((resolve, reject) => {
            API.userpasshmac(username, password)
                .then((response) => {
                    this.setUserData(Object.assign(response, {
                        name: username,
                        email: username,
                    }));
                    this.events.trigger('login', this);

                    this.updateProfileImageUrl()
                        .then(() => {
                            resolve(response);
                        })
                        .catch((responseImage) => {
                            console.error(responseImage);
                            resolve(response);
                        });
                })
                .catch((response) => {
                    reject(response);
                });
        });
    }

    getUserData() {
        return userData;
    }

    setUserData(data) {
        userData = data;
        localStorage.setItem('SessionUser.userData', JSON.stringify(userData));
        this.events.trigger('change', this);
    }

    clearUserData() {
        userData = {
            token: '',
            type: 1,
            ownerIdentifier: 0,
            validUntil: 0,
            name: '',
            email: '',
        };
        localStorage.setItem('SessionUser.userData', JSON.stringify(userData));
    }

    /** Set */

    /** Event */

    on(...args) {
        this.events.on(...args);
    }

    off(...args) {
        this.events.off(...args);
    }

    /* Profile / Account */

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

    /** Folders */

    getFolders() {
        return API.folder();
    }
}

if (typeof window.globalSessionUser === 'undefined') {
    window.globalSessionUser = new SessionUser();
}

/*
window.globalSessionUser.on('change', (event, user) => {
    console.log(user);
});

window.globalSessionUser.checkUserCredential('e1d23c94654bac61b898a74d45e46f73d20a181e').then(response => {
    window.globalSessionUser.getFolders().then(response => {
        console.log(response);
    });
});
*/

export default window.globalSessionUser;

/*
if (SessionUser.profileImageUrl) {
    const image = new Image();
    image.onerror = () => {
        SessionUser.updateProfileImageUrl();
    };
    image.src = SessionUser.profileImageUrl;
}
*/


/*
SessionUser.getFolders()
.then(folders => this.setState({ folders }))
.catch((response) => {
    console.error(response);
});
*/
