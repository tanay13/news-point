import { ApolloError, ApolloServer } from "apollo-server";

import { schema } from "./schema";

import { context } from "./context";

export const server = new ApolloServer({
  schema,
  context,
});

server.listen(3000, () => {
  console.log("Server is up and running");
});
