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
});
