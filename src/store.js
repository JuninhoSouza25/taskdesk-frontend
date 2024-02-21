import { configureStore } from "@reduxjs/toolkit";
import { modeReducer } from "./features/mode/mode-slice";
import { tabReducer } from "./features/tab/tab-slice";

export const store = configureStore({
    reducer: {
        mode: modeReducer,
        tab: tabReducer
    }
})