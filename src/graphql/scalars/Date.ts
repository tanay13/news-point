import { asNexusMethod } from "nexus";
import { GraphQLDateTime } from "graphql-scalars";

// asNexusMethod - allows to expose a custom scalar as a Nexus type
export const GQLDate = asNexusMethod(GraphQLDateTime, "dateTime");
