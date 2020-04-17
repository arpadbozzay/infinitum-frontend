const initialState = {
    notificationMsg: "",
    showNotification: false
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_NOTIF_MSG":
            state = {
                ...state,
                notificationMsg: action.payload
            };
            break;
        case "SHOW_NOTIF":
            state = {
                ...state,
                showNotification: action.payload
            };
            break;
    }
    return state;
}

export default rootReducer;