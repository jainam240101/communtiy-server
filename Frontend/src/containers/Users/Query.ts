/** @format */

import { gql } from "@apollo/client";

export const findUser = gql`
  query User($id: String!) {
    findUser(id: $id) {
      uniqueid
      name
      enrollment
      email
      description
      ownedprojects {
        uniqueid
        title
        definition
        formLink
        tag
        techStack
      }
      ownedIssues {
        uniqueid
        issueName
        issue
        tag
        createdAt
      }
      issueAnswered {
        id
        answer
      }
    }
  }
`;
