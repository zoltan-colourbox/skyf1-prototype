const path = require('path');
const paths = require('./paths');

module.exports = {
    Globals: path.resolve(paths.appSrc, 'Globals/'),
    Classes: path.resolve(paths.appSrc, 'Classes/'),
    PWA: path.resolve(paths.appSrc, 'PWA/'),
    Reducers: path.resolve(paths.appSrc, 'Reducers/'),
    App: path.resolve(paths.appSrc, 'UI/App/'),
    Components: path.resolve(paths.appSrc, 'UI/Components/'),
    Containers: path.resolve(paths.appSrc, 'UI/Containers/'),
    Pages: path.resolve(paths.appSrc, 'UI/Pages/'),
};
