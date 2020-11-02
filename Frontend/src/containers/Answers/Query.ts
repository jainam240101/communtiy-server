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
      issue {
        issueName
        issue
        tag
      }
    }
  }
`;

export const loggedInQuery = gql`
  query ReadMe {
    me {
      name
      uniqueid
      email
      enrollment
    }
  }
`;

export const createAnswerMutation = gql`
  mutation creatAnswer($issueid: String!, $answer: String!) {
    createAnswer(data: { issueId: $issueid, answer: $answer }) {
      issueId
      answer
      issue {
        issueName
        issue
      }
      answerOwner {
        name
        email
      }
    }
  }
`;
