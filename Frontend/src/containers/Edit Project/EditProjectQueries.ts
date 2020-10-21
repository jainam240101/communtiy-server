import { gql } from "@apollo/client";

export const projctsInfo = gql`
  query projectsInfo($id: String!) {
    projectsInfo(data: { id: $id }) {
      title
      definition
      formLink
      tag
      techStack
    }
  }
`;
