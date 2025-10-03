import * as React from "react";
import { Link, graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "@styles/pages/projectInfo/projectInfo.module.scss";
import gh from "@assets/logos/github.svg";
import ls from "@assets/logos/internet.svg";
import Layout from "@components/layout";
import Seo from "@components/seo";

const MDXStyling = (props) => <li style={{ marginLeft: "3%" }} {...props} />;

const Project = ({ data, children }) => {
  const image = getImage(data.mdx.frontmatter.image);
  const { frontmatter } = data.mdx;

  return (
    <Layout>
      <div className={styles.projectInfo}>
        <Link className={styles.flair} to="/">
          Back to projects
        </Link>

        <div className={styles.details}>
          <div className={styles.left}>
            <GatsbyImage
              image={image}
              className={styles.image}
              alt="Project Photo"
            />
            <div className={styles.techContainer}>
              {frontmatter.tech?.map((t) => (
                <div className={styles.tech}>
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <div className={styles.contactOptions}>
              <a target="_blank" rel="noreferrer" href={frontmatter.url}>
                <img className={styles.cLogo} src={ls} alt="live server" />
              </a>
              <a target="_blank" rel="noreferrer" href={frontmatter.github}>
                <img className={styles.cLogo} src={gh} alt="github" />
              </a>
            </div>
          </div>

          <div className={styles.info}>
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
    mdx(
      id: { eq: $id }
      internal: { contentFilePath: { regex: "/src/content/projs/" } }
    ) {
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
        tech
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />;

export default Project;
