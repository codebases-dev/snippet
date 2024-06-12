import type { CodegenConfig } from "@graphql-codegen/cli";

if (!process.env.GRAPHQL_SCHEMA_PATH) {
  throw new Error("`GRAPHQL_SCHEMA_PATH` is not set");
}

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_SCHEMA_PATH,
  documents: "app/**/*.graphql",
  generates: {
    "app/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
