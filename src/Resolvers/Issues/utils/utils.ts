/** @format */

import { Issue } from "../../../entities/Issues";
import { v4 as uuidv4 } from "uuid";
import { ApolloError } from "apollo-server-express";
import { createIssueInput, updateIssueInput } from "../inputs/IssueInput";
import { getConnection } from "typeorm";

export const createIssueResolver = ({
  issueName,
  tag,
  issue,
  user,
}: createIssueInput) => {
  try {
    return Issue.create({
      uniqueid: uuidv4(),
      issueName: issueName,
      issue: issue,
      tag: tag,
      ownerId: user,
    }).save();
  } catch (error) {
    throw new ApolloError("Some error occured in creating Issue");
  }
};

export const updateIssueResolver = async ({
  uniqueId,
  issueName,
  tag,
  issue,
  user,
}: updateIssueInput) => {
  try {
    const result = await Issue.findOne({
      where: {
        ownerId: user,
        uniqueid: uniqueId,
      },
    });
    if (result === undefined) {
      throw new ApolloError("Issue Not found");
    }
    if (issueName !== undefined) {
      result.issueName = issueName;
    }
    if (tag !== undefined) {
      result.tag = tag;
    }
    if (issue !== undefined) {
      result.issue = issue;
    }

    return result.save();
  } catch (error) {
    throw new ApolloError("Some error occured while updating the Issue");
  }
};

export const deleteIssueResolver = async (user: string, issueId: string) => {
  try {
    const issue = await Issue.findOne({
      where: {
        uniqueid: issueId,
        ownerId: user,
      },
    });
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Issue)
      .where({ ownerId: user, uniqueid: issueId })
      .execute();
    return issue;
  } catch (error) {
    throw new ApolloError("Some Problem occured while Deleting ");
  }
};
