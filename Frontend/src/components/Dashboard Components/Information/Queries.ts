/** @format */

import { gql } from "@apollo/client";

export const ownedProjects = gql`
  query ME {
    me {
      name
      email
      uniqueid
      ownedprojects {
        uniqueid
        title
        definition
        formLink
        tag
        techStack
      }
    }
  }
`;

export const ownedIssues = gql`
  query ME {
    me {
      name
      email
      uniqueid
      ownedIssues {
        uniqueid
        issueName
        issue
        tag
        createdAt
      }
    }
  }
`;

export const issuesAnswered = gql`
  query {
    me {
      issueAnswered {
        id
        answer
      }
    }
  }
`;
