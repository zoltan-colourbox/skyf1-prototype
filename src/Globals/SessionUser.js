class SessionUser {
    constructor() {
        this.data = {
            id: 0,
            name: 'Peter Smith',
        };
    }

    get name() {
        return this.data.name;
    }

    get userId() {
        return this.data.id;
    }

    get isLogged() {
        return this.userId;
    }

    checkUserCredential(apiToken) {
        return new Promise(function(resolve, reject) {
            if (typeof apiToken !== 'string' || !(/^[a-zA-Z0-9]{40}$/.test(apiToken)) ) {
                const error = new Error("Invalid token format")
                error.code = 404;
                reject(error);
            }
            const error = new Error("Invalid token")
            error.code = 401;
            reject(error);
        });
    }
}

if (typeof window.globalSessionUser === 'undefined') {
    window.globalSessionUser = new SessionUser();
}

export default window.globalSessionUser;
