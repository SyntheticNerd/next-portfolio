import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
	loggedIn: false,
	adminOverlap: false,
};

export const uiSlice = createSlice({
	name: "uiControl",
	initialState: initialState,
	reducers: {
		toggleAdminOverlap: (state, action) => {
			state.adminOverlap = !state.adminOverlap;
		},
	},
});

export const { toggleAdminOverlap } = uiSlice.actions;
export const adminOverlap = (state: RootState) => state.uiControl.adminOverlap;
export default uiSlice.reducer;
