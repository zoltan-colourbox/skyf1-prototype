import hmacsha1 from 'crypto-js/hmac-sha1';
import DateTime from 'Classes/DateTime';

export default class API {
    constructor(apiEndpoint, sessionToken, apiKey, apiSecret) {
        this.apiEndpoint = apiEndpoint;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.sessionToken = sessionToken;
    }

    /**
     * Authentificate a user with username and password
     * Endpoint: /authenticate/userpasshmac
     * @param {*} username string
     * @param {*} password string
     * @returns promise
     */
    userpasshmac(username, password) {
        const ts = (new DateTime()).currentTimestamp();
        const hmac = hmacsha1(`${this.apiKey}:${ts}`, this.apiSecret).toString();
        return this.fetch('/authenticate/userpasshmac', {
            method: 'POST',
            headers: {
                Authorization: `CBX-HMAC Key=${this.apiKey} HMAC=${hmac} TS=${ts}`,
            },
            body: JSON.stringify({
                username,
                password,
                key: this.apiKey,
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
                Authorization: `CBX-SIMPLE-TOKEN Token=${this.sessionToken}`,
            },
        }, options);
        return fetch(this.apiEndpoint + path, optionsAssigned)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response);
                }
                return Promise.reject(response);
            })
            .then(response => response.json());
    }
}
