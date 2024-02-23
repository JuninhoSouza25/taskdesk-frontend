import { configureStore } from "@reduxjs/toolkit";
import { modeReducer } from "./features/mode/mode-slice";
import { tabReducer } from "./features/tab/tab-slice";
import { userSessionReducer } from "./features/user-session/user-session";

export const store = configureStore({
    reducer: {
        mode: modeReducer,
        tab: tabReducer,
        userSession:userSessionReducer
    }
})