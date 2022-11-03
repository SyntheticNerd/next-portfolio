import React from "react";
import { useState, useEffect, useRef } from "react";
import { Reorder, useMotionValue, motion } from "framer-motion";
import BorderWrapper from "../borderWrapper";
import classes from "./navigation.module.css";
import NavBtn from "./navBtn";
import clsx from "clsx";

const initialNavItems = [
  { id: "home", title: "Home" },
  { id: "about-me", title: "About Me" },
  { id: "portfolio", title: "Portfolio" },
  { id: "contact", title: "Contact" },
  { id: "clock", title: "Clock" },
  { id: "github", title: "Github" },
  { id: "linkedin", title: "LinkedIn" },
  { id: "behance", title: "Behance" },
];

interface NavItem {
  id: string;
  title: string;
  x?: number;
  y?: number;
}

const padding = 20;
const closedSize = `max(${40 + padding}px, min(${
  80 + padding
}px, calc(3vw + ${padding}px)))`;
const animationDuration = 100;
//TODO I don't want the buttons to trail in when nav animates
//TODO Nav too big in mobile
//TODO Touch mouse up doesn't work

const NavBar = () => {
  const [navItems, setNavItems] = useState(initialNavItems);
  const [freeItems, setFreeItems] = useState<NavItem[]>([]);
  const [navOpen, setNavOpen] = useState(true);
  const [navWrapperSize, setNavWrapperSize] = useState({ width: 0, height: 0 });
  const [flip, setFlip] = useState(true);
  const [animating, setAnimating] = useState(true);
  const [to, setTo] = useState<NodeJS.Timeout>();
  const nav1Ref = useRef<HTMLDivElement>(null);
  const nav2Ref = useRef<HTMLDivElement>(null);
  const navBoundary = useRef(null);

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
    if (flip) {
      let rect = nav1Ref.current!.getBoundingClientRect();
      console.log("one", rect);
      setNavWrapperSize({ width: rect.height, height: rect.width });
    } else {
      let rect = nav2Ref.current!.getBoundingClientRect();
      console.log("two", rect);
      setNavWrapperSize({ width: rect.height, height: rect.width });
    }
  }, [flip, nav1Ref, nav2Ref]);

  useEffect(() => {
    clearTimeout(to);
    setAnimating(true);
    const timeOut = setTimeout(() => {
      setAnimating(false);
    }, animationDuration);
    setTo(timeOut);
    return clearTimeout(to);
  }, [flip]);

  return (
    <div className={classes.navBoundary} ref={navBoundary}>
      <motion.div
        drag
        dragConstraints={navBoundary}
        dragTransition={{ power: 0.02 }}
        style={{
          width: !navOpen ? closedSize : navWrapperSize.width,
          height: !navOpen ? closedSize : navWrapperSize.height,
          display: "relative",
          margin: "32px 32px 0px auto",
        }}
      >
        {flip ? (
          <motion.div
            className={classes.navWrapper}
            key='nav1'
            ref={nav1Ref}
            style={{ originX: 1 }}
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
          >
            <BorderWrapper borderRadius='32px' borderSize='2px'>
              <nav
                className={clsx(
                  classes.nav,
                  flip ? classes.horizNav : classes.horizNav //LOok here
                )}
                id={classes.nav1}
              >
                {navOpen && (
                  <>
                    <Reorder.Group
                      axis='x'
                      onReorder={setNavItems}
                      values={navItems}
                      style={{ opacity: animating ? 0 : 1 }}
                    >
                      {navItems.map((btnData) => (
                        <NavBtn
                          key={btnData.id}
                          btnData={btnData}
                          navState={navState}
                          reorder={true}
                        />
                      ))}
                    </Reorder.Group>
                    <button onClick={() => setFlip((prev) => !prev)}>
                      Flip
                    </button>
                  </>
                )}
                <button onClick={() => setNavOpen(!navOpen)}>
                  {navOpen ? "Close" : "Open"}
                </button>
              </nav>
            </BorderWrapper>
          </motion.div>
        ) : (
          <motion.div
            className={classes.navWrapper}
            key='nav2'
            ref={nav2Ref}
            style={{ width: "fit-content", originY: 0 }}
            initial={{ rotate: 90 }}
            animate={{ rotate: 0 }}
          >
            <BorderWrapper borderRadius='32px' borderSize='2px'>
              <nav
                className={clsx(
                  classes.nav,
                  flip ? classes.horizNav : classes.horizNav //Look here
                )}
                id={classes.nav2}
              >
                {navOpen && (
                  <>
                    <Reorder.Group
                      axis='x'
                      onReorder={setNavItems}
                      values={navItems}
                    >
                      {navItems.map((btnData) => (
                        <NavBtn
                          key={btnData.id}
                          btnData={btnData}
                          navState={navState}
                          reorder={true}
                        />
                      ))}
                    </Reorder.Group>
                    <button onClick={() => setFlip((prev) => !prev)}>
                      Flip
                    </button>
                  </>
                )}
                <button onClick={() => setNavOpen(!navOpen)}>
                  {navOpen ? "Close" : "Open"}
                </button>
              </nav>
            </BorderWrapper>
          </motion.div>
        )}
      </motion.div>
      {freeItems.map((btnData) => (
        <NavBtn key={btnData.id} btnData={btnData} navState={navState} />
      ))}
    </div>
  );
};

export default NavBar;
