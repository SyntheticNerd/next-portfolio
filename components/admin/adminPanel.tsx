import React from "react";
import classes from "./adminPanel.module.scss";
import { useAppDispatch, useAppSelector } from "../../features/store";
import { toggleAdminOverlap, windowSizeState } from "../../features/ui/uiSlice";
import AdminProjects from "./projects/adminProjects";
import GoldBtnSmall from "../props/goldBtn-small";

const AdminPanel = () => {
	const dispatch = useAppDispatch();

	return (
		<div className={classes.adminPanel}>
			<div className={classes.optionContainer}>
				<div className={classes.buttonContainer}>
					<GoldBtnSmall onClick={() => dispatch(toggleAdminOverlap(null))}>
						overlap
					</GoldBtnSmall>
					<GoldBtnSmall onClick={() => dispatch(toggleAdminOverlap(null))}>
						logout
					</GoldBtnSmall>
				</div>
				<AdminProjects />
			</div>
		</div>
	);
};

export default AdminPanel;
