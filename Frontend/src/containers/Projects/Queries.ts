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

export const projects_by_tag = gql`
  query ProjectsByTag($tag: String!) {
    projectDisplayTag(tag: $tag) {
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
