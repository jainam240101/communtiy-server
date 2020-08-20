/** @format */

import { InputType, Field } from "type-graphql";
import { Length, IsNumber, IsArray } from "class-validator";

@InputType()
export class createProjectInput {
  @Field()
  @Length(1, 2000)
  definition: string;

  @Field()
  @IsNumber()
  totalMembers: number;

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
  @Length(1, 2000)
  definition: string;
  
  @Field({ nullable: true })
  @IsNumber()
  totalMembers: number;
  
  @Field(() => [String], { nullable: true })
  @IsArray()
  techStack: String[];
  
  user: string;
}

@InputType()
export class deleteProjectInput{
  @Field({ nullable: false })
  uniqueid: string;
  
  user: string;
}

@InputType()
export class projectInfo{
  @Field({ nullable: true })
  id:string
}