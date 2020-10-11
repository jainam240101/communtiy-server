/** @format */

import { gql } from "@apollo/client";

export const LoginUserMutation = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      name
      email
      token
      description
      enrollment
    }
  }
`;
