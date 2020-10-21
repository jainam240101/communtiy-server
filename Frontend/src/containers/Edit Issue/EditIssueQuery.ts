/** @format */

import { gql } from "@apollo/client";

export const IssueInfo = gql`
  query issues($id: String!) {
    issuesInfo(data: { id: $id }) {
      issueName
      issue
      tag
      uniqueid
      createdAt
    }
  }
`;

export const updateIssueMutation = gql`
  mutation updateIssue(
    $uniqueId: String!
    $issueName: String!
    $tag: String!
    $issue: String!
  ) {
    updateIssue(
      data: {
        uniqueId: $uniqueId
        issueName: $issueName
        tag: $tag
        issue: $issue
      }
    ) {
      issueName
    }
  }
`;
