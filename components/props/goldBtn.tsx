import React from "react";
import buttonClasses from "../../styles/buttons.module.scss";
import BorderWrapper from "./borderWrapper";
interface Props {
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
	style?: { [key: string]: string };
}

const GoldBtn = ({ onClick, children, className, style }: Props) => {
	return (
		<BorderWrapper
			borderRadius="200px"
			borderSize="2px"
			borderClass={buttonClasses.btnShadow2}
			style={style}
			className={className}
		>
			<button className={buttonClasses.largePill} onClick={onClick}>
				{children}
			</button>
		</BorderWrapper>
	);
};

export default GoldBtn;
