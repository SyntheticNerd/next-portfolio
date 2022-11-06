import HomeIcon from "../../props/icons/home-icon";
import AboutMeIcon from "../../props/icons/about-me-icon";
import PortfolioIcon from "../../props/icons/portfolio-icon";
import ContactIcon from "../../props/icons/contact-icon";
import GithubIcon from "../../props/icons/github-icon";
import LinkedInIcon from "../../props/icons/linkedin-icon";
import BehanceIcon from "../../props/icons/behance-icon";
import React from "react";

const navBtnData = [
  {
    id: "home",
    title: "Home",
    Icon: HomeIcon,
  },
  { id: "about-me", title: "About Me", Icon: AboutMeIcon as React.ElementType },
  {
    id: "portfolio",
    title: "Portfolio",
    Icon: PortfolioIcon as React.ElementType,
  },
  { id: "contact", title: "Contact", Icon: ContactIcon as React.ElementType },
  { id: "clock", title: "Clock" },
  { id: "github", title: "Github", Icon: GithubIcon as React.ElementType },
  {
    id: "linkedin",
    title: "LinkedIn",
    Icon: LinkedInIcon as React.ElementType,
  },
  { id: "behance", title: "Behance", Icon: BehanceIcon as React.ElementType },
];

export default navBtnData;
