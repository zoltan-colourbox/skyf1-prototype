import API from 'Classes/API';
import Config from 'Globals/Config';

export const createAPI = (token) => {
    return new API(Config.API_ENDPOINT, token, Config.API_KEY, Config.API_SECRET);
};

export default createAPI;
