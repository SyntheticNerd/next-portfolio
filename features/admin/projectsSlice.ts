import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
	oldProjects: [],
	newProjects: [],
};

export const projectSlice = createSlice({
	name: "projects",
	initialState: initialState,
	reducers: {
		createProject: (state, action) => {},
		updateAllProjects: (state, action) => {
			state.oldProjects = state.newProjects;
			state.newProjects = action.payload;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			//this action is called whenever you access a page that has getSSP on it
			console.log("HYDRATE", action.payload.projects);
			return action.payload.projects;
		},
	},
});

export const { updateAllProjects, createProject } = projectSlice.actions;
export const newProjects = (state: RootState) => state.projects.newProjects;
export default projectSlice.reducer;
