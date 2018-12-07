class API {
    constructor() {
        this.data = {
            token: '',
            endpoint: 'https://test-api.cbx.xyz',
        };
    }

    get token() {
        return this.data.token;
    }

    get endpoint() {
        return this.data.endpoint;
    }

    isValidToken(token) {
        return /^[a-zA-Z0-9]{40}$/.test(token);
    }

    setToken(token) {
        if (this.isValidToken(token)) {
            this.data.token = token;
            return token;
        }
        return false;
    }

    fetch(path, options) {
        options = Object.assign({
            cache: 'no-cache',
            redirect: 'follow',
            headers: {
                Authorization: 'CBX-SIMPLE-TOKEN Token=' + this.token,
            },
        }, options);
        return fetch(this.endpoint + path, options);
    }
}

if (typeof window.globalAPI === 'undefined') {
    window.globalAPI = new API();
}

export default window.globalAPI;
