/** @format */

import { Server } from "../../../entities/server";
import { v4 } from "uuid";
import { ApolloError } from "apollo-server-express";
import { getConnection } from "typeorm";

interface createServer {
  server_name: string;
  description: string;
  showCase: boolean;
  logoLink: string;
  userId: string;
}
interface updateServer {
  serverId: string;
  showCase?: boolean;
  server_name?: string;
  description?: string;
  logoLink?: string;
  userId: string;
}
export const createServerResolver = async ({
  server_name,
  description,
  logoLink,
  showCase,
  userId,
}: createServer) => {
  try {
    console.log(showCase);
    return Server.create({
      id: v4(),
      showCase: showCase,
      server_name: server_name,
      description: description,
      logoLink: logoLink,
      usersJoined: [],
      ownerId: userId,
    }).save();
  } catch (error) {
    throw new ApolloError("Some Error Occured while creating the Server");
  }
};

export const updateServerResolver = async ({
  serverId,
  userId,
  logoLink,
  showCase,
  description,
  server_name,
}: updateServer) => {
  try {
    const result = await Server.findOne({
      id: serverId,
      ownerId: userId,
    });
    if (logoLink !== undefined) {
      result!.logoLink = logoLink;
    }
    if (description !== undefined) {
      result!.description = description;
    }
    if (showCase !== undefined) {
      result!.showCase = showCase;
    }
    if (server_name !== undefined) {
      result!.server_name = server_name;
    }
    return result!.save();
  } catch (error) {
    throw new ApolloError("Some error occured while updating the Server");
  }
};

export const deleteServerResolver = async ({
  serverId,
  userId,
}: updateServer) => {
  try {
    const server = await Server.findOne({
      where: {
        id: serverId,
        ownerId: userId,
      },
    });
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Server)
      .where({ ownerId: userId, id: serverId })
      .execute();
    return server;
  } catch (error) {
    throw new ApolloError("Some Error Occured while deleting the server");
  }
};
