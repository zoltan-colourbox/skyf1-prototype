const launchedPWA = () => {
    return !!(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone);
};

export default launchedPWA;
