const initialState = {
    activeItem: "home"
};

export const sidebar = (state = initialState, action: any) => {
    switch (action.type) {
        case "CHANGE_SIDEBAR_ITEM":
            return { ...state, activeItem: action.item };
        default:
            return state;
    }
};