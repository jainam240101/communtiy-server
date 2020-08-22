/** @format */

import {
  Resolver,
  UseMiddleware,
  Mutation,
  Arg,
  Ctx,
  Query,
} from "type-graphql";
import { Issue } from "../../entities/Issues";
import {
  createIssueInput,
  updateIssueInput,
  issuesInfoInput,
} from "./inputs/IssueInput";
import {
  createIssueResolver,
  updateIssueResolver,
  deleteIssueResolver,
} from "./utils/utils";
import { MyContext } from "../../Types/Context";
import { isAuth } from "../../Middlewares/UserAuth/isAuth";
import { User } from "../../entities/User";

@Resolver()
export class IssueResolver {
  @Query(() => [Issue])
  async issuesInfo(@Arg("data") { id }: issuesInfoInput) {
    var issues: Issue | Issue[] | undefined;
    if (id.length !== 0) {
      var issue: Issue | undefined = await Issue.findOne({
        where: {
          uniqueid: id,
        },
      });
      const owner = await User.findOne({
        where: {
          uniqueid: issue?.ownerId,
        },
      });
      issue!.issueOwner = owner;
      return [issue];
    }
    issues = await Issue.find();
    var allissues: any[] = [];
    for (var i = 0; i < issues.length; i++) {
      var owner = await User.findOne({
        where: {
          uniqueid: issues[i].ownerId,
        },
      });
      issues[i]!.issueOwner = owner;
      allissues.push(issues[i]);
    }
    return allissues;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Issue)
  async createIssue(
    @Ctx() ctx: MyContext,
    @Arg("data") { issueName, tag, issue }: createIssueInput
  ): Promise<Issue> {
    const result = await createIssueResolver({
      issueName,
      tag,
      issue,
      user: ctx.req.currentUser.uniqueid,
    });
    result.issueOwner = ctx.req.currentUser;
    return result;
  }
  @UseMiddleware(isAuth)
  @Mutation(() => Issue)
  async updateIssue(
    @Ctx() ctx: MyContext,
    @Arg("data") { uniqueId, issueName, tag, issue }: updateIssueInput
  ): Promise<Issue> {
    const result = await updateIssueResolver({
      uniqueId,
      issue,
      issueName,
      tag,
      user: ctx.req.currentUser.uniqueid,
    });

    result.issueOwner = ctx.req.currentUser;
    return result;
  }
  @UseMiddleware(isAuth)
  @Mutation(() => Issue)
  async deleteIssue(
    @Ctx() ctx: MyContext,
    @Arg("issueId") issueId: string
  ): Promise<Issue> {
    const result: Issue | undefined = await deleteIssueResolver(
      ctx.req.currentUser.uniqueid,
      issueId
    );
    result!.issueOwner = ctx.req.currentUser;
    return result!;
  }
}
