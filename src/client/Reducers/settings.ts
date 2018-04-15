const initialState = {
    channels: []
};

export const settings = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_CHANNELS':
            return { channels: action.channels };
        default:
            return state;
    }
};