import {
	configureStore,
	ThunkAction,
	Action,
} from "@reduxjs/toolkit";
import uiReducer from "./ui/uiSlice";
import projectReducer from "./admin/projectsSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
	configureStore({
		reducer: {
			uiControl: uiReducer,
			projects: projectReducer,
		},
	});

export type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
