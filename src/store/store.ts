import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {reducers} from "./reducer";

export const store = configureStore({
    middleware: [...getDefaultMiddleware()],
    devTools: __DEV__,
    reducer: reducers
})

export type StoreState = typeof reducers
