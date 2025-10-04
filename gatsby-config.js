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
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-purgecss",
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `projects`,
        path: `${__dirname}/src/content/projs`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `climbing`,
        path: `${__dirname}/src/content/climbing`,
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
      resolve: "gatsby-source-filesystem",
      options: {
        name: `climbing-images`,
        path: `${__dirname}/src/content/climbing`,
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
