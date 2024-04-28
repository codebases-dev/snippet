import { GraphQLClient } from "graphql-request";
import { getSdk, type Sdk } from "./generated/graphql";

let sdkCache: Sdk | undefined;

export function getGraphqlClient(apiUrl: string) {
  if (!sdkCache) {
    const client = new GraphQLClient(apiUrl);
    sdkCache = getSdk(client);
  }

  return sdkCache;
}
