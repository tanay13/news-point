import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql";

//creating files for writing schema and specifying types
export const schema = makeSchema({
  types,
  outputs: {
    schema: join(__dirname, "..", "schema.graphql"),
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
  },
  contextType: {
    module: join(__dirname, "./context.ts"), // path to the file where context interface is present
    export: "Context", //exported interface name
  },
});
