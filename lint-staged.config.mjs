export default {
  '*.{js,jsx,ts,tsx,mjs,cjs}': ['eslint --fix', 'prettier --write'],

  '*.{json,css,scss,md,mdx,html,yml,yaml,graphql,gql}': 'prettier --write',
};
