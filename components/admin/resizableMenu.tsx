import React, { ReactNode, useEffect, useState } from "react";
import Login from "../login/Login";
import AdminPanel from "./adminPanel";
import classes from "./adminPanel.module.scss";
import { useAppSelector } from "../../features/store";
import clsx from "clsx";
import { adminOverlap, windowSizeState } from "../../features/ui/uiSlice";

type PropsWithChildren<P> = P & { children?: ReactNode };
type Props = {
	session: any;
};

const ResizableMenu = ({ children, session }: PropsWithChildren<Props>) => {
	const [sessionState, setSessionState] = useState(session);
	const overlap = useAppSelector(adminOverlap);

	const [drag, setDrag] = useState({
		active: false,
		x: 0,
	});

	const [dims, setDims] = useState({
		w: 200,
		w2: 1000,
	});

	useEffect(() => {
		if (window) {
			if (session) {
				setDims((prev) => ({ ...prev, w2: window.innerWidth - prev.w }));
			} else {
				setDims((prev) => ({ ...prev, w2: window.innerWidth }));
			}
		}
	}, [session]);

	const boxStyle = {
		width: `${dims.w}px`,
	};
	const containerStyle = {
		width: `${dims.w2}px`,
	};

	const startResize = (e: React.MouseEvent<Element, MouseEvent>) => {
		setDrag({
			active: true,
			x: e.clientX,
		});
	};

	const resizeFrame = (e: React.MouseEvent<Element, MouseEvent>) => {
		const { active, x } = drag;
		if (active) {
			const xDiff = Math.abs(x - e.clientX);
			const newW = x > e.clientX ? dims.w - xDiff : dims.w + xDiff;

			setDrag({ ...drag, x: e.clientX });
			setDims({ w: newW, w2: window.innerWidth - newW });
		}
	};
	const stopResize = (e: React.MouseEvent<Element, MouseEvent>) => {
		setDrag({ ...drag, active: false });
	};

	return (
		<div
			className={classes.container}
			onMouseMove={resizeFrame}
			onMouseUp={stopResize}
		>
			{!sessionState && <Login setSessionState={setSessionState} />}
			{sessionState && (
				<div
					className={clsx(overlap ? classes.boxOverlap : classes.box)}
					style={boxStyle}
				>
					<button className={classes.dragger} onMouseDown={startResize} />
					<AdminPanel />
				</div>
			)}
			<div
				className={clsx(
					!sessionState
						? ""
						: overlap
						? classes.contentContainerOverlap
						: classes.contentContainer
				)}
				style={!sessionState ? {} : !overlap ? containerStyle : {}}
			>
				{children}
			</div>
		</div>
	);
};

export default ResizableMenu;
