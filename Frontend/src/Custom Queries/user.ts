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