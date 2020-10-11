/** @format */

import { gql } from "@apollo/client";

export const createUserMutation = gql`
  mutation Createuser(
    $name: String!
    $email: String!
    $password: String!
    $enrollment: String!
    $description: String!
  ) {
    createUser(
      data: {
        name: $name
        email: $email
        password: $password
        enrollment: $enrollment
        description: $description
      }
    ) {
      name
      email
      description
      uniqueid
    }
  }
`;
