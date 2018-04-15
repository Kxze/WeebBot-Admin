const initialState = {
    error: ""
};

export const general = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_ERROR":
            return { error: action.message };
        case "CLEAR_ERROR":
            return { error: "" };
        default:
            return state;
    }
};