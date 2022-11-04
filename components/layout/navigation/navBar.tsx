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
const paddingNav = 16;
const closedSize = `max(${40 + padding}px, min(${
  80 + padding
}px, calc(3vw + ${padding}px)))`;
const closedSizeNav = `max(${40 + paddingNav}px, min(${
  80 + paddingNav
}px, calc(3vw + ${paddingNav}px)))`;

//// I don't want the buttons to trail in when nav animates
//TODO Nav too big in mobile
//// Touch mouse up doesn't work

const NavBar = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [navItems, setNavItems] = useState(initialNavItems);
  const [freeItems, setFreeItems] = useState<NavItem[]>([]);
  const [navOpen, setNavOpen] = useState(true);
  const [navWrapperSize, setNavWrapperSize] = useState({ width: 0, height: 0 });
  const [flip, setFlip] = useState(true);
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

  //Resizes the draggable nav container when the nav changes
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
      <motion.div
        drag
        dragConstraints={navBoundary}
        dragTransition={{ power: 0.02 }}
        className={classes.dragContainer}
        style={{
          width: !navOpen ? closedSize : navWrapperSize.width,
          height: !navOpen ? closedSize : navWrapperSize.height,
          float: "right",
        }}
      >
        <motion.div
          className={classes.navWrapper}
          key='nav1'
          ref={nav1Ref}
          style={{
            originX: 0.95,
            originY: 0.5,
            opacity: flip ? 1 : 0,
            pointerEvents: flip ? "auto" : "none",
          }}
          initial={{ rotate: !initialLoad ? -90 : 0 }}
          animate={{ rotate: flip ? 0 : -90 }}
          transition={{
            duration: 0.3,
            ease: "easeIn",
          }}
        >
          <BorderWrapper borderRadius='80px' borderSize='2px'>
            <motion.nav
              className={clsx(classes.nav)}
              id={classes.nav1}
              style={{
                originX: 1,
                overflow: navOpen ? "visible" : "hidden",
                width: navOpen ? "fit-content" : closedSizeNav,
              }}
            >
              <Reorder.Group axis='x' onReorder={setNavItems} values={navItems}>
                {navItems.map((btnData) => (
                  <NavBtn
                    key={btnData.id}
                    btnData={btnData}
                    navState={navState}
                    reorder={true}
                  />
                ))}
              </Reorder.Group>
              <button onClick={() => setFlip((prev) => !prev)}>Flip</button>
              <button
                onClick={() => {
                  console.log(navWrapperSize);
                  setNavOpen(!navOpen);
                }}
              >
                {navOpen ? "Close" : "Open"}
              </button>
            </motion.nav>
          </BorderWrapper>
        </motion.div>
        <motion.div
          className={classes.navWrapper}
          key='nav2'
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
          <BorderWrapper borderRadius='80px' borderSize='2px'>
            <motion.nav
              className={clsx(classes.nav)}
              id={classes.nav2}
              style={{
                height: navOpen ? "fit-content" : closedSizeNav,
                overflow: navOpen ? "visible" : "hidden",
              }}
            >
              <button
                onClick={() => {
                  console.log(navWrapperSize);
                  setNavOpen(!navOpen);
                }}
              >
                {navOpen ? "Close" : "Open"}
              </button>
              <button onClick={() => setFlip((prev) => !prev)}>Flip</button>

              <Reorder.Group
                axis='y'
                onReorder={(items) => setNavItems(items.reverse())}
                values={navItems}
              >
                {[...navItems].reverse().map((btnData) => {
                  return (
                    <NavBtn
                      key={btnData.id}
                      btnData={btnData}
                      navState={navState}
                      reorder={true}
                    />
                  );
                })}
              </Reorder.Group>
            </motion.nav>
          </BorderWrapper>
        </motion.div>
      </motion.div>
      {freeItems.map((btnData) => (
        <NavBtn key={btnData.id} btnData={btnData} navState={navState} />
      ))}
    </div>
  );
};

export default NavBar;
