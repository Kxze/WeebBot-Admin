import { combineReducers } from 'redux';
import { auth } from "./user";
import { sidebar } from "./sidebar";

export const rootReducer = combineReducers({
    auth,
    sidebar,
});