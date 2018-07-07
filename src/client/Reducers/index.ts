import { combineReducers } from 'redux';
import { auth } from "./user";
import { sidebar } from "./sidebar";
import { settings } from "./settings";
import { general } from "./general";
import { home } from "./home";

export const rootReducer = combineReducers({
    auth,
    sidebar,
    settings,
    general,
    home
});