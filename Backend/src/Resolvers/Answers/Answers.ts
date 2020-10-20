/** @format */

import {
  Resolver,
  Mutation,
  UseMiddleware,
  Arg,
  Ctx,
  Query,
  FieldResolver,
  Root,
} from "type-graphql";
import { IssueAnswers } from "../../entities/IssueAnswers";
import { isAuth } from "../../Middlewares/UserAuth/isAuth";
import { createAnswerInput, updateAnswer } from "./inputs/inputs";
import {
  createAnswerResolver,
  updateAnswerResolver,
  deleteAnswerResolver,
} from "./utils/utils";
import { MyContext } from "../../Types/Context";
import { ApolloError } from "apollo-server-express";
import { User } from "../../entities/User";
import { Issue } from "../../entities/Issues";

@Resolver(() => IssueAnswers)
export class issueAnswer {
  @FieldResolver()
  async issue(@Root() parent: IssueAnswers) {
    try {
      // console.log(parent);
      const issue: Issue | undefined = await Issue.findOne({
        where: {
          uniqueid: parent.issueId,
        },
      });
      return issue;
    } catch (error) {
      throw new ApolloError("Issue Not Found");
    }
  }

  @FieldResolver()
  async answerOwner(@Root() parent: IssueAnswers) {
    const user: User | undefined = await User.findOne({
      where: {
        uniqueid: parent.answeredBy,
      },
    });
    return user;
  }

  @Query(() => [IssueAnswers])
  async issueAnswers(@Arg("id") id: string) {
    if (id.length === 0) {
      throw new ApolloError("Id Not given");
    }
    const result: IssueAnswers[] = await IssueAnswers.find({
      where: {
        issueId: id,
      },
      order: {
        createdAt: "DESC",
      },
    });
    var allIssues: IssueAnswers[] = [];
    for (var i = 0; i < result.length; i++) {
      var user: User | undefined = await User.findOne({
        where: {
          uniqueid: result[i].answeredBy,
        },
      });
      if (undefined) {
        throw new ApolloError("Id Not given");
      }
      var temp: User = user!;
      result[i].answerOwner = temp;
      allIssues.push(result[i]);
    }
    // console.log(allIssues);
    return result;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => IssueAnswers)
  async createAnswer(
    @Ctx() ctx: MyContext,
    @Arg("data") { issueId, answer }: createAnswerInput
  ): Promise<IssueAnswers | undefined> {
    const result = await createAnswerResolver({
      issueId,
      answer,
      answeredBy: ctx.req.currentUser.uniqueid,
    });
    result.answerOwner = ctx.req.currentUser;
    return result;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => IssueAnswers)
  async updateAnswer(
    @Arg("data") { answerId, answer }: updateAnswer,
    @Ctx() ctx: MyContext
  ) {
    const result = await updateAnswerResolver({
      answerId,
      answer,
      answeredBy: ctx.req.currentUser.uniqueid,
    });
    result!.answerOwner = ctx.req.currentUser;
    return result;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => IssueAnswers)
  async deleteAnswer(@Arg("id") id: string, @Ctx() ctx: MyContext) {
    const result = await deleteAnswerResolver(id);
    result!.answerOwner = ctx.req.currentUser;
    return result;
  }
}
