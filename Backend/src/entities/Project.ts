/** @format */

import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  uniqueid: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ length: 2000 })
  definition: string;

  @Field()
  @Column()
  formLink: string;

  @Field()
  @Column()
  tag: string;

  @Field(() => [String], { nullable: true })
  @Column("varchar", { array: true, nullable: true })
  techStack: String[];

  @Column()
  ownerId: String;

  @Field(() => User)
  projectOwner: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
