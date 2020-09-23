/** @format */
import { PubSubEngine } from "graphql-subscriptions";
import {
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Subscription,
  PubSub,
  ArgsType,
  Root,
  Ctx,
  Query,
  FieldResolver,
} from "type-graphql";
import {
  createMessageInput,
  updateMessageInput,
  deleteMessageInput,
  readMessageInput,
} from "./inputs/inputs";
import { userJoined } from "../../Middlewares/Messages/checkUser";
import { isAuth } from "../../Middlewares/UserAuth/isAuth";
import { NotificationPayload, Notification } from "./Types/notification";
import { MyContext } from "../../Types/Context";
import {
  createMessageResolver,
  updateMessageResolver,
  readMessages,
  deleteMessages,
} from "./utils/utils";
import { ApolloError } from "apollo-server-express";
import { Message } from "../../entities/messages";
import { channels } from "../../entities/channels";

@ArgsType()
@Resolver(() => Message)
export class messageResolver {
  public channelId: string;
  public serverId: string;
  constructor() {
    this.channelId = "";
    this.serverId = "";
  }

  //Field Resolvers
  @FieldResolver()
  async channel(): Promise<channels | undefined> {
    const channel: channels | undefined = await channels.findOne({
      where: {
        id: this.channelId,
        serverId: this.serverId,
      },
    });
    return channel;
  }

  //Subscriptions
  @Subscription({
    topics: "NOTIFICATIONS",
    filter: ({ payload, args }) => {
      return args.channelId === payload.channelId;
    },
  })
  messageSubscription(
    @Arg("channelId") channelid: string,
    @Root()
    { channelId, message, serverId, timestamp, usersName }: NotificationPayload
  ): Notification {
    channelid = channelid;
    return {
      channelId,
      message,
      serverId,
      timestamp,
      usersName,
    };
  }

  @UseMiddleware(isAuth, userJoined)
  @Mutation(() => Boolean)
  async createMessage(
    @Arg("data") { channelId, message, serverId }: createMessageInput,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() ctx: MyContext
  ): Promise<boolean | undefined> {
    try {
      const result: boolean | undefined = await createMessageResolver({
        channelId,
        message,
        serverId,
        userId: ctx.req.currentUser.uniqueid,
        usersName: ctx.req.currentUser.name,
      });
      const payload: NotificationPayload = {
        channelId,
        message,
        serverId,
        timestamp: new Date(),
        usersName: ctx.req.currentUser.name,
      };
      await pubSub.publish("NOTIFICATIONS", payload);
      return result;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  @UseMiddleware(isAuth, userJoined)
  @Mutation(() => Boolean)
  async updateMessage(
    @Ctx() ctx: MyContext,
    @Arg("data") { channelId, messageId, serverId, message }: updateMessageInput
  ): Promise<Boolean> {
    updateMessageResolver({
      channelId,
      messageId,
      serverId,
      message,
      userId: ctx.req.currentUser.uniqueid,
    });
    return true;
  }

  @UseMiddleware(isAuth, userJoined)
  @Mutation(() => Boolean)
  async deleteMessage(
    @Ctx() ctx: MyContext,
    @Arg("data") { messageId, serverId, channelId }: deleteMessageInput
  ) {
    const messages = deleteMessages({
      messageId,
      serverId,
      channelId,
      userId: ctx.req.currentUser.uniqueid,
    });
    return messages;
  }

  @Query(() => [Message])
  async readMessage(@Arg("data") { channelId, serverId }: readMessageInput) {
    const messages = await readMessages({ channelId, serverId });
    this.channelId = channelId;
    this.serverId = serverId;
    return messages;
  }
}
