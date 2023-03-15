import React, { useEffect, useRef, useState } from "react";
import classes from "./ticker.module.scss";
import {
	motion,
	useScroll,
	useSpring,
	useTransform,
	useMotionValue,
	useVelocity,
	useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface Props {
	children: React.ReactNode;
	baseVelocity: number;
}

export default function Ticker({ children, baseVelocity = 100 }: Props) {
	const [hover, setHover] = useState(false);
	const baseX = useMotionValue(0);
	const tickerRef = useRef<HTMLDivElement>(null);
	const [tickerWidth, setTickerWidth] = useState(9841);
	const { scrollY } = useScroll();
	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, {
		damping: 50,
		stiffness: 400,
	});
	const velocityFactor = useTransform(smoothVelocity, [5, 30], [12, 30], {
		clamp: false,
	});

	/**
	 * This is a magic wrapping for the length of the text - you
	 * have to replace for wrapping that works for you or dynamically
	 * calculate
	 */

	useEffect(() => {
		if (tickerRef.current) {
			setTickerWidth(tickerRef.current.clientWidth);
		}
	}, [tickerRef]);

	//TODO need to fix this so it resets properly.
	const x = useTransform(baseX, (v) => {
		return `${wrap(0, tickerWidth * -1, v)}px`;
	});

	const directionFactor = useRef<number>(1);

	useAnimationFrame((t, delta) => {
		let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

		/**
		 * This is what changes the direction of the scroll once we
		 * switch scrolling directions.
		 */
		if (velocityFactor.get() < 0) {
			directionFactor.current = -1;
		} else if (velocityFactor.get() > 0) {
			directionFactor.current = 1;
		}

		moveBy += directionFactor.current * moveBy * velocityFactor.get();
		if (!hover) {
			baseX.set(baseX.get() + moveBy);
		}
	});

	/**
	 * The number of times to repeat the child text should be dynamically calculated
	 * based on the size of the text and viewport. Likewise, the x motion value is
	 * currently wrapped between -20 and -45% - this 25% is derived from the fact
	 * we have four children (100% / 4). This would also want deriving from the
	 * dynamically generated number of children.
	 */
	return (
		<div className={classes.ticker}>
			<motion.div
				className={classes.innerTicker}
				style={{ x }}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				ref={tickerRef}
			>
				{children}
				{children}
			</motion.div>
		</div>
	);
}
