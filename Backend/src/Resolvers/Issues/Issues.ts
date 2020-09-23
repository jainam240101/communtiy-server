/** @format */

import {
  Resolver,
  UseMiddleware,
  Mutation,
  Arg,
  Ctx,
  Query,
  FieldResolver,
  Root,
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
  tagIssueResolver,
} from "./utils/utils";
import { MyContext } from "../../Types/Context";
import { isAuth } from "../../Middlewares/UserAuth/isAuth";
import { User } from "../../entities/User";
import { ApolloError } from "apollo-server-express";

@Resolver(() => Issue)
export class IssueResolver {
  @FieldResolver()
  async issueOwner(@Root() parent: Issue) {
    try {
      const owner: User | undefined = await User.findOne({
        where: {
          uniqueid: parent.ownerId,
        },
      });
      return owner;
    } catch (error) {
      throw new ApolloError("Issue Owner Not found");
    }
  }

  @Query(() => [Issue])
  async issuesInfo(@Arg("data") { id }: issuesInfoInput) {
    var issues: Issue | Issue[] | undefined;
    if (id.length !== 0) {
      var issue: Issue | undefined = await Issue.findOne({
        where: {
          uniqueid: id,
        },
      });

      return [issue];
    }
    issues = await Issue.find();
    return issues;
  }

  @Query(() => [Issue])
  async tagIssue(@Arg("tag") tag: string): Promise<Issue[]> {
    const result: Issue[] = await tagIssueResolver(tag);
    return result;
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
