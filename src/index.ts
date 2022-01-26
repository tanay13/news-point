import { ApolloError, ApolloServer } from "apollo-server";

import { schema } from "./schema";

export const server = new ApolloServer({
  schema,
});

server.listen(3000, () => {
  console.log("Server is up and running");
});
