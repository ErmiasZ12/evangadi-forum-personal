import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import logofooter from "../../assets/evangadi-logo.png";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_col}>
        <img
          src={logofooter}
          alt="evangadi logo"
          className={classes.logo_img}
        />
        <div className={classes.socials}>
          <a href="#">
            <FacebookOutlinedIcon />
          </a>
          <a href="#">
            <InstagramIcon />
          </a>
          <a href="#">
            <YouTubeIcon />
          </a>
        </div>
      </div>

      <div className={classes.footer_col}>
        <h4>Useful Link</h4>
        <p>How it works</p>
        <p>Terms of Service</p>
        <p>Privacy policy</p>
      </div>

      <div className={classes.footer_col}>
        <h4>Contact Info</h4>
        <p>Evangadi Networks</p>
        <p>support@evangadi.com</p>
        <p>+1-202-386-2702</p>
      </div>
    </footer>
  );
};

export default Footer;
