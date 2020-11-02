/** @format */

import { gql } from "@apollo/client";

export const editAnswerMutation = gql`
  mutation updateAnswerMutation($answerId: String!, $answer: String!) {
    updateAnswer(data: { answerId: $answerId, answer: $answer }) {
      id
      answer
    }
  }
`;
export const deleteAnswerMutation = gql`
  mutation deleteAnswerMutation($answerId: String!) {
    deleteAnswer(data: { id: $answerId }) {
      id
      answer
    }
  }
`;
