import { ApolloServer, gql } from "apollo-server-lambda";
import axios from "axios";
import flag from "country-code-emoji";

const apiUrl = "https://games.crossfit.com/competitions/api/v1";

const typeDefs = gql`
  type Query {
    athletes(name: String!): [Athlete]
    athlete(id: String!): Athlete
  }

  type Athlete {
    id: ID!
    name: String
    affiliate: String
    photo: String
    country: String
    countryEmoji: String
  }
`;

const resolvers = {
  Query: {
    athletes: async (parent, args, context) => {
      const { data } = await axios.get(
        `${apiUrl}/competitions/open/2020/athletes?term=${args.name}`
      );
      return data;
    },
    athlete: async (parent, { id }, context) => {
      const { data } = await axios.get(`${apiUrl}/athlete/${id}`);
      return {
        id: data.competitorId,
        name: data.competitorName,
        affiliate: data.affiliateName
      };
    }
  },
  Athlete: {
    photo: async ({ id }, args, context) => {
      const { data } = await axios.get(`${apiUrl}/athlete/${id}`);
      return data.profilePicS3key;
    },
    country: async ({ id }, args, context) => {
      const { data } = await axios.get(`${apiUrl}/athlete/${id}`);
      return data.countryId;
    },
    countryEmoji: async ({ id }, args, context) => {
      const { data } = await axios.get(`${apiUrl}/athlete/${id}`);
      return flag(data.countryId);
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
