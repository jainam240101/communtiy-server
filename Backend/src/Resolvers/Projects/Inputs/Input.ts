/** @format */

import { InputType, Field } from "type-graphql";
import { Length, IsArray, IsNumber, IsString } from "class-validator";

@InputType()
export class createProjectInput {
  @Field()
  @Length(1, 2000)
  definition: string;

  @Field()
  formLink: string;

  @Field()
  title: string;

  @Field()
  tag: string;

  @Field(() => [String])
  @IsArray()
  techStack: String[];

  user: string;
}

@InputType()
export class updateProjectInput {
  @Field({ nullable: false })
  uniqueid: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  @Length(1, 2000)
  definition: string;

  @Field({ nullable: true })
  formLink: string;

  @Field({ nullable: true })
  tag: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  techStack: String[];

  user: string;
}

@InputType()
export class deleteProjectInput {
  @Field({ nullable: false })
  uniqueid: string;

  user: string;
}

@InputType()
export class projectInfo {
  @Field({ nullable: true })
  id: string;

  @IsNumber()
  @Field({ nullable: true })
  limit: number;
}

@InputType()
export class tagInput {
  @IsString()
  @Field({ nullable: true })
  tag: string;

  @IsString()
  @Field({ nullable: true })
  techStack: string;
}
