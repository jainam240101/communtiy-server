/** @format */

import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
} from "typeorm";
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

  @Column()
  answeredBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @Field()
  answerOwner: User;
}
