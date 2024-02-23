import { createSlice } from "@reduxjs/toolkit"

let savedMode;
if (typeof window !== 'undefined') {
  savedMode = localStorage.getItem("tab");
}

let initialState = {
    value: savedMode ? savedMode : 'dashboard'
};

export const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers:{
        changeTab: (state, action) => {
            state.value = action.payload
            localStorage.setItem("tab", state.value)
        }
    }
})

export const {changeTab} = tabSlice.actions
export const tabReducer = tabSlice.reducer;