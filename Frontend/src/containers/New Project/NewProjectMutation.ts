/** @format */

import { gql } from "@apollo/client";

export const NewProjectMutation = gql`
  mutation createProject(
    $title: String!
    $definition: String!
    $formLink: String!
    $tag: String!
    $techStack: [String!]!
  ) {
    createProject(
      data: {
        title: $title
        definition: $definition
        formLink: $formLink
        tag: $tag
        techStack: $techStack
      }
    ) {
      definition
      uniqueid
      tag
      techStack
      title
    }
  }
`;
