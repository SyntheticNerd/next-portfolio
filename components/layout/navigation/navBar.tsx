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
const animationDuration = 1;
//TODO I don't want the buttons to trail in when nav animates
//TODO Nav too big in mobile
//// Touch mouse up doesn't work

const NavBar = () => {
  const [initialLoad, setInitialLoad] = useState(true);
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
    animating,
  };

  useEffect(() => {
    setInitialLoad(false);
    if (initialLoad) {
      let rect = nav1Ref.current!.getBoundingClientRect();
      console.log("one", rect);
      setNavWrapperSize({ width: rect.width, height: rect.height });
    }
  }, [initialLoad]);

  useEffect(() => {
    if (flip) {
      let rect = nav1Ref.current!.getBoundingClientRect();
      console.log("one", rect);
      setNavWrapperSize({ width: rect.width, height: rect.height });
    } else {
      let rect = nav2Ref.current!.getBoundingClientRect();
      console.log("one", rect);
      setNavWrapperSize({ width: rect.width, height: rect.height });
    }
  }, [navItems]);

  useEffect(() => {
    if (flip && !initialLoad) {
      let rect = nav1Ref.current!.getBoundingClientRect();
      console.log("one", rect);
      setNavWrapperSize({ width: rect.height, height: rect.width });
    } else if (!initialLoad) {
      let rect = nav2Ref.current!.getBoundingClientRect();
      console.log("two", rect);
      setNavWrapperSize({ width: rect.height, height: rect.width });
    }
    clearTimeout(to);
    setAnimating(true);
    const timeOut = setTimeout(() => {
      setAnimating(false);
    }, animationDuration);
    setTo(timeOut);
    return clearTimeout(to);
  }, [flip, nav1Ref, nav2Ref]);

  return (
    <div className={classes.navBoundary} ref={navBoundary}>
      <motion.div
        drag
        dragConstraints={navBoundary}
        dragTransition={{ power: 0.02 }}
        style={{
          width: !navOpen ? closedSize : navWrapperSize.width,
          height: !navOpen ? closedSize : navWrapperSize.height,
          // margin: "32px 32px 0px 0px",
          // display: "flex",
          // justifyContent: "flex-end",
          // alignItems: "flex-end",
          float: "right",
        }}
        // initial={{ transform: "translate(-32px, 32px)" }}
      >
        {flip ? (
          <motion.div
            className={classes.navWrapper}
            key='nav1'
            ref={nav1Ref}
            style={{ originX: 0.96, originY: 0.5 }}
            initial={{ rotate: !initialLoad ? -90 : 0 }}
            animate={{ rotate: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeIn",
            }}
          >
            <BorderWrapper borderRadius='80px' borderSize='2px'>
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
                      // style={{ opacity: animating ? 0 : 1 }}
                    >
                      {(!animating || initialLoad) &&
                        navItems.map((btnData) => (
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
            style={{ width: "fit-content", originY: 0.04, originX: 0.5 }}
            initial={{ rotate: 90 }}
            animate={{ rotate: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeIn",
            }}
          >
            <BorderWrapper borderRadius='80px' borderSize='2px'>
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
                      {(!animating || initialLoad) &&
                        navItems.map((btnData) => (
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
