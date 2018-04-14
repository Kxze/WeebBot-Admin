const initialState = {
    user: {}
};

export const auth = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            return { user: action.user };
        default:
            return state;
    }
};