/** @format */

import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { Server } from "./server";
import { Message } from "./messages";

@ObjectType()
@Entity()
export class channels extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id: string;

  @Field()
  @Column()
  serverId: string;

  @Field()
  @Column()
  channelName: string;

  @Field()
  @Column({ length: 2000 })
  description: string;

  @Field(() => [Message], { nullable: true })
  @Column({ type: "simple-json" })
  message: { Message: Message[] };

  @Field({ nullable: true })
  server: Server;
}
