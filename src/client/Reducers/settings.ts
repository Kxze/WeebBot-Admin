const initialState = {
    channels: [],
    ships: []
};

export const settings = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_CHANNELS':
            return { ...state, channels: action.channels };
        case 'SET_SHIPS':
            return { ...state, ships: action.ships };
        default:
            return state;
    }
};