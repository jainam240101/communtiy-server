/** @format */

import { ObjectType, Field, ID } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class IssueAnswers extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  issueId: string;

  @Field()
  @Column({ length: 2000 })
  answer: string;

  @Field()
  @Column()
  answeredBy: string;

  @Field()
  answerOwner: User;
}
