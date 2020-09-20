/** @format */

import React from "react";
import classes from "./About.module.css";
import Home from "../../assets/Home.svg";
import Feature from "../Homepage Components/Feature";
import Project from "../../assets/Project.svg"
import Issue from "../../assets/Issues.svg"
import Community from "../../assets/Community.svg"

const About: React.FC = (props) => {
  return (
    <div>
      <div className={classes.Container}>
        <div>
          <div className={classes.heading}>Lets Build Together</div>
          <div className={classes.tag}>
            Bring the best of yourself through this platform
          </div>
          <button className={classes.joinBtn}>Join Now</button>
          <div className={classes.explore}>
            <button className={classes.exploreBtn}>Explore</button>
          </div>
        </div>
        <div className={classes.image}>
          <img src={Home} />
        </div>
      </div>
      <Feature
        heading={"Projects"}
        information={[
          "1- Create a Project and fill in the details about your Project",
          "2- Create a Community of your own to add your peers",
          "3- Create your own channels in your server to communicate ",
        ]}
        description='How many times we have got a great 
idea and we thought to work upon but couldn’t 
cause of the lack of manpower ?'
        description2='So to target such a problem all you have to do is  3 Simple Steps'
        svg={Project}
      />
      <Feature
        heading={"Issues"}
        information={[
          "1- Create a Project and fill in the details about your Project",
          "2- Create a Community of your own to add your peers",
          "3- Create your own channels in your server to communicate ",
        ]}
        description='How many times we have got a great 
idea and we thought to work upon but couldn’t 
cause of the lack of manpower ?'
        description2='So to target such a problem all you have to do is  3 Simple Steps'
        svg={Issue}
      />
      <Feature
        heading={"Community"}
        information={[
          "1- Create a Project and fill in the details about your Project",
          "2- Create a Community of your own to add your peers",
          "3- Create your own channels in your server to communicate ",
        ]}
        description='How many times we have got a great 
idea and we thought to work upon but couldn’t 
cause of the lack of manpower ?'
        description2='So to target such a problem all you have to do is  3 Simple Steps'
        svg={Community}
      />
     
    </div>
  );
};

export default About;
