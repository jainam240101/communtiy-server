/** @format */

import { gql } from "@apollo/client";

export const all_issues = gql`
  query {
    issuesInfo(data: { id: "" }) {
      issueName
      issue
      tag
      uniqueid
      createdAt
      issueOwner {
        uniqueid
        name
        email
      }
    }
  }
`;

export const issues_by_tag = gql`
  query IssuesByTag($tag: String!) {
    tagIssue(tag: $tag) {
      issueName
      issue
      tag
      uniqueid
      createdAt
      issueOwner {
        uniqueid
        name
        email
      }
    }
  }
`;
