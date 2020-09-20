/** @format */

import { InputType, Field } from "type-graphql";

@InputType()
export class createServerInput {
  @Field()
  server_name: string;

  @Field()
  description: string;

  @Field()
  logoLink: string;

  @Field()
  showCase: boolean;
}
@InputType()
export class updateServerInput {
  @Field()
  serverId: string;

  @Field({ nullable: true })
  server_name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  logoLink: string;
  
  @Field()
  showCase: boolean;
}

@InputType()
export class deleteServer {
  @Field()
  serverId: string;
}
