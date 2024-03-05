import { createSlice } from "@reduxjs/toolkit";

let savedTasks;
if (typeof window !== 'undefined') {
    savedTasks = JSON.parse(localStorage.getItem("tasks")) || null;
}

const initialState = {
    value: savedTasks || null,
    loading: false,
    error: null
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        tasksLoading: state => {
            state.loading = true;
            state.error = null;
        },
        tasksError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        uploadTasks: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            localStorage.setItem("tasks", JSON.stringify(state.value));
        }
    }
});

export const { tasksLoading, tasksError, uploadTasks } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
