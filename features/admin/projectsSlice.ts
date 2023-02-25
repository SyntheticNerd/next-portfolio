import { createSlice } from "@reduxjs/toolkit";
import { APP_HYDRATE, RootState } from "../store";

const initialState = {
	oldProjects: [],
	currentProjects: [],
};

export const projectSlice = createSlice({
	name: "projects",
	initialState: initialState,
	reducers: {
		createProject: (state, action) => {},
		updateAllProjects: (state, action) => {
			state.oldProjects = state.currentProjects;
			state.currentProjects = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(APP_HYDRATE, (state, action) => {
			// this action is called whenever you access a page that has getSSP on it
			return action.payload.projects;
		});
	},
});

export const { updateAllProjects, createProject } = projectSlice.actions;
export const currentProjects = (state: RootState) => state.projects.currentProjects;
export default projectSlice.reducer;
