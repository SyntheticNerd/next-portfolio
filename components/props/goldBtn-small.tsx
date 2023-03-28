import clsx from "clsx";
import React from "react";
import buttonClasses from "../../styles/buttons.module.scss";
import BorderWrapper from "./borderWrapper";
interface Props {
	onClick?: () => void;
	children: React.ReactNode;
	borderClass?: string;
	buttonClass?: string;
	borderStyle?: { [key: string]: string };
	buttonStyle?: { [key: string]: string };
	type?: "button" | "submit" | "reset" | undefined;
}

const GoldBtnSmall = ({
	onClick,
	children,
	borderClass,
	buttonClass,
	borderStyle,
	buttonStyle,
	type,
}: Props) => {
	return (
		<BorderWrapper
			borderRadius="200px"
			borderSize="2px"
			borderClass={clsx(buttonClasses.btnShadow2, borderClass)}
			style={borderStyle}
			className={buttonClass}
		>
			<button
				type={type ? type : "button"}
				className={buttonClasses.smallPill}
				onClick={onClick}
				style={buttonStyle}
			>
				{children}
			</button>
		</BorderWrapper>
	);
};

export default GoldBtnSmall;
