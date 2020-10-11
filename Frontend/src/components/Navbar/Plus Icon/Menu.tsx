/** @format */

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import BugReportIcon from "@material-ui/icons/BugReport";
import { withRouter } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: any) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Settings = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const projects = () => {
    console.log("/projects");
  };
  const issues = () => {
    console.log("/issues");
  };
  const dashboard = () => {
    console.log("/dashboard");
  };
  const myaccount = () => {
    console.log("/myaccount");
  };

  return (
    <div>
      <Button
        aria-controls='customized-menu'
        aria-haspopup='true'
        variant='contained'
        color='primary'
        onClick={handleClick}>
        Menu
      </Button>
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <StyledMenuItem>
          <ListItemIcon>
            <AccountTreeIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='All Projects' onClick={projects} />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <BugReportIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='All Issues' onClick={issues} />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DashboardIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Dashboard' onClick={dashboard} />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <AccountBoxIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='My Account' onClick={myaccount} />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <ExitToAppIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default withRouter(Settings);
