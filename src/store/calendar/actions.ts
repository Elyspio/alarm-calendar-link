import {createAction as _createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Calendar, Event} from "expo-calendar";
import {Services} from "../../service";

const createAction = <T>(str: string) => _createAction<T>(`calendar/${str}`);

export const addCalendar = createAction<Calendar[]>("add")
export const watchCalendar = createAction<{ status: boolean, id: Calendar["id"] }>("watch")


export const getEvents = createAsyncThunk<Event[], Pick<Calendar, "id"> & { from: Date, to: Date }>(
    "calendar/getEvents",
    ({id, from, to}
    ) => {
        return Services.calendar.getEvents([id], from, to)
    })


