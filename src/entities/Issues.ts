/** @format */

import { ObjectType, Field } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
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

  @Field(() => [String])
  @Column("simple-json")
  answers: {
    writtenBy: string;
    answer: string;
  };

  @Column()
  ownerId: string;

  @Field(() => User)
  issueOwner: User | undefined;
}
