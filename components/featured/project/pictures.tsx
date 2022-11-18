import Image from "next/image";
import React from "react";
import classes from "./project.module.scss";
import { motion } from "framer-motion";

const Pictures = () => {
  return (
    <div className={classes.images}>
      <motion.div className={classes.desktopImage}>
        <Image
          src='/images/projects/tesla/tesla-desktop.png'
          alt='Tesla Clone Desktop'
          height={372}
          width={660}
        />
      </motion.div>
      <motion.div className={classes.tabletImage}>
        <Image
          src='/images/projects/tesla/tesla-tablet.png'
          alt='Tesla Clone Desktop'
          height={360}
          width={260}
        />
      </motion.div>
      <motion.div className={classes.cellphoneImage}>
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
