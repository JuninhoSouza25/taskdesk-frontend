import { configureStore } from "@reduxjs/toolkit";
import { modeReducer } from "./features/mode/mode-slice";

export const store = configureStore({
    reducer: {
        mode: modeReducer
    }
})