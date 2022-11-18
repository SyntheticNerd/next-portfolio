import React, { useEffect, useState } from "react";
import classes from "./background.module.css";
import { useScroll, motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const Background = () => {
  const { scrollY } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrollProgress(latest);
    });
  }, []);

  return (
    <div className={classes.background}>
      {/* <Image src='/images/bg-main.png' fill alt='' /> */}
      <div className={classes.layer1} />
      <motion.div
        style={{
          y: scrollProgress * -0.02,
        }}
        className={classes.layer2}
      />
      <motion.div
        style={{
          y: scrollProgress * -0.1,
        }}
        className={classes.layer3Top}
      />
      <motion.div
        className={classes.layer3Bottom}
        style={{
          y: scrollProgress * -0.1 + 410,
        }}
      />
    </div>
  );
};

export default Background;
