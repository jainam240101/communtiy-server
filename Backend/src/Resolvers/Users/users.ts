/** @format */

import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  UseMiddleware,
  FieldResolver,
  Root,
} from "type-graphql";
import { User, UserLoginEntity } from "../../entities/User";
import { createUserInput, loginInput, updateUserInput } from "./inputs/input";
import {
  registerUser,
  loginResolver,
  updateUser,
  deleteUserresolver,
} from "./utils/utils";
import { MyContext } from "../../Types/Context";
import { isAuth } from "../../Middlewares/UserAuth/isAuth";
import { Project } from "../../entities/Project";
import { ApolloError } from "apollo-server-express";
import { Issue } from "../../entities/Issues";
import { IssueAnswers } from "../../entities/IssueAnswers";

@Resolver(() => User)
export class UserResolver {
  @FieldResolver()
  async ownedprojects(@Root() parent: User) {
    try {
      const projects: Project[] | undefined = await Project.find({
        where: {
          ownerId: parent.uniqueid,
        },
      });
      return projects;
    } catch (error) {
      throw new ApolloError("Some Error Occured");
    }
  }

  @FieldResolver()
  async ownedIssues(@Root() parent: User) {
    try {
      const Issues: Issue[] | undefined = await Issue.find({
        where: {
          ownerId: parent.uniqueid,
        },
      });
      return Issues;
    } catch (error) {
      throw new ApolloError("Some Error Occured in Giving Issues");
    }
  }

  @FieldResolver()
  async issueAnswered(@Root() parent: User) {
    try {
      const issueAnswer: IssueAnswers[] | undefined = await IssueAnswers.find({
        where: {
          answeredBy: parent.uniqueid,
        },
      });
      return issueAnswer;
    } catch (error) {
      throw new ApolloError("Some Error Occured in Giving Issue Answers");
    }
  }

  @Query(() => [User])
  async allUsers() {
    const users = await User.find();
    var allUsers = [];
    for (var i = 0; i < users.length; i++) {
      var project = await Project.find({
        where: {
          ownerId: users[i].uniqueid,
        },
      });
      allUsers.push({ ...users[i], ownedprojects: project });
    }
    return allUsers;
  }

  @UseMiddleware(isAuth)
  @Query(() => User)
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    const user: User = { ...ctx.req.currentUser };
    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("data")
    { name, description, email, enrollment, password }: createUserInput
  ): Promise<User | undefined> {
    return registerUser({ name, description, email, enrollment, password });
  }

  @Mutation(() => UserLoginEntity)
  async loginUser(
    @Arg("data") { email, password }: loginInput
  ): Promise<UserLoginEntity | undefined> {
    return loginResolver({ email, password });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async updateUser(
    @Arg("data") { email, password, description }: updateUserInput,
    @Ctx() ctx: MyContext
  ): Promise<User | undefined> {
    return updateUser({
      email,
      password,
      description,
      user: ctx.req.currentUser,
    });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async deleteUser(@Ctx() ctx: MyContext): Promise<User | undefined> {
    const result = await deleteUserresolver(ctx.req.currentUser);
    if (result === "Success") {
      return ctx.req.currentUser;
    }
    return undefined;
  }
}
