import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
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
      type: "Link",
      resolve(parent, args, context, info) {
        return links;
      },
    });
  },
});

export const LinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },

      resolve(parent, args, context) {
        const { description, url } = args;

        let idCount = links.length + 1;
        const link = {
          id: idCount,
          description: args.description,
          url: args.url,
        };
        links.push(link);
        return link;
      },
    });
    t.nonNull.field("updatePost", {
      type: "Link",
      args: {
        id: nonNull(intArg()),
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },

      resolve(parent, args, context) {
        const { id, description, url } = args;

        links[id - 1].description = description;
        links[id - 1].url = url;
        return links[id - 1];
      },
    });
  },
});
