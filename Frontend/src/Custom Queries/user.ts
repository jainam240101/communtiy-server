/** @format */

import { gql } from "@apollo/client";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    uniqueid @client
    isLoggedIn @client
    name @client
    email @client
    enrollment @client
    description @client
    ownedprojects {
      title @client
      definition @client
      formLink @client
      tag @client
      techStack @client
    }
    ownedIssues {
      issue @client
      issueName @client
      tag @client
    }
    issueAnswered {
      answer @client
      issueId @client
    }
  }
`;

export const ME = gql`
  query {
    me {
      uniqueid
      name
      email
      enrollment
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
        issue
        issueName
        tag
        createdAt
      }
      issueAnswered {
        id
        answer
        issueId
      }
    }
  }
`;

export const findUniqueId = gql`
  query {
    me {
      uniqueid @client
    }
  }
`;
