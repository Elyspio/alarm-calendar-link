import * as calendar from "./calendar/reducer"
import {combineReducers} from "redux";


const allReducers = {calendar: calendar.reducer};

export type RootState = { calendar: calendar.State };

export const reducers = combineReducers<RootState>(allReducers)
