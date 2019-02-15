const sideBar = (state = { visible: false }, action) => {
    switch (action.type) {
    case 'SET_SIDEBAR_VISIBLE':
        const nextState = Object.assign({}, state); // eslint-disable-line no-case-declarations
        nextState.visible = action.visible;
        return nextState;
    default:
        return state;
    }
};

export default sideBar;
