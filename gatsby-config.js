/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Marco Ramirez Portfolio`,
    siteUrl: `https://marcoramirez.dev`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-mdx",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-purgecss",
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/src/content/projs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/imgs`,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: `${__dirname}/src/assets/logos/logo.svg`,
        start_url: `/`,
        display: `standalone`,
      },
    },
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          "@": "src/",
          "@styles": "src/styles",
          "@components": "src/components",
          "@pages": "src/pages",
          "@assets": "src/assets",
        },
      },
    },
  ],
};
