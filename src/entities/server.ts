/** @format */

import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Server extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id: string;

  @Field()
  @Column({ unique: true })
  server_name: string;

  @Field()
  @Column({ length: 2000 })
  description: string;

  @Field()
  @Column()
  logoLink: string;

  @Field(() => [String], { nullable: true })
  @Column("varchar", { array: true, nullable: true })
  usersJoined: String[];

  @Field(() => Boolean)
  @Column()
  showCase: boolean;

  @Field()
  @Column()
  ownerId: string;

  @Field(() => User)
  owner: User;
}
