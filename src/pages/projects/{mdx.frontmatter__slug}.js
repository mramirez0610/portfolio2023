import * as React from "react";
import { Link, graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  projectDetails,
  flair,
  details,
  info,
  contactOptions,
  cLogo,
  left,
} from "../content.module.scss";
import gh from "../../assets/logos/github.svg";
import ls from "../../assets/logos/internet.svg";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const MDXStyling = (props) => <li style={{ marginLeft: "3%" }} {...props} />;

const Project = ({ data, children }) => {
  const image = getImage(data.mdx.frontmatter.image);
  const { frontmatter } = data.mdx;

  return (
    <Layout pageTitle="Project Description">
      <div className={projectDetails}>
        <Link className={flair} to="/">
          Back to projects
        </Link>

        <div className={details}>
          <div className={left}>
            <GatsbyImage image={image} className={image} alt="Project Photo" />
            <div className={contactOptions}>
              <a target="_blank" rel="noreferrer" href={frontmatter.url}>
                <img className={cLogo} src={ls} alt="live server" />
              </a>
              <a target="_blank" rel="noreferrer" href={frontmatter.github}>
                <img className={cLogo} src={gh} alt="github" />
              </a>
            </div>
          </div>

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
            gatsbyImageData(layout: CONSTRAINED, width: 600)
          }
        }
        url
        github
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />;

export default Project;
