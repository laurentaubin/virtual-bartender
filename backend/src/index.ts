import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { HealthCheckResolver } from "./api/resolvers/HealthCheckResolver";

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HealthCheckResolver]
    })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000),
    () => {
      console.log("server started on localhost:4000");
    };
};

main().catch((err) => {
  console.error(err);
});
