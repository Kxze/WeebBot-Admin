const initialState = {
    error: "",
    loading: false,
    warning: undefined,
};

export const general = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_ERROR":
            return { ...state, error: action.message };
        case "CLEAR_ERROR":
            return { ...state, error: "" };
        case "TOGGLE_LOADING":
            return { ...state, loading: !state.loading };
        case "SET_WARNING":
            return { ...state, warning: action.message };
        default:
            return state;
    }
};