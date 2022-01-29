import { User } from "@prisma/client";
import { objectType, extendType, nonNull, intArg } from "nexus";

export const Vote = objectType({
  name: "Vote",
  definition(t) {
    t.nonNull.field("link", { type: "Link" });
    t.nonNull.field("user", { type: "User" });
  },
});

export const VoteMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("vote", {
      type: "Vote",
      args: {
        linkId: nonNull(intArg()),
      },
      async resolve(parent, args, context) {
        const { userId } = context;
        const { linkId } = args;
        if (!userId) {
          throw new Error("You need to Login first to vote");
        }
        const link = await context.prisma.link.update({
          where: {
            id: linkId,
          },
          data: {
            voters: {
              connect: {
                id: userId,
              },
            },
          },
        });

        const user = await context.prisma.user.findUnique({
          where: { id: userId },
        });

        return {
          link,
          user: user as User, //The typecasting (user as User) is necessary as the type returned by prisma.user.findUnique is User | null, whereas the type expected from the resolve function is User.
        };
      },
    });
  },
});
