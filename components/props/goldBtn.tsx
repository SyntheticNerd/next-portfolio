import React from "react";
import buttonClasses from "../../styles/buttons.module.scss";
import BorderWrapper from "./borderWrapper";
interface Props {
	onClick?: () => void;
	children: React.ReactNode;
}

const GoldBtn = ({ onClick, children }: Props) => {
	return (
		<BorderWrapper
			borderRadius="200px"
			borderSize="2px"
			borderClass={buttonClasses.btnShadow2}
		>
			<button className={buttonClasses.largePill} onClick={onClick}>
				{children}
			</button>
		</BorderWrapper>
	);
};

export default GoldBtn;
