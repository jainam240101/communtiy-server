/** @format */

import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Page from "../../Layout/Page/Page";
import { GET_ANSWERS } from "./Query";

const Answers = () => {
  const history = useHistory();
  const [id, setid] = useState("");
  useEffect(() => {
    setid(history.location.pathname.split("/")[2]);
  }, []);
  const { data, error, loading } = useQuery(GET_ANSWERS, {
    variables: { id: id },
  });
  if (error) {
    return <div>{error}</div>;
  }
  if (loading) {
    return <Loading />;
  }
  console.log(data);
    return <Page>
      Answers
  </Page>
};

export default Answers;
