import hmacsha1 from 'crypto-js/hmac-sha1';
import DateTime from '../Classes/DateTime';
import Config from './Config';
import SessionUser from './SessionUser';

class API {
    /**
     * Authentificate a user with username and password
     * Endpoint: /authenticate/userpasshmac
     * @param {*} username string
     * @param {*} password string
     * @returns promise
     */
    userpasshmac(username, password) {
        const ts = (new DateTime()).currentTimestamp();
        const hmac = hmacsha1(`${Config.API_KEY}:${ts}`, Config.API_SECRET).toString();
        return this.fetch('/authenticate/userpasshmac', {
            method: 'POST',
            headers: {
                Authorization: `CBX-HMAC Key=${Config.API_KEY} HMAC=${hmac} TS=${ts}`,
            },
            body: JSON.stringify({
                username,
                password,
                key: Config.API_KEY,
                ts,
                hmac,
            }),
        });
    }

    folder() {
        return this.fetch('/folder');
    }

    profileimage(id, size = 'small') {
        return this.fetch(`/user/${id}/profileimage/${size}`);
    }

    /**
     * Fetch data from API endpoint
     * Endpoint: /authenticate/userpasshmac
     * @param {*} path string
     * @param {*} options object
     * @returns promise
     */
    fetch(path, options) {
        const optionsAssigned = Object.assign({
            cache: 'no-cache',
            redirect: 'follow',
            headers: {
                Authorization: `CBX-SIMPLE-TOKEN Token=${SessionUser.token}`,
            },
        }, options);
        return fetch(Config.API_ENDPOINT + path, optionsAssigned)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response);
                }
                return Promise.reject(response);
            })
            .then(response => response.json());
    }
}

if (typeof window.globalAPI === 'undefined') {
    window.globalAPI = new API();
}

export default window.globalAPI;
