/** @format */

import { Resolver, Mutation, UseMiddleware, Arg, Ctx } from "type-graphql";
import { IssueAnswers } from "../../entities/IssueAnswers";
import { isAuth } from "../../Middlewares/UserAuth/isAuth";
import { createAnswerInput, updateAnswer } from "./inputs/inputs";
import {
  createAnswerResolver,
  updateAnswerResolver,
  deleteAnswerResolver,
} from "./utils/utils";
import { MyContext } from "../../Types/Context";

@Resolver()
export class issueAnswer {
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
