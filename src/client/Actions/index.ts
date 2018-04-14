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

export const login = (): any  => {
    return async (dispatch: Dispatch<State>) => {
        try {
            const data = await fetch("/api/me", {
                credentials: "include"
            });
            if (data.status === 200) {
                const user = await data.json();
                dispatch(setUser(user));
            }
        } catch (err) {
            console.error(err);
        }
    };
};