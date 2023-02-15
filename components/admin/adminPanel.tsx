import React from "react";
import classes from "./adminPanel.module.scss";
import { useAppDispatch } from "../../features/store";
import { toggleAdminOverlap } from "../../features/ui/uiSlice";

const AdminPanel = () => {
	const dispatch = useAppDispatch();
	return (
		<div className={classes.adminPanel}>
			<div className={classes.optionContainer}>
				<button onClick={() => dispatch(toggleAdminOverlap(null))}>overlap</button>
				<button onClick={() => dispatch(toggleAdminOverlap(null))}>logout</button>

			</div>
		</div>
	);
};

export default AdminPanel;