const Folders = (state = { active: null, folders: [] }, action) => {
    let nextState;
    switch (action.type) {
    case 'SET_FOLDERS':
        nextState = Object.assign({}, state); // eslint-disable-line no-case-declarations
        nextState.folders = action.folders;
        return nextState;
    case 'SET_ACTIVE':
        nextState = Object.assign({}, state); // eslint-disable-line no-case-declarations
        nextState.active = action.active;
        return nextState;
    default:
        return state;
    }
};

export default Folders;
