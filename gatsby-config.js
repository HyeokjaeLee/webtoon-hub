module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/layout.tsx`),
      },
    },
    `gatsby-plugin-sass`,
  ],
}
