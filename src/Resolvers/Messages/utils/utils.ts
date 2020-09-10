/** @format */

import { channels } from "../../../entities/channels";
import { ApolloError } from "apollo-server-express";
import { v4 } from "uuid";
interface createMessage {
  channelId: string;
  message: string;
  serverId: string;
  userId: string;
  usersName?: string;
  messageId?: string;
}

const createMessages = (messages: any) => {
  return JSON.parse(messages);
};

const findChannel = (channelId: string, serverId: string) => {
  return channels.findOne({
    where: {
      id: channelId,
      serverId: serverId,
    },
  });
};

export const createMessageResolver = async ({
  channelId,
  usersName,
  message,
  userId,
  serverId,
}: createMessage): Promise<boolean | undefined> => {
  try {
    const channel: channels | undefined = await findChannel(
      channelId,
      serverId
    );
    const newMessage: any = JSON.stringify({
      messageId: v4(),
      message: message,
      usersId: userId,
      usersName: usersName,
      timestamp: new Date(),
    });
    channel?.message.Message.push(newMessage);
    channel?.save();
    return true;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const updateMessageResolver = async ({
  channelId,
  message,
  messageId,
  userId,
  serverId,
}: createMessage): Promise<Boolean> => {
  try {
    const channel: channels | undefined = await findChannel(
      channelId,
      serverId
    );
    var result: any = createMessages(channel?.message.Message);
    for (var i = 0; i < result.length; i++) {
      if (result[i].messageId === messageId && result[i].usersId === userId) {
        result[i].message = message;
        break;
      }
    }
    result = JSON.stringify(result);
    channel!.message.Message = result;
    await channel?.save();
    return true;
  } catch (error) {
    throw new ApolloError("Some Error occured while updating the message");
  }
};

export const readMessages = async ({ channelId, serverId }: any) => {
  try {
    const channel: channels | undefined = await findChannel(
      channelId,
      serverId
    );
    var result: any = createMessages(channel?.message.Message);
    return result;
  } catch (error) {
    throw new ApolloError("Some Error occured while Reading the");
  }
};

export const deleteMessages = async ({
  channelId,
  serverId,
  userId,
  messageId,
}: any) => {
  try {
    const channel: channels | undefined = await findChannel(
      channelId,
      serverId
    );
    var result: any = createMessages(channel?.message.Message);
    for (var i = 0; i < result.length; i++) {
      if (result[i].messageId === messageId && result[i].usersId === userId) {
        result.splice(i, 1);
      }
    }
    result = JSON.stringify(result);
    channel!.message.Message = result;
    await channel?.save();
    return true;
  } catch (error) {
    throw new ApolloError("Some Error Occured in Deleting the Message");
  }
};
