import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema:
    "https://raw.githubusercontent.com/codebases-dev/api/main/graphql/schema.graphql",
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
