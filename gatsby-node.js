const path = require("path");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const projectResult = await graphql(`
    {
      allMdx(
        filter: {
          internal: { contentFilePath: { regex: "/src/content/projs/" } }
        }
      ) {
        nodes {
          id
          body
          frontmatter {
            slug
            title
            date(formatString: "MMMM DD, YYYY")
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 600)
              }
            }
            url
            github
            tech
          }
        }
      }
    }
  `);

  projectResult.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: `/projects/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/project-template.js"),
      context: {
        id: node.id,
        frontmatter: node.frontmatter,
        body: node.body,
      },
    });
  });

  const climbingResult = await graphql(`
    {
      allMdx(
        filter: {
          internal: { contentFilePath: { regex: "/src/content/climbing/" } }
        }
      ) {
        nodes {
          id
          body
          frontmatter {
            slug
            title
            date(formatString: "MM-DD-YYYY")
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 600)
              }
            }
            category
            keywords
            images {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 600)
              }
            }
          }
        }
      }
    }
  `);

  climbingResult.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: `/climbing/entries/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/climbing-entry-template.js"),
      context: {
        id: node.id,
        frontmatter: node.frontmatter,
        body: node.body,
      },
    });
  });
};
