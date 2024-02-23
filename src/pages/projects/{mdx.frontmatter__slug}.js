import * as React from "react";
import { Link, graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const MDXStyling = (props) => <li style={{ marginLeft: "5%" }} {...props} />;

const Project = ({ data, children }) => {
  const image = getImage(data.mdx.frontmatter.image);
  const { frontmatter, body } = data.mdx;

  return (
    <Layout pageTitle="Project Description">
      <Link to="/">Back to projects</Link>
      <p>{data.mdx.frontmatter.date}</p>
      <GatsbyImage image={image} alt="Keurig Recreation" />
      <MDXProvider components={{ li: MDXStyling }}>{children}</MDXProvider>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        image {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 300)
          }
        }
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />;

export default Project;
