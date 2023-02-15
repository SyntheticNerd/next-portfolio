import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loggedIn: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		login: (state, action) => {
			state.loggedIn = true;
		},
	},
});
