import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { createContext } from "../context/authentication.mjs";
import resolvers from "../graphql/resolvers.mjs";
import typeDefs from "../graphql/schema.mjs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    context: createContext,
  });
  console.log(`🚀 Server ready at ${url}`);
};

startServer();
