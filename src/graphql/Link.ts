import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

// objectType is used to create new type in our GraphQL schema
export const Link = objectType({
  name: "Link",
  //used to bind a field to a specific type
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
    t.field("postedBy", {
      type: "User",
      resolve(parent, args, context) {
        return context.prisma.link
          .findUnique({ where: { id: parent.id } })
          .postedBy(); //Fluent API
      },
    });
  },
});

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Link",
      resolve(parent, args, context, info) {
        return context.prisma.link.findMany();
      },
    });
  },
});

//prisma queries return Promise Objects but Apollo Server detects and automatically resolve any Promise object that is returned from resolver functions

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
        const newLink = context.prisma.link.create({
          data: {
            description,
            url,
          },
        });
        return newLink;
      },
    });
    // t.nonNull.field("updatePost", {
    //   type: "Link",
    //   args: {
    //     id: nonNull(intArg()),
    //     description: nonNull(stringArg()),
    //     url: nonNull(stringArg()),
    //   },

    //   resolve(parent, args, context) {

    //   },
    // });
  },
});
