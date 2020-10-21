/** @format */

import React from "react";
import classes from "./Login.module.css";
import Logo from "../../assets/Logo.svg";
import Heading from "../../components/Login_SignUp/Heading/Heading";
import Inputs from "../../components/Login_SignUp/Inputs/Inputs";
import Button from "../../components/Login_SignUp/Buttons/Button";
import { useForm } from "../../components/Custom Hooks/useForm";
import { useMutation } from "@apollo/client";
import { LoginUserMutation } from "./LoginMutation";
import { useHistory } from "react-router-dom";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "editIssueinitialState":
      var newState = { ...state };
      console.log("NewState ", newState);
      newState.Name = action.values.Name;
      newState.Issue = action.values.Issue;
      newState.tag = action.values.tag;
      return newState;
    case "change":
      var changedState = { ...state };
      changedState[action.name] = action.value;
      console.log(changedState);
      return changedState;
    default:
      return state;
  }
}

const Login = () => {
  const [loginUser] = useMutation(LoginUserMutation);
  const history = useHistory();
  const [reducerState, dispatch] = useForm({
    Email: "",
    Password: "",
  });
  const buttonClick = async () => {
    const data: any = await loginUser({
      variables: {
        email: reducerState.Email,
        password: reducerState.Password,
      },
    });
    localStorage.setItem("token", data.data.loginUser.token);
    //Error Handling code goes here
    history.push("/");
  };
  return (
    <div className={classes.Container}>
      <div className={classes.logo}>
        <img src={Logo} />
      </div>
      <div className={classes.card}>
        <Heading Heading={"Log In"} />
        <Inputs defaultvalue={""} dispatch={dispatch} name={"Email"} />
        <Inputs
          defaultvalue={""}
          dispatch={dispatch}
          name={"Password"}
          password={true}
        />
        <Button click={buttonClick} name={"LogIn"} />
      </div>
    </div>
  );
};

export default Login;
