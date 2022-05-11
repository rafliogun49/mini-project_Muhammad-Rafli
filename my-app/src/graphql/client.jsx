import {ApolloClient, InMemoryCache} from "@apollo/client";
import {split, HttpLink} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";

const httpLink = new HttpLink({
  uri: "https://kanban-board.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "60bmkqoiYLqDH4SNZq0QeN3OK6jw5KaBVlmJUR5sf9rPeD2e5HGNr71NTo0NpE7K",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://kanban-board.hasura.app/v1/graphql",
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": "60bmkqoiYLqDH4SNZq0QeN3OK6jw5KaBVlmJUR5sf9rPeD2e5HGNr71NTo0NpE7K",
      },
    },
  })
);

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
