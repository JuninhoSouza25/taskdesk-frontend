import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: null
}

export const userSlice = createSlice({
    name: 'userSession',
    initialState,
    reducers:{
        getUserSession: (state, action) => {
            state.value = !state.value ? action.payload : state.value
        }
    }
})

export const {getUserSession} = userSlice.actions
export const userSessionReducer = userSlice.reducer;