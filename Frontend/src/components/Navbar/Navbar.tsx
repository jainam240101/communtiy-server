/** @format */

import React, { useState } from "react";
import classes from "./Navbar.module.css";
import Logo from "../../assets/Logo.svg";
import { NavLink } from "react-router-dom";
import Settings from "./Plus Icon/Menu";
import Add from "./Plus Icon/Add";
import { cache } from "../..";
import { gql } from "@apollo/client";
const Navbar = () => {
  const [login, setlogin] = useState(false);
  const data: any = cache.readQuery({
    query: gql`
      query IsUserLoggedIn {
        isLoggedIn @client
        name @client
      }
    `,
  });
  if (data !== null && login === false) {
    setlogin(true);
  }
  return (
    <div className={classes.Container}>
      <div className={classes.logoDiv}>
        <img src={Logo} />
        <p className={classes.logo}>Logo</p>
      </div>
      <div className={classes.components}>
        <NavLink
          className={classes.links}
          exact
          activeClassName={classes.active}
          to='/'>
          Home
        </NavLink>
        <NavLink
          activeClassName={classes.active}
          to='/projects'
          exact
          className={classes.links}>
          Projects
        </NavLink>
        <NavLink
          activeClassName={classes.active}
          to='/issues'
          exact
          className={classes.links}>
          Issues
        </NavLink>
        {/* <NavLink
            activeClassName={classes.active}
            to='/'
            exact
            className={classes.links}>
            Community
          </NavLink> */}
      </div>
      {login ? (
        <div className={classes.user}>
          <div className={classes.Avatar}>
            <p className={classes.signed}>Signed In As</p>
            <p className={classes.usersName}>{data.name}</p>
          </div>
          <Add />
          <div className={classes.menu}>
            <Settings />
          </div>
        </div>
      ) : (
        <div className={classes.buttons}>
          <div>
            <button className={classes.btn}>Log In</button>
            <button className={classes.btn}>Sign Up</button>
          </div>
          )
        </div>
      )}
    </div>
  );
};

export default Navbar;
