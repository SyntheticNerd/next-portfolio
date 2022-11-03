import React, { useState, useRef } from "react";
import { Reorder, motion } from "framer-motion";
import { checkIntersection } from "../../../utils/domUtil";
import classes from "./navigation.module.css";

interface NavItem {
  id: string;
  title: string;
  x?: number;
  y?: number;
}

interface NavState {
  navItems: NavItem[];
  setNavItems: React.Dispatch<React.SetStateAction<NavItem[]>>;
  freeItems: NavItem[];
  setFreeItems: React.Dispatch<React.SetStateAction<NavItem[]>>;
  nav1Ref: React.MutableRefObject<Element | null>;
  nav2Ref: React.MutableRefObject<Element | null>;
  navBoundary: React.MutableRefObject<null>;
  flip: boolean;
  //   navHovered: boolean;
  animating: boolean;
}

interface Props {
  btnData: NavItem;
  navState: NavState;
  reorder?: boolean;
}

const NavBtn = ({ btnData, navState, reorder }: Props) => {
  const [wasDragged, setWasDragged] = useState(false);
  const btnRef = useRef<HTMLDivElement | null>(null);
  const handleDragStart = () => {
    setWasDragged(true);
    console.log("Start Drag");
  };

  const handleDragEnd = () => {
    console.log("End");
    if (
      wasDragged &&
      (navState.nav1Ref.current || navState.nav2Ref.current) &&
      btnRef.current
    ) {
      if (
        checkIntersection(
          (navState.flip
            ? navState.nav1Ref.current
            : navState.nav2Ref.current)!,
          btnRef.current
        )
      ) {
        const filteredItems = navState.navItems.filter(
          (item) => item.id === btnData.id
        );
        if (filteredItems.length) return;
        navState.setNavItems((prev) => [...prev, btnData]);
        const newArray = navState.freeItems.filter(
          (item) => item.id !== btnData.id
        );
        navState.setFreeItems(newArray);
      } else {
        const filteredItems = navState.freeItems.filter(
          (item) => item.id === btnData.id
        );
        if (filteredItems.length) return;
        let rect = btnRef.current.getBoundingClientRect();
        btnData.x = rect.x;
        btnData.y = rect.y;
        navState.setFreeItems((prev) => [...prev, btnData]);
        const newArray = navState.navItems.filter(
          (item) => item.id !== btnData.id
        );
        navState.setNavItems(newArray);
      }
    }
  };

  const handleClick = () => {
    if (wasDragged) {
      setWasDragged(false);
    } else {
      console.log(btnRef.current);
    }
  };

  if (reorder) {
    return (
      <Reorder.Item
        drag
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        value={btnData}
        id={btnData.id}
        ref={btnRef}
        // dragSnapToOrigin
      >
        <button className={classes.navBtn} onClick={handleClick}>
          {btnData.title}
        </button>
      </Reorder.Item>
    );
  } else {
    return (
      <motion.div
        drag
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        id={btnData.id}
        ref={btnRef}
        dragConstraints={navState.navBoundary}
        dragTransition={{ power: 0.1 }}
        style={{
          width: "fit-content",
          position: "absolute",
          top: btnData.y ? btnData.y : "auto",
          left: btnData.x ? btnData.x : "auto",
        }}
      >
        <button className={classes.navBtn} onClick={handleClick}>
          {btnData.title}
        </button>
      </motion.div>
    );
  }
};

export default NavBtn;
