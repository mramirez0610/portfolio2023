import * as React from "react";
import * as styles from "@styles/pages/climbing/cEntry.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ClimbingLayout from "@components/climbing/climbingLayout";
import Markdown from "react-markdown";

export default function Entry({ pageContext }) {
  const { frontmatter, body } = pageContext;

  return (
    <>
      <ClimbingLayout>
        <div className={styles.entry}>
          <div className={styles.frontmatter}></div>
          <h5>{frontmatter.date}</h5>
          <GatsbyImage
            image={getImage(frontmatter.image)}
            alt={frontmatter.title}
          />
          <Markdown>{body}</Markdown>
        </div>
      </ClimbingLayout>
    </>
  );
}
