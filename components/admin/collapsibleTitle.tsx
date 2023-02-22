import React from "react";
import Chevron from "../props/icons/chevron";
import formClasses from "../../styles/forms.module.scss";

interface Props {
	onClick: any;
	open: boolean;
	children: React.ReactNode;
	id: string;
}

const CollapsibleTitle = ({ onClick, open, children, id }: Props) => {
	return (
		<div className={formClasses.collapsibleTitle}>
			<label htmlFor={id}>{children}</label>
			<button
				onClick={onClick}
				type="button"
				id={id}
				style={{
					transform: open ? "rotate(180deg)" : "rotate(0deg)",
				}}
			>
				<Chevron />
			</button>
		</div>
	);
};

export default CollapsibleTitle;
