import {PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import { AuthState } from './types';

const initialState: AuthState = {
    isLoggedIn: false,
    token: '',
    username: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string[]>) => {
            state.isLoggedIn = true;
            state.token = action.payload[0];
            state.username = action.payload[1];
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = '';
            state.username = '';
        },
    },
});

export const { login, logout } = authSlice.actions;

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
});

type RootState = ReturnType<typeof store.getState>;

export const selectAuth = (state: RootState) => state.auth;

export default store;