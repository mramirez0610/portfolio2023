import * as React from "react";
import { Link, graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { projectDetails, flair, details, info } from "../content.module.scss";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const MDXStyling = (props) => <li style={{ marginLeft: "3%" }} {...props} />;

const Project = ({ data, children }) => {
  const image = getImage(data.mdx.frontmatter.image);
  const { frontmatter, body } = data.mdx;

  return (
    <Layout pageTitle="Project Description">
      <div className={projectDetails}>
        <Link className={flair} to="/">
          Back to projects
        </Link>

        <div className={details}>
          <GatsbyImage image={image} alt="Project Photo" />

          <div className={info}>
            <MDXProvider components={{ li: MDXStyling }}>
              {children}
            </MDXProvider>
          </div>
        </div>
      </div>
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
            gatsbyImageData(layout: FIXED, width: 600)
          }
        }
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />;

export default Project;
