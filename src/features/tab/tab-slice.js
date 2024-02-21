import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: 'lista'
}

export const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers:{
        changeTab: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {changeTab} = tabSlice.actions
export const tabReducer = tabSlice.reducer;