/** @format */

import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express, { Application } from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { UserResolver } from "./Resolvers/Users/users";
import { ProjectResolver } from "./Resolvers/Projects/Project";

const main = async () => {
  await createConnection();
  const schema = await buildSchema({ resolvers: [UserResolver,ProjectResolver] });
  const apolloserver = new ApolloServer({
    schema: schema,
    context: ({ req }: any) => ({ req }),
  });
  const app: Application = Express();
  apolloserver.applyMiddleware({ app });
  app.listen(3000, () => {
    console.log("Server up on port 3000");
  });
};

main();
