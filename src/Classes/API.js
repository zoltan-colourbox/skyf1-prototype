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
        return this.fetchJson('/authenticate/userpasshmac', {
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
        return this.fetchJson('/folder');
    }

    files(folderIds) {
        return this.fetchJson(`/search?folder_ids=${folderIds.join('+')}&return_values=filename+thumbnail_url_ssl+media_id+unique_media_id+media_type+width+height+file_disksize+created`);
    }

    profileImage(id, size = 'small') {
        return this.fetchJson(`/user/${id}/profileimage/${size}`);
    }

    mediaImage(id, size = 'preview') {
        return this.fetch(`/media/${id}/download/${size}`);
    }

    /**
     * Fetch data from API endpoint
     * Endpoint: /authenticate/userpasshmac
     * @param {*} path string
     * @param {*} options object
     * @returns promise
     */
    fetchJson(path, options) {
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
            });
    }
}
