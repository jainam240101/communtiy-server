/** @format */

import { Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { User } from "src/entities/User";

@InputType()
export class createUserInput {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 16)
  password: string;

  @Field()
  enrollment: string;

  @Field()
  @Length(1, 1000)
  description: string;
}

@InputType()
export class loginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 16)
  password: string;
}

@InputType()
export class updateUserInput {
  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  @Length(1, 1000)
  description: string;

  user:User
}
