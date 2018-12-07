import EventTrigger from 'event-trigger';
import API from './API';

class SessionUser {
    constructor() {
        this.events = new EventTrigger();
        this.data = {
            id: 0,
            name: '',
        };
    }

    /** Get */

    get name() {
        return this.data.name;
    }

    get userId() {
        return this.data.id;
    }

    get isLogged() {
        return this.userId > 0;
    }

    /** Set */

    /** Event */

    on(...args) {
        this.events.on.apply(this.events, args);
    }

    off(...args) {
        this.events.off.apply(this.events, args);
    }

    /** Other */

    checkUserCredential(apiToken) {
        return new Promise((resolve, reject) => {
            if (typeof apiToken !== 'string' || !(/^[a-zA-Z0-9]{40}$/.test(apiToken)) ) {
                const error = new Error("Invalid token format")
                error.code = 404;
                reject(error);
            }
            API.fetch('/authenticate/simpletoken/' + apiToken).then(response => response.json()).then(response => {
                if (response.TokenStatus === 'valid') {

                    // doto: remove
                    this.data.id = 100;
                    this.data.name = 'Peter Smith';

                    API.setToken(apiToken);
                    this.events.trigger('change', this);

                    resolve(true);
                } else {
                    const error = new Error("Invalid token status");
                    error.code = 402;
                    reject(error);
                };
            }).catch(() => {
                const error = new Error("API error");
                error.code = 401;
                reject(error);
            });
        });
    }

    getFolders() {
        return new Promise((resolve, reject) => {
            if (this.isLogged) {
                return API.fetch('/folder')
                .then(response => response.json())
                .then(response => {
                    resolve(response);
                }).catch(response => {
                    reject(response);
                });
            }
            const error = new Error("User is not logged");
            error.code = 401;
            reject(error);
        });
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
