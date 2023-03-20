import React, { ReactNode } from "react";
import clsx from "clsx";

interface Props {
	children: ReactNode;
	className?: string;
	borderClass?: string;
	borderSize?: string;
	borderRadius?: string;
	style?: React.CSSProperties;
}

const BorderWrapper = ({
	children,
	className,
	borderClass,
	borderSize,
	borderRadius,
	style,
}: Props) => {
	return (
		<div
			style={{
				padding: borderSize ? borderSize : "4px",
				background: "var(--border-gradient)",
				height: "fit-content",
				width: "fit-content",
				borderRadius: borderRadius ? borderRadius : "0px",
				flexDirection: "inherit",
				...style,
			}}
			className={borderClass}
		>
			<div
				className={clsx(className)}
				style={{
					borderRadius: borderRadius ? borderRadius : "0px",
					height: "fit-content"
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default BorderWrapper;
