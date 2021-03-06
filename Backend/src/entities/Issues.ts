/** @format */

import { ObjectType, Field } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";
import { IssueAnswers } from "./IssueAnswers";
import { User } from "./User";

@ObjectType()
@Entity()
export class Issue extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  uniqueid: string;

  @Field()
  @Column()
  issueName: string;

  @Field()
  @Column({ length: 2000 })
  issue: string;

  @Field()
  @Column()
  tag: string;

  @Column()
  ownerId: string;

  @Field(() => User)
  issueOwner: User | undefined;

  @CreateDateColumn()
  @Field()
  createdAt: Date
  
  @Field(() => [IssueAnswers])
  issueAnswers:[IssueAnswers]
}
