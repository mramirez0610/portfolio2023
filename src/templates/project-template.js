import * as React from "react";
import { Link } from "gatsby";
import Markdown from "react-markdown";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "@styles/pages/projectInfo/projectInfo.module.scss";
import gh from "@assets/logos/github.svg";
import ls from "@assets/logos/internet.svg";
import Layout from "@components/layout";
import Seo from "@components/seo";

// const MDXStyling = (props) => <li style={{ marginLeft: "3%" }} {...props} />;

const ProjectTemplate = ({ pageContext }) => {
  const { frontmatter, body } = pageContext;
  const image = getImage(frontmatter.image);

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
            {/* i just had, arguably, the worst experience with gatsby, ever, while refactoring this.
            so since gatsby v4 & 5, MDXRenderer no longer works. that's okay, MDXProvider works right?

            WRONG! use useMDXComponent, which was included in gatsby v5. i just wrap it, and everything will work.
            JUST KIDDING! HAHA!!! IT DOESNT WORK!
            
            okay. since gatsby 5, children is supposed to be automatically exported alongside your pageContext, cool!
            WRONG AGAIN! IT DOESNT EXPORT! so i would just get body as flat text, and then throw that into my MDXProvider...
            right?

            NOPE! YOU SUCK! ITS STILL FLAT TEXT HAHA! okay... im just going to download React Markdown. who would've guessed that 
            it works first try. 
            
            god im never using this dead framework ever again. i will rebuild this in astro one day.

            <MDXProvider components={{ li: MDXStyling }}>
              <div>{body}</div>
            </MDXProvider> */}

            <Markdown>{body}</Markdown>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const Head = ({ pageContext }) => (
  <Seo title={pageContext.frontmatter.title} />
);

export default ProjectTemplate;
