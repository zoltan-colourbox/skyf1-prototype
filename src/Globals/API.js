class API {
    constructor() {
        this.data = {
            key: '',
            endpoint: 'https://test-api.cbx.xyz',
        };
    }

    get key() {
        return this.data.key;
    }

    get endpoint() {
        return this.data.endpoint;
    }

    fetch(path, options) {
        options = Object.assign({
            cache: 'no-cache',
            redirect: 'follow',
        }, options);
        console.log(this.endpoint + path);
        return fetch(this.endpoint + path, options);
    }
}

if (typeof window.globalAPI === 'undefined') {
    window.globalAPI = new API();
}

export default window.globalAPI;
