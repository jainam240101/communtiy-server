/** @format */

import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class createChannelInput {
  @Field()
  channelName: string;

  @Field()
  serverId: string;

  @Field()
  @Length(1, 2000)
  description: string;
}

@InputType()
export class updateChannelInput {
  @Field({ nullable: true })
  channelName: string;

  @Field({ nullable: true })
  channelId: string;

  @Field()
  serverId: string;

  @Field({ nullable: true })
  @Length(1, 2000)
  description: string;
}

@InputType()
export class deleteChannel {
  @Field()
  channelId: string;

  @Field()
  serverId: string;
}
