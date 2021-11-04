import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { render } from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const BASE_URL = "localhost:3001";

const httpLink = new HttpLink({
  uri: `http://${BASE_URL}/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${BASE_URL}/subscriptions`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          donations: {
            keyArgs: false,
            /** merge cursor pagination donations*/
            merge: (existing, incoming) => ({
              items: [...(existing?.items || []), ...(incoming?.items || [])],
              cursor: incoming.cursor || null,
            }),
          },
        },
      },
    },
  }),
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals();
