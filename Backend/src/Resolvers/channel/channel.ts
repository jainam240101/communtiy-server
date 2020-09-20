/** @format */

import {
  Resolver,
  UseMiddleware,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Ctx,
  Query,
} from "type-graphql";
import { isAuth } from "../../Middlewares/UserAuth/isAuth";
import { channels } from "../../entities/channels";
import {
  createChannelInput,
  updateChannelInput,
  deleteChannel,
} from "./inputs/input";
import {
  createChannelsResolver,
  updateChannelsResolver,
  deleteChannelsResolver,
} from "./utils/utils";
import { Server } from "../../entities/server";
import { ApolloError } from "apollo-server-express";
import { getConnection } from "typeorm";
import { MyContext } from "src/Types/Context";
@Resolver(() => channels)
export class ChannelResolver {
  public isDelete: boolean;
  public queryRunning: boolean;
  constructor() {
    this.isDelete = false;
    this.queryRunning = false;
  }

  //FieldResolvers

  @FieldResolver()
  async server(
    @Root() parent: channels,
    @Ctx() ctx: MyContext
  ): Promise<Server | undefined> {
    const server: Server | undefined = await Server.findOne({
      where: {
        id: parent.serverId,
      },
    });
    if (ctx.req.currentUser === undefined) {
      return server;
    }
    if (this.queryRunning) {
      this.queryRunning = false;
      return server;
    }
    if (server?.ownerId !== ctx.req.currentUser.uniqueid) {
      throw new Error("The user cant perform operations on channels");
    }
    if (this.isDelete) {
      try {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(channels)
          .where({
            id: parent.id,
            serverId: parent.serverId,
          })
          .execute();
        this.isDelete = false;
        return server;
      } catch (error) {
        throw new ApolloError("Some Error Occured while Deleting");
      }
    }
    await parent.save();
    return server;
  }

  //Queries
  @Query(() => [channels])
  async channelInfo(@Arg("id") id: string) {
    var channel: channels | channels[] | undefined;
    if (id.length !== 0) {
      channel = await channels.findOne({
        where: {
          id: id,
        },
      });
      return channel;
    }
    channel = await channels.find();
    this.queryRunning = true;
    return channel;
  }

  //Mutations

  @UseMiddleware(isAuth)
  @Mutation(() => channels)
  async createChannel(
    @Arg("data") { channelName, description, serverId }: createChannelInput
  ) {
    try {
      const result: channels = await createChannelsResolver({
        channelName,
        description,
        serverId,
      });
      return result;
    } catch (error) {
      throw new ApolloError("Some Error Occured");
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => channels)
  async updateChannel(
    @Arg("data")
    { channelId, channelName, serverId, description }: updateChannelInput
  ) {
    const result: channels | undefined = await updateChannelsResolver({
      channelId,
      channelName,
      serverId,
      description,
    });
    return result;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => channels)
  async deleteChannel(@Arg("data") { channelId, serverId }: deleteChannel) {
    const result: channels | undefined = await deleteChannelsResolver({
      channelId,
      serverId,
    });
    this.isDelete = true;
    return result;
  }
}
