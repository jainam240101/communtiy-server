/** @format */

import { ObjectType, Field } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Project } from "./Project";
import { Issue } from "./Issues";
import { IssueAnswers } from "./IssueAnswers";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  uniqueid: string;

  @Field()
  @Column()
  name: String;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column({ unique: true })
  enrollment: string;

  @Field()
  @Column({ length: 1000 })
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Field(() => [Project])
  ownedprojects: [Project]
  
  @Field(() => [Issue])
  ownedIssues:[Project]
  
  @Field(() => [IssueAnswers])
  issueAnswered:[Project]

}

@ObjectType()
export class UserLoginEntity {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  enrollment: string;

  @Field()
  description: string;

  @Field()
  token: string;
}
