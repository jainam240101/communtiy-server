/** @format */

import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { User, UserLoginEntity } from "../../entities/User";
import { createUserInput, loginInput, updateUserInput } from "./inputs/input";
import {
  registerUser,
  loginResolver,
  updateUser,
  deleteUserresolver,
  meResolver,
} from "./utils/utils";
import { MyContext } from "../../Types/Context";
import { isAuth } from "../../Middlewares/UserAuth/isAuth";
import { Project } from "../../entities/Project";

@Resolver(() => User)
export class UserResolver {
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
    const ownedProjects = await meResolver(ctx.req.currentUser.uniqueid);
    return { ...ctx.req.currentUser, ownedprojects: ownedProjects };
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
