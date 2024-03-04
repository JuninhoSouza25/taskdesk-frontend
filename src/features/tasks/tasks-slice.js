import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const url = process.env.URL_API;

let savedTasks;
if (typeof window !== 'undefined') {
    savedTasks = JSON.parse(localStorage.getItem("tasks"))
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${url}/tasks`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const initialState = {
    value: savedTasks,
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
            localStorage.setItem("tasks", JSON.stringify(state.value))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.value = action.payload;
                tasksSlice.caseReducers.uploadTasks(state, action);
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { tasksLoading, tasksError, uploadTasks } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
