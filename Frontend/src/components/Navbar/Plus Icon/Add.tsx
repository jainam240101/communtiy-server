/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import GroupIcon from "@material-ui/icons/Group";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import BugReportIcon from "@material-ui/icons/BugReport";
import { withRouter } from "react-router-dom";

const Add = (props: any) => {
  const addproject = () => {
    console.log("Add Project");
  };
  const addissue = () => {
    console.log("Add Issue");
    // props.history.push("/newissue");
  };

  const actions = [
    { icon: <AccountTreeIcon />, click: addproject, name: "New Project" },
    { icon: <BugReportIcon />, click: addissue, name: "New Issue" },
    { icon: <GroupIcon />, name: "Join This Community" },
  ];
  const useStyles = makeStyles((theme) => ({
    root: {
      transform: "translateZ(0px)",
      flexGrow: 1,
    },
    exampleWrapper: {
      position: "relative",
      // marginTop: theme.spacing(3),
      height: 0,
      zIndex: 100,
    },
    radioGroup: {
      margin: theme.spacing(1, 0),
    },
    speedDial: {
      position: "relative",
      marginTop: "-40%",
      height: "35vh",
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(2),
        right: theme.spacing(3),
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(8),
        right: theme.spacing(3),
        left: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();
  const [direction] = React.useState("down");
  const [open, setOpen] = React.useState(false);
  const [hidden] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel='SpeedDial example'
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          //   size='small'
          onOpen={handleOpen}
          open={open}
          direction={"down"}>
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.click}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
};

export default withRouter(Add);
