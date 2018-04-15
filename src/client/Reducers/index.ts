import { combineReducers } from 'redux';
import { auth } from "./user";
import { sidebar } from "./sidebar";
import { settings } from "./settings";
import { general } from "./general";

export const rootReducer = combineReducers({
    auth,
    sidebar,
    settings,
    general,
});