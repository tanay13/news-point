import { extendType, objectType } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

// objectType is used to create new type in our GraphQL schema
export const Link = objectType({
  name: "Link",
  //used to bind a field to a specific type
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
  },
});

//hardcoding the links value of array of NexusGenObjects["Link"] type
let links: NexusGenObjects["Link"][] = [
  {
    id: 1,
    url: "www.github.com",
    description: "View all amazing repos",
  },
  {
    id: 2,
    url: "www.instagram.com",
    description: "Connect with different people",
  },
];

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      // 3
      type: "Link",
      resolve(parent, args, context, info) {
        // 4
        return links;
      },
    });
  },
});
