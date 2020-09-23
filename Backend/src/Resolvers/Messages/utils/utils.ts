/** @format */

import { channels } from "../../../entities/channels";
import { ApolloError } from "apollo-server-express";
import { v4 } from "uuid";
import { Message } from "../../../entities/messages";
interface createMessage {
  channelId: string;
  message: string;
  serverId: string;
  userId: string;
  usersName?: string;
  messageId?: string;
}

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
    var messages: Message[] = [];
    if (channel?.message.Message.length !== 0) {
      channel?.message.Message.map((element) => {
        messages.push(element);
      });
    }
    messages.push(newMessage);
    var finalResult: any = messages;
    channel!.message.Message = finalResult;
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
    var result: Message[] = temp(channel?.message.Message);
    for (var i = 0; i < result.length; i++) {
      if (result[i].messageId === messageId && result[i].usersId === userId) {
        result[i].message = message;
        break;
      }
    }
    var finalValues: any[] = [];
    result.forEach((element) => {
      finalValues.push(JSON.stringify(element));
    });
    channel!.message.Message = finalValues;
    console.log(channel?.message.Message);
    await channel?.save();
    return true;
  } catch (error) {
    throw new ApolloError("Some Error occured while updating the message");
  }
};

const temp = (messages: any) => {
  var allMessages: Message[] = [];
  messages.forEach((element: any) => {
    allMessages.push(JSON.parse(element));
  });
  return allMessages;
};

export const readMessages = async ({ channelId, serverId }: any) => {
  try {
    const channel: channels | undefined = await findChannel(
      channelId,
      serverId
    );
    var messages = []
    for (var i = channel!.message.Message.length - 1;i>=0; i--){
      messages.push(channel?.message.Message[i])
    }
    var result: Message[] = temp(messages);
    return result;
  } catch (error) {
    throw new ApolloError(error);
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
    var result: Message[] = temp(channel?.message.Message);
    for (var i = 0; i < result.length; i++) {
      if (result[i].messageId === messageId && result[i].usersId === userId) {
        result.splice(i, 1);
      }
    }
    var finalValues: any = [];
    result.forEach((element) => {
      finalValues.push(JSON.stringify(element));
    });
    channel!.message.Message = finalValues;
    await channel?.save();
    return true;
  } catch (error) {
    throw new ApolloError("Some Error Occured in Deleting the Message");
  }
};
