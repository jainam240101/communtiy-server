/** @format */

import { gql } from "@apollo/client";

export const getDataFromCache = gql`
  query Readme {
    me {
      uniqueid
      name
      enrollment
      email
      description
    }
  }
`;

export const edituserMutation = gql`
  mutation editUser(
    $email: String!
    $description: String!
    $enrollment: String!
  ) {
    updateUser(
      data: {
        email: $email
        description: $description
        enrollment: $enrollment
      }
    ) {
      name
      email
      enrollment
      description
    }
  }
`;
