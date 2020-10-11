/** @format */

import { gql } from "@apollo/client";

export const NewIssueMutation = gql`
  mutation createIssue($issueName: String!, $tag: String!, $issue: String!) {
    createIssue(data: { issueName: $issueName, tag: $tag, issue: $issue }) {
      uniqueid
      issue
      issueName
      tag
    }
  }
`;
