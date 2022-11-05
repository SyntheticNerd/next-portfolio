import React, { useState, useRef } from "react";
import { Reorder, motion } from "framer-motion";
import { checkIntersection } from "../../../utils/domUtil";
import classes from "./navigation.module.css";
import NavBtn from "./navBtn";

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
}

interface Props {
  btnData: NavItem;
  navState: NavState;
  reorder?: boolean;
}

const NavBtnHandler = ({ btnData, navState, reorder }: Props) => {
  const [wasDragged, setWasDragged] = useState(false);
  const btnRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = () => {
    setWasDragged(true);
  };

  const handleDragEnd = () => {
    if (wasDragged) {
      if (
        checkIntersection(
          (navState.flip
            ? navState.nav1Ref.current
            : navState.nav2Ref.current)!,
          btnRef.current!
        )
      ) {
        const filteredItems = navState.navItems.filter(
          (item) => item.id === btnData.id
        );
        //item is already in array
        if (filteredItems.length) return;
        //add to one
        navState.setNavItems((prev) => [...prev, btnData]);
        //remove from the other
        navState.setFreeItems((prev) =>
          prev.filter((item) => item.id !== btnData.id)
        );
      } else {
        const filteredItems = navState.freeItems.filter(
          (item) => item.id === btnData.id
        );
        //item is already in array
        if (filteredItems.length) return;
        //i think this can be optimized
        let rect = btnRef.current!.getBoundingClientRect();
        btnData.x = rect.x;
        btnData.y = rect.y;
        //add to one
        navState.setFreeItems((prev) => [...prev, btnData]);
        //remove from the other
        navState.setNavItems((prev) =>
          prev.filter((item) => item.id !== btnData.id)
        );
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
        dragSnapToOrigin
      >
        <NavBtn btnData={btnData} onClick={handleClick} />
      </Reorder.Item>
    );
  } else {
    return (
      <motion.div
        id={btnData.id}
        ref={btnRef}
        drag
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragConstraints={navState.navBoundary}
        dragTransition={{ power: 0.1 }}
        style={{
          width: "fit-content",
          position: "absolute",
          // borderRadius: "100px",
          top: btnData.y ? btnData.y : "auto",
          left: btnData.x ? btnData.x : "auto",
        }}
      >
        <NavBtn btnData={btnData} onClick={handleClick} />
      </motion.div>
    );
  }
};

export default NavBtnHandler;
