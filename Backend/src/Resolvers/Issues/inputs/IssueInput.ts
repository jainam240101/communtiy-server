/** @format */

import { IsNumber } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class createIssueInput {
  @Field()
  issueName: string;

  @Field()
  tag: string;

  @Field()
  issue: string;

  user: string;
}
@InputType()
export class updateIssueInput {
  @Field()
  uniqueId: string;

  @Field({ nullable: true })
  issueName: string;

  @Field({ nullable: true })
  tag: string;

  @Field({ nullable: true })
  issue: string;

  user: string;
}

@InputType()
export class issuesInfoInput {
  @Field({ nullable: true })
  id: string;

  @IsNumber()
  @Field()
  limit: number;
}
