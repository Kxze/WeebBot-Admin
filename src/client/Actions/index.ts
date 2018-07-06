import { State } from "../types";
import { connect, Dispatch } from "react-redux";
import { ThunkAction } from 'redux-thunk';

const setUser = (user: any) => {
    return {
        type: "SET_USER",
        user
    };
};

export const changeItem = (item: any) => {
    return {
        type: "CHANGE_SIDEBAR_ITEM",
        item
    };
};

const setChannels = (channels: any) => {
    return {
        type: "SET_CHANNELS",
        channels
    };
};

export const setShips = (ships: number[]) => {
    return {
        type: "SET_SHIPS",
        ships
    };
};

export const error = (message: string) => {
    return {
        type: "SET_ERROR",
        message
    };
};

export const login = (): any => {
    return async (dispatch: Dispatch<State>) => {
        try {
            dispatch(toggleLoading());

            const data = await fetch("/api/me", {
                credentials: "include"
            });

            dispatch(toggleLoading());
            if (data.status === 200) {
                const user = await data.json();
                dispatch(setUser(user));
            }
        } catch (err) {
            console.error(err);
        }
    };
};

export const setServer = (serverId: string) => ({
    type: "SET_SERVER",
    server: serverId,
});

export const getChannels = (serverId: string): any => {
    return async (dispatch: Dispatch<State>) => {
        dispatch(toggleLoading());

        const data = await fetch("/api/guild/" + serverId, {
            credentials: "include"
        });

        dispatch(toggleLoading());

        if (data.status === 200) {
            const jsonData = await data.json();
            dispatch(setChannels(jsonData));
            dispatch(setServer(serverId));
        } else if (data.status === 403) {
            dispatch(setServer(""));
            dispatch(error("Weeb Bot needs to be in your server!"));
        }
    };
};

export const submitShips = (guild: string, channel: string, ships: number[]): any => {
    return async (dispatch: Dispatch<State>) => {
        dispatch(toggleLoading());

        const requestBody = {
            guild,
            channel,
            ships
        };

        const response = await fetch("/api/guild", {
            method: "PUT",
            body: JSON.stringify(requestBody),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status !== 200) {
            dispatch(error("Something went wrong. Run to the hills!"));
            dispatch(toggleLoading());
        }

        dispatch(toggleLoading());
    };
};

export const setStateChannel = (channelId: string) => ({
    type: "SET_CHANNEL",
    channel: channelId,
});

export const toggleLoading = () => ({
    type: "TOGGLE_LOADING"
});
