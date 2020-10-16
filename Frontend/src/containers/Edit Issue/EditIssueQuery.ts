import { gql } from "@apollo/client";

export const IssueInfo = gql`
    query issues($id:String!) {
    issuesInfo(data: { id: $id }) {
      issueName
      issue
      tag
      uniqueid
      createdAt
    }
  }
`;