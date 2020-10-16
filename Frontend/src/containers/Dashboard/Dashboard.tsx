/** @format */

import { gql } from "@apollo/client";
import React from "react";
import { cache } from "../..";
import Header from "../../components/Dashboard Components/Header/Header";
import Loading from "../../components/Loading/Loading";
import Page from "../../Layout/Page/Page";
import { query } from "./Queries";

const Dashboard = () => {
  const data: any = cache.readQuery({ query: query });
  if (data === null) {
    return <Loading />;
  }
  console.log(data.me);
  return (
    <Page>
      <Header
        name={data.me.name}
        email={data.me.email}
        enrollment={data.me.enrollment}
        description={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
      />
    </Page>
  );
};

export default Dashboard;
