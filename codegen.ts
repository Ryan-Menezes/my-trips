
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api-sa-east-1.hygraph.com/v2/clgwin5fa04r901um2n0bazc1/master",
  documents: "src/graphql/queries.ts",
  generates: {
    "src/graphql/generated/": {
      preset: "client",
      plugins: [
        {
          add: {
            content: "/* eslint-disable */"
          }
        }
      ]
    }
  }
};

export default config;
