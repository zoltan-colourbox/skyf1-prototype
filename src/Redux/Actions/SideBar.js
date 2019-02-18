export const SET_SIDEBAR_VISIBLE = 'SET_SIDEBAR_VISIBLE';
export function showSideBar() {
    return {
        type: SET_SIDEBAR_VISIBLE,
        visible: true,
    };
}

export function hideSideBar() {
    return {
        type: SET_SIDEBAR_VISIBLE,
        visible: false,
    };
}
