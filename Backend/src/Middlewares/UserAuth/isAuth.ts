/** @format */

import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../../Types/Context";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User";
import { AuthenticationError } from "apollo-server-express";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.headers.authorization) {
    return "Not Authorized";
  }
  const token = context.req.headers.authorization.split(" ")[1];
  const verify: any = jwt.verify(token, "stackapi");
  if (!verify) {
    throw new AuthenticationError("Not Authorized");
  }
  const validUser = await User.findOne({
    where: {
      uniqueid: verify.id,
    },
  });
  if (!validUser) {
    throw new AuthenticationError("Not Authorized");
  }
  context.req.currentUser = validUser;
  return next();
};
