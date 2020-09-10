/** @format */

import { ObjectType, Field } from "type-graphql";
import { channels } from "./channels";

@ObjectType()
export class Message {
  @Field()
  messageId: string;

  @Field()
  message: string;

  @Field()
  usersName: string;

  usersId: string;

  @Field()
  timestamp: string;

  @Field(() => channels)
  channel: channels;
}
