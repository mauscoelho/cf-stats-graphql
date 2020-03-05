import { ApolloServer, gql } from "apollo-server-lambda";
import axios from "axios";

const apiUrl = "https://games.crossfit.com/competitions/api/v1";

const typeDefs = gql`
  type Query {
    athletes(name: String!): [Athlete]
  }

  type Athlete {
    id: ID!
    name: String
    affiliate: String
  }
`;

const resolvers = {
  Query: {
    athletes: async (parent, args, context) => {
      const { data } = await axios.get(
        `${apiUrl}/competitions/open/2020/athletes?term=${args.name}`
      );
      return data;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
