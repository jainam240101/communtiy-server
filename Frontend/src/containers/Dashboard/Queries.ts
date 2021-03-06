/** @format */

import { gql } from "@apollo/client";

export const query = gql`
  query Readme {
    me {
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
