import { createSlice } from "@reduxjs/toolkit"

let savedMode;
if (typeof window !== 'undefined') {
  savedMode = localStorage.getItem("mode");
}

let initialState = {
    value: savedMode ? JSON.parse(savedMode) : true
};

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers:{
        changeMode: (state, action) => {
            state.value = action.payload
            localStorage.setItem("mode", state.value)
        }
    }
})

export const {changeMode} = modeSlice.actions
export const modeReducer = modeSlice.reducer;