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
        } else if (data.status === 403) {
            dispatch(error("Weeb Bot needs to be in your server!"));
        }
    };
};

export const toggleLoading = () => ({
    type: "TOGGLE_LOADING"
});
