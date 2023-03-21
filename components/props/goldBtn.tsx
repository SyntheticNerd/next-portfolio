import React from "react";
import buttonClasses from "../../styles/buttons.module.scss";
import BorderWrapper from "./borderWrapper";
interface Props {
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
	borderStyle?: { [key: string]: string };
	buttonStyle?: { [key: string]: string };
}

const GoldBtn = ({ onClick, children, className, borderStyle, buttonStyle }: Props) => {
	return (
		<BorderWrapper
			borderRadius="200px"
			borderSize="2px"
			borderClass={buttonClasses.btnShadow2}
			style={borderStyle}
			className={className}
		>
			<button className={buttonClasses.largePill} onClick={onClick} style={buttonStyle}>
				{children}
			</button>
		</BorderWrapper>
	);
};

export default GoldBtn;
