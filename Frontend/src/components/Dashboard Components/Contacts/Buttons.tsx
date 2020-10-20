/** @format */

import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailIcon from "@material-ui/icons/Mail";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  githubbutton: {
    marginLeft:theme.spacing(2),
    background: "#333",
    color: "white",
  },
  linkedbutton: {
    margin: theme.spacing(1),
    background: "#0e76a8 ",
    color: "white",
  },
  twitterButton: {
    margin: theme.spacing(1),
    background: "#1DA1F2",
    color: "white",
  },
}));

const Buttons = () => {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant='contained'
        className={classes.githubbutton}
        startIcon={<GitHubIcon />}>
        Github
      </Button>
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
      <Button
        variant='contained'
        className={classes.linkedbutton}
        startIcon={<LinkedInIcon />}>
        Linked In
      </Button>
      <Button
        variant='contained'
        color='primary'
        className={classes.linkedbutton}
        startIcon={<MailIcon />}>
        Mail
      </Button>
      <Button
        variant='contained'
        color='primary'
        className={classes.twitterButton}
        startIcon={<TwitterIcon />}>
        Twitter
      </Button>
    </div>
  );
};
export default Buttons;
