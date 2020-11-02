/** @format */

import React, { useEffect, useState } from "react";
import { cache } from "../..";
import Contact from "../../components/Dashboard Components/Contacts/Contact";
import Header from "../../components/Dashboard Components/Header/Header";
import Loading from "../../components/Loading/Loading";
import Page from "../../Layout/Page/Page";
import { findUser } from "./Query";
import Information from "../../components/Dashboard Components/Information/Information";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
const User = () => {
  const history = useHistory();
  const [findusermutation, value] = useLazyQuery(findUser);
  useEffect(() => {
    const id = history.location.pathname.split("/")[2];
    findusermutation({ variables: { id: id } });
  }, []);
  if (value.data) {
    console.log(value.data.findUser);
    return (
      <Page>
        <Header
          name={value.data.findUser.name}
          description={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
        />
        <Contact />
        <Information
          issueAnswered={value.data.findUser.issueAnswered}
          ownedIssues={value.data.findUser.ownedIssues}
          ownedProjects={value.data.findUser.ownedprojects}
          name={value.data.findUser.name}
          email={value.data.findUser.email}
          uniqueid={value.data.findUser.uniqueid}
        />
      </Page>
    );
  }
  return <h1>Loading</h1>;
};

export default User;
