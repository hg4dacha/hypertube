import { configureStore, createSlice } from "@reduxjs/toolkit";


// get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        create: (state, action) => {
            state.user = action.payload;
        },
        update: (state, action) => {
            state.user = action.payload;
        },
        reset: (state) => {
            state.user = null;
        }
    }
})


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    }
})