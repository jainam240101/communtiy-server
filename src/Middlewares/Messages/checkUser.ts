/** @format */

import { MiddlewareFn } from "type-graphql";
import { Server } from "../../entities/server";
import { MyContext } from "../../Types/Context";
import { ApolloError } from "apollo-server-express";

export const userJoined: MiddlewareFn<MyContext> = async (
  { args, context },
  next
) => {
  const newArgs = { ...args.data };
  const server: Server | undefined = await Server.findOne({
    where: {
      id: newArgs.serverId,
    },
  });
  if (
    server?.ownerId !== context.req.currentUser.uniqueid ||
    server?.usersJoined.includes(context.req.currentUser.uniqueid)
  ) {
    throw new ApolloError("You Dont have permission to access this mutation");
  }
  next();
};
