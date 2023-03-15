import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
	loggedIn: false,
	adminOverlap: false,
	windowSize: { height: 0, width: 0 },
};

export const uiSlice = createSlice({
	name: "uiControl",
	initialState: initialState,
	reducers: {
		toggleAdminOverlap: (state, action) => {
			state.adminOverlap = !state.adminOverlap;
		},
		setWindowSize: (state, action) => {
			state.windowSize = action.payload;
		},
	},
});

export const { toggleAdminOverlap, setWindowSize } = uiSlice.actions;
export const adminOverlap = (state: RootState) => state.uiControl.adminOverlap;
export const windowSizeState = (state: RootState) => state.uiControl.windowSize;
export default uiSlice.reducer;
