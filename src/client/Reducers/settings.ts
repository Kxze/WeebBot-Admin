const initialState = {
    channels: [],
    ships: [],
    server: "",
    channel: "",
};

export const settings = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_CHANNELS':
            return { ...state, channels: action.channels };
        case 'SET_CHANNEL':
            return { ...state, channel: action.channel };
        case 'SET_SHIPS':
            return { ...state, ships: action.ships };
        case 'SET_SERVER':
            return { ...state, server: action.server };
        default:
            return state;
    }
};