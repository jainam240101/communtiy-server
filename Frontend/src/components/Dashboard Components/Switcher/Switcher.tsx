/** @format */

import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

interface Props {
  click: (element: string) => void;
}

const Switcher: React.FC<Props> = ({ click }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        orientation='horizontal'
        color='primary'
        aria-label='large outlined primary button group'>
        <Button
          onClick={() => {
            click("Projects");
          }}>
          Projects
        </Button>
        <Button
          onClick={() => {
            click("Issues Raised");
          }}>
          Issues Raised
        </Button>
        <Button
          onClick={() => {
            click("Issues Answered");
          }}>
          Issues Answered
        </Button>
        <Button
          onClick={() => {
            click("Stats");
          }}>
          Stats
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Switcher;
