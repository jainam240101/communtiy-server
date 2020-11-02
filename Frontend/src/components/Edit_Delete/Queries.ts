/** @format */

import { gql } from "@apollo/client";

export const deleteProjectMutation = gql`
  mutation deleteProject($id: String!) {
    deleteProject(data: { uniqueid: $id }) {
      techStack
      title
      definition
    }
  }
`;

export const deleteIssueMutation = gql`
  mutation deleteIssue($id: String!) {
    deleteIssue(issueId: $id) {
      issueName
      tag
      uniqueid
      issueOwner {
        name
        email
      }
    }
  }
`;
