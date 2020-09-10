/** @format */

import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Notification {
  @Field(() => ID)
  channelId: string;

  @Field(() => ID)
  serverId: string;

  @Field(() => String)
  message?: string;

  @Field(() => Date)
  timestamp: Date;

  @Field(() => String)
  usersName: string;
}

export interface NotificationPayload {
  channelId: string;
  serverId: string;
  message: string;
  timestamp: Date;
  usersName: string;
}
