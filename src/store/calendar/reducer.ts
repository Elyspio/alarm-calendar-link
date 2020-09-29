import {createReducer} from "@reduxjs/toolkit";
import * as actions from "./actions"
import {Calendar, Event} from "expo-calendar";


export type State = typeof initialState;


const initialState = {
    calendars: Array<{
        watch: boolean
        core: Calendar,
        events: Event[]
    }>(),

}

export const reducer = createReducer<State>(initialState, builder => {
    builder.addCase(actions.addCalendar, (state, action) => {
        state.calendars = state.calendars.filter(s => !action.payload.some(x => s.core.id === x.id));
        state.calendars = [...state.calendars, ...action.payload.map(x => ({core: x, watch: false, events: []}))]
    })

    builder.addCase(actions.watchCalendar, (state, {payload: {id, status}}) => {
        let find = state.calendars.find(x => x.core.id === id);
        if (find) {
            find.watch = status;
            if (!status) {
                find.events = [];
            }
        } else {
            throw new Error(`Could not find calendar with id=${id}`)
        }

    })

    builder.addCase(actions.getEvents.fulfilled, (state, action) => {
        console.log("action", action)
        const calendar = state.calendars.find(c => c.core.id === action.meta.arg.id);
        if (calendar) {
            calendar.events = action.payload;
        }
    })


})
