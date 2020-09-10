/** @format */

import "reflect-metadata";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import Express, { Application } from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { UserResolver } from "./Resolvers/Users/users";
import { ProjectResolver } from "./Resolvers/Projects/Project";
import { IssueResolver } from "./Resolvers/Issues/Issues";
import { issueAnswer } from "./Resolvers/Answers/Answers";
import { serverResolver } from "./Resolvers/server/server";
import { ChannelResolver } from "./Resolvers/channel/channel";
import { messageResolver } from "./Resolvers/Messages/Messages";

const main = async () => {
  const port = 3000;
  await createConnection();
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ProjectResolver,
      IssueResolver,
      issueAnswer,
      serverResolver,
      ChannelResolver,
      messageResolver,
    ],
  });
  const apolloserver = new ApolloServer({
    schema: schema,
    playground: true,
    context: ({ req }: any) => ({ req }),
  });
  const app: Application = Express();
  apolloserver.applyMiddleware({ app });
  const httpServer = createServer(app);
  apolloserver.installSubscriptionHandlers(httpServer);
  httpServer.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${apolloserver.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${port}${apolloserver.subscriptionsPath}`
    );
  });
};

main();
