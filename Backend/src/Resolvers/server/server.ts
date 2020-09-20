/** @format */

import {
  Resolver,
  Mutation,
  Ctx,
  Arg,
  UseMiddleware,
  FieldResolver,
  Root,
} from "type-graphql";
import { Server } from "../../entities/server";
import { isAuth } from "../../Middlewares/UserAuth/isAuth";
import { MyContext } from "../../Types/Context";
import {
  createServerInput,
  updateServerInput,
  deleteServer,
} from "./inputs/inputs";
import {
  createServerResolver,
  updateServerResolver,
  deleteServerResolver,
} from "./utils/utils";
import { User } from "../../entities/User";

@Resolver(() => Server)
export class serverResolver {
  @FieldResolver()
  async owner(
    @Root() parent:Server,
    @Ctx() ctx: MyContext
  ) {
    if (ctx.req.currentUser === undefined) {
      const user = await User.findOne({
        where: {
          uniqueid:parent.ownerId
        }
      })
      return user
    }
    return ctx.req.currentUser;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Server)
  async createServer(
    @Ctx() ctx: MyContext,
    @Arg("data") { server_name, description, logoLink,  showCase }: createServerInput
  ): Promise<Server | undefined> {
    const result = await createServerResolver({
      server_name,
      description,
      showCase,
      logoLink,
      userId: ctx.req.currentUser.uniqueid,
    });
    return result;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Server)
  async updateServer(
    @Ctx() ctx: MyContext,
    @Arg("data")
    { serverId, server_name, description,showCase, logoLink }: updateServerInput
  ): Promise<Server | undefined> {
    const result = await updateServerResolver({
      serverId,
      server_name,
      showCase,
      description,
      logoLink,
      userId: ctx.req.currentUser.uniqueid,
    });
    return result;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Server)
  async deleteServer(
    @Arg("data") { serverId }: deleteServer,
    @Ctx() ctx: MyContext
  ): Promise<Server | undefined> {
    const result = await deleteServerResolver({
      serverId,
      userId: ctx.req.currentUser.uniqueid,
    });
    return result;
  }
}
