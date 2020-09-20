/** @format */

import { IssueAnswers } from "../../../entities/IssueAnswers";
import { ApolloError } from "apollo-server-express";
import { v4 } from "uuid";
import { getConnection } from "typeorm";

interface createAnswer {
  issueId?: string;
  answer: string;
  answeredBy: string;
  answerId?: string;
}
export const createAnswerResolver = async ({
  issueId,
  answer,
  answeredBy,
}: createAnswer) => {
  try {
    return IssueAnswers.create({
      id: v4(),
      issueId: issueId,
      answer: answer,
      answeredBy: answeredBy,
    }).save();
  } catch (error) {
    throw new ApolloError("Some Error Occured while creating the Answer");
  }
};

export const updateAnswerResolver = async ({
  answerId,
  answer,
  answeredBy,
}: createAnswer) => {
  try {
    const result: IssueAnswers | undefined = await IssueAnswers.findOne({
      where: {
        id: answerId,
        answeredBy: answeredBy,
      },
    });
    result!.answer = answer;
    return result!.save();
  } catch (error) {
    throw new ApolloError("Some Error Occured while updating");
  }
};

export const deleteAnswerResolver = async (id: string) => {
    try {
        const answer = await IssueAnswers.findOne({
            where: {
                id:id
            }
        })
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(IssueAnswers)
            .where({ id: id })
            .execute()
        return answer
    } catch (error) {
        throw new ApolloError("Some Problem occured while Deleting ");
    }
}