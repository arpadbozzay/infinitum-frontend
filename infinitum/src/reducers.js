const initialState = {
    username: "",
    jwtToken: ""
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_USER_NAME":
            state = {
                ...state,
                username: action.payload
            };
            break;
        case "CHANGE_JWT_TOKEN":
            state = {
                ...state,
                jwtToken: action.payload
            };
            break;
    }
    return state;
}

export default rootReducer;