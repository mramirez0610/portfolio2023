const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Query for projects
  const projectResult = await graphql(`
    {
      allMdx(
        filter: {
          internal: { contentFilePath: { regex: "/src/content/projs/" } }
        }
      ) {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  projectResult.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: `/projects/${node.frontmatter.slug}`,
      component: path.resolve(
        "./src/pages/projects/{mdx.frontmatter__slug}.js"
      ),
      context: { id: node.id },
    });
  });

  // Query for climbing entries
  const climbingResult = await graphql(`
    {
      allMdx(
        filter: {
          internal: { contentFilePath: { regex: "/src/content/climbing/" } }
        }
      ) {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  climbingResult.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: `/climbing/${node.frontmatter.slug}`,
      component: path.resolve(
        "./src/pages/climbing/entries/{mdx.frontmatter__slug}.js"
      ),
      context: { id: node.id },
    });
  });
};
