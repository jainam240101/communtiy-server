/** @format */

import { gql } from "@apollo/client";

export const all_projects = gql`
  query {
    projectsInfo(data: { id: "" }) {
      title
      definition
      tag
      techStack
      formLink
      projectOwner {
        name
        enrollment
        description
        email
      }
    }
  }
`;
