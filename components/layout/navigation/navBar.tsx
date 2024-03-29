import React from "react";
import { useState, useEffect, useRef } from "react";
import { Reorder, motion } from "framer-motion";
import BorderWrapper from "../../props/borderWrapper";
import classes from "./navigation.module.css";
import clsx from "clsx";
import NavBtnHandler from "./navBtnHandler";
import MenuBtn from "./menuBtn";
import initialNavItems from "./navBtnData";
import FlipBtn from "./flipBtn";
import { useAppDispatch, useAppSelector } from "../../../features/store";
import {
	navFlipState,
	navOpenState,
	toggleNav,
	toggleNavFlip,
	windowSizeState,
} from "../../../features/ui/uiSlice";

interface NavItem {
	id: string;
	title: string;
	x?: number;
	y?: number;
}

const padding = 16;
const closedSize = `max(${40 + padding}px, min(${
	80 + padding
}px, calc(3vw + ${padding}px)))`;

const paddingNav = 12;
const closedSizeNav = `max(${40 + paddingNav}px, min(${
	80 + paddingNav
}px, calc(3vw + ${paddingNav}px)))`;

//// I don't want the buttons to trail in when nav animates
//TODO Nav too big in mobile
//// Touch mouse up doesn't work
//TODO If screen is resized the navBar boundary doesn't update
//// Track the drag history of the whole nav bar prevent click when dragged
//? Maybe I don't need the NavBtnHandler
//? How can me make this components simpler/smaller

const NavBar = () => {
	const nav1Ref = useRef<HTMLDivElement>(null);
	const nav2Ref = useRef<HTMLDivElement>(null);
	const navBoundary = useRef(null);
	const [navWrapperSize, setNavWrapperSize] = useState({ width: 0, height: 0 });

	const [navItems, setNavItems] = useState(initialNavItems);
	const [freeItems, setFreeItems] = useState<NavItem[]>([]);
	const [wasDragged, setWasDragged] = useState(false);

	const dispatch = useAppDispatch();
	const screenSize = useAppSelector(windowSizeState);
	const navOpen = useAppSelector(navOpenState);
	const flip = useAppSelector(navFlipState);

	const navState = {
		navItems,
		setNavItems,
		freeItems,
		setFreeItems,
		nav1Ref,
		nav2Ref,
		navBoundary,
		flip,
	};

	useEffect(() => {
		if (screenSize.width <= 760) {
		}
	}, []);

	//Resizes the draggable nav container when the nav changes
	//* This should be where we can resize if screen changes too maybe
	useEffect(() => {
		let rect = nav1Ref.current!.getBoundingClientRect();
		if (flip) {
			if (rect.height > rect.width) {
				setNavWrapperSize({ width: rect.height, height: rect.width });
			} else {
				setNavWrapperSize({ width: rect.width, height: rect.height });
			}
		} else {
			if (rect.height < rect.width) {
				setNavWrapperSize({ width: rect.height, height: rect.width });
			} else {
				setNavWrapperSize({ width: rect.width, height: rect.height });
			}
		}
	}, [flip, navItems]);

	return (
		<div className={classes.navBoundary} ref={navBoundary}>
			{/* Outer Div for dragging the whole thing */}
			<motion.div
				drag
				dragConstraints={navBoundary}
				dragTransition={{ power: 0.02 }}
				className={classes.dragContainer}
				onDragStart={() => setWasDragged(true)}
				onClick={() => setWasDragged(false)}
				style={{
					width: !navOpen ? closedSize : navWrapperSize.width,
					height: !navOpen ? closedSize : navWrapperSize.height,
				}}
				//I can migrate this to css... I think
			>
				{/* First and Second Child responsible for flip animation, the nav is rendered inside them */}
				<motion.div
					className={classes.navWrapper}
					ref={nav1Ref}
					style={{
						originX: 0.95,
						originY: 0.5,
						opacity: flip ? 1 : 0,
						pointerEvents: flip ? "auto" : "none",
					}}
					initial={{ rotate: 0 }}
					animate={{ rotate: flip ? 0 : -90 }}
					transition={{
						duration: 0.3,
						ease: "easeIn",
					}}
				>
					<BorderWrapper
						borderRadius="80px"
						borderSize="2px"
						style={{ boxShadow: "var(--nav-bar-shadow)" }}
					>
						<motion.nav
							className={clsx(classes.nav)}
							id={classes.nav1}
							style={{
								overflow: navOpen ? "visible" : "hidden",
								width: navOpen ? "fit-content" : closedSizeNav,
							}}
						>
							<Reorder.Group axis="x" onReorder={setNavItems} values={navItems}>
								{navItems.map((btnData) => (
									<NavBtnHandler
										key={btnData.id}
										btnData={btnData}
										navState={navState}
										reorder={true}
									/>
								))}
							</Reorder.Group>

							<FlipBtn
								onClick={() => {
									!wasDragged && dispatch(toggleNavFlip(null));
								}}
								flip={flip}
							/>

							<MenuBtn
								navOpen={navOpen ? navOpen : false}
								onClick={() => {
									!wasDragged && dispatch(toggleNav(null));
								}}
							/>
						</motion.nav>
					</BorderWrapper>
				</motion.div>
				<motion.div
					className={classes.navWrapper}
					ref={nav2Ref}
					style={{
						originY: 0.05,
						originX: 0.5,
						opacity: flip ? 0 : 1,
						pointerEvents: flip ? "none" : "auto",
					}}
					initial={{ rotate: 90 }}
					animate={{ rotate: flip ? 90 : 0 }}
					transition={{
						duration: 0.3,
						ease: "easeIn",
					}}
				>
					<BorderWrapper
						borderRadius="80px"
						borderSize="2px"
						style={{ boxShadow: "var(--nav-bar-shadow)" }}
					>
						<nav
							className={clsx(classes.nav)}
							id={classes.nav2}
							style={{
								height: navOpen ? "fit-content" : closedSizeNav,
								overflow: navOpen ? "visible" : "hidden",
								maxWidth: `${navWrapperSize.width}px`,
							}}
						>
							<MenuBtn
								navOpen={navOpen ? navOpen : false}
								onClick={() => {
									!wasDragged && dispatch(toggleNav(null));
								}}
							/>
							{screenSize.width >= 690 && (
								<FlipBtn
									onClick={() => {
										!wasDragged && dispatch(toggleNavFlip(null));
									}}
									flip={flip}
								/>
							)}
							<Reorder.Group
								axis="y"
								onReorder={(items) => setNavItems(items.reverse())}
								values={navItems}
								style={{ width: "fit-content" }}
							>
								{[...navItems].reverse().map((btnData) => {
									return (
										<NavBtnHandler
											key={btnData.id}
											btnData={btnData}
											navState={navState}
											reorder={true}
										/>
									);
								})}
							</Reorder.Group>
						</nav>
					</BorderWrapper>
				</motion.div>
			</motion.div>
			{freeItems.map((btnData) => (
				<NavBtnHandler key={btnData.id} btnData={btnData} navState={navState} />
			))}
		</div>
	);
};

export default NavBar;
