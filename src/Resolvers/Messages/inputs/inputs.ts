/** @format */

import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class createMessageInput {
  @Field()
  channelId: string;

  @Field()
  serverId: string;

  @Field()
  @Length(1, 255)
  message: string;
}
@InputType()
export class updateMessageInput {
  @Field()
  messageId: string;

  @Field()
  channelId: string;

  @Field()
  serverId: string;

  @Field()
  @Length(1, 255)
  message: string;
}

@InputType()
export class readMessageInput{
  @Field()
  channelId: string;

  @Field()
  serverId: string;
}

@InputType()
export class deleteMessageInput{
  @Field()
  channelId: string;

  @Field()
  serverId: string;
  
  @Field()
  messageId: string;

}