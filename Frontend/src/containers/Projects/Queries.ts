/** @format */

import { gql } from "@apollo/client";

export const all_projects = gql`
  query {
    projectsInfo(data: { id: "" }) {
      uniqueid
      title
      definition
      tag
      techStack
      formLink
      projectOwner {
        uniqueid
        name
        enrollment
        description
        email
      }
    }
  }
`;
