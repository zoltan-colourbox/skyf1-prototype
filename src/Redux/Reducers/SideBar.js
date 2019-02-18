import { SET_SIDEBAR_VISIBLE } from 'Actions/SideBar';

const sideBar = (state = { visible: false }, action) => {
    switch (action.type) {
    case SET_SIDEBAR_VISIBLE:
        return Object.assign({}, state, {
            visible: action.visible,
        });
    default:
        return state;
    }
};

export default sideBar;
