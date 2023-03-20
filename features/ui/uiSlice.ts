import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UIType {
	loggedIn: boolean;
	adminOverlap: null | boolean;
	windowSize: { height: number; width: number };
	navOpen: boolean | null;
	navFlip: boolean;
	openResume: boolean;
}

const initialState: UIType = {
	loggedIn: false,
	adminOverlap: null,
	windowSize: { height: 0, width: 0 },
	navOpen: null,
	navFlip: true,
	openResume: false,
};

export const uiSlice = createSlice({
	name: "uiControl",
	initialState: initialState,
	reducers: {
		toggleAdminOverlap: (state, action) => {
			if (state.adminOverlap !== null) {
				state.adminOverlap = !state.adminOverlap;
			} else {
				state.adminOverlap = true;
			}
		},
		setWindowSize: (state, action) => {
			state.windowSize = action.payload;
			if (state.adminOverlap === null) {
				if (action.payload.width <= 1250) {
					state.adminOverlap = true;
				} else {
					state.adminOverlap = false;
				}
			}
			if (state.navOpen === null) {
				if (action.payload.width <= 690) {
					state.navOpen = false;
				} else {
					state.navOpen = true;
				}
			}
			if (action.payload.width <= 690) {
				state.navFlip = false;
			}
		},
		setNav: (state, action) => {
			state.navOpen = action.payload;
		},
		toggleNav: (state, action) => {
			state.navOpen = !state.navOpen;
		},
		toggleNavFlip: (state, action) => {
			if (state.windowSize.width <= 690) {
				state.navFlip = false;
			} else {
				state.navFlip = !state.navFlip;
			}
		},
		setOpenResume: (state, action) => {
			if (action.payload === true) {
				state.navOpen = false;
			}
			state.openResume = action.payload;
		},
	},
});

export const {
	toggleAdminOverlap,
	setWindowSize,
	setNav,
	toggleNav,
	toggleNavFlip,
	setOpenResume,
} = uiSlice.actions;
export const adminOverlap = (state: RootState) => state.uiControl.adminOverlap;
export const windowSizeState = (state: RootState) => state.uiControl.windowSize;
export const navOpenState = (state: RootState) => state.uiControl.navOpen;
export const navFlipState = (state: RootState) => state.uiControl.navFlip;
export const openResumeState = (state: RootState) => state.uiControl.openResume;
export default uiSlice.reducer;
