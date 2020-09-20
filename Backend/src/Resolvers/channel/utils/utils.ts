/** @format */

import { channels } from "../../../entities/channels";
import { v4 } from "uuid";
import { ApolloError } from "apollo-server-express";
import { deleteChannel } from "../inputs/input";

interface createChannel {
  channelName: string;
  description: string;
  serverId: string;
}
interface updateChannel {
  channelName?: string;
  description?: string;
  serverId: string;
  channelId: string;
}

export const createChannelsResolver = async ({
  serverId,
  description,
  channelName,
}: createChannel) => {
  channelName = channelName.toLowerCase();
  const checkNameValidation: channels | undefined = await channels.findOne({
    where: {
      serverId: serverId,
      channelName: channelName,
    },
  });
  if (checkNameValidation !== undefined) {
    console.log("Inside");
    throw new ApolloError("The channel name already exists");
  }
  return channels.create({
    id: v4(),
    channelName: channelName,
    message: {
      "Message":[],
    },
    description: description,
    serverId: serverId,
  });
};

export const updateChannelsResolver = async ({
  channelId,
  description,
  serverId,
  channelName,
}: updateChannel) => {
  channelName = channelName?.toLowerCase();
  try {
    const channel = await channels.findOne({
      id: channelId,
      serverId: serverId,
    });
    if (channelName !== undefined) {
      channel!.channelName = channelName;
    }
    if (description !== undefined) {
      channel!.description = description;
    }
    return channel;
  } catch (error) {
    throw new ApolloError("Some Error occured while updating the channel");
  }
};

export const deleteChannelsResolver = async ({
  serverId,
  channelId,
}: deleteChannel) => {
  try {
    const channel = await channels.findOne({
      id: channelId,
      serverId: serverId,
    });
    return channel;
  } catch (error) {
    throw new ApolloError("Some Error occured while deleting the channel");
  }
};
