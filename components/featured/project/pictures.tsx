import Image from "next/image";
import React, { useState } from "react";
import classes from "./project.module.scss";
import { motion } from "framer-motion";

const Pictures = () => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={classes.images}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.div className={classes.desktopImage} >
        <Image
          src='/images/projects/tesla/tesla-desktop.png'
          alt='Tesla Clone Desktop'
          height={372}
          width={660}
        />
      </motion.div>
      <motion.div className={classes.tabletImage} animate={{ transform: hover ? "translateX(-90%) translateY(-5%) rotate(-20deg)": "translateX(0px) translateY(0px) rotate(0deg)"}}>
        <Image
          src='/images/projects/tesla/tesla-tablet.png'
          alt='Tesla Clone Desktop'
          height={360}
          width={260}
        />
      </motion.div>
      <motion.div className={classes.cellphoneImage} animate={{ transform: hover ? "translateX(100%) translateY(-30%) rotate(20deg)" : "translateX(0px) translateY(0px) rotate(0deg)"}}>
        <Image
          src='/images/projects/tesla/tesla-cellphone.png'
          alt='Tesla Clone Desktop'
          height={292}
          width={145}
        />
      </motion.div>
    </div>
  );
};

export default Pictures;
