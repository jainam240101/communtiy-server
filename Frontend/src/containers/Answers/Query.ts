/** @format */

import { gql } from "@apollo/client";

export const GET_ANSWERS = gql`
  query Answers($id: String!) {
    issueAnswers(id: $id) {
      id
      answer
      answerOwner {
        name
        uniqueid
      }
    }
  }
`;
