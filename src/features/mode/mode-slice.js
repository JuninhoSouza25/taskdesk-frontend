import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: true
}

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers:{
        changeMode: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {changeMode} = modeSlice.actions
export const modeReducer = modeSlice.reducer;