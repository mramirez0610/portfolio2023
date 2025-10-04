import * as React from "react";
import * as styles from "@styles/pages/climbing/cEntry.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ClimbingLayout from "@components/climbing/climbingLayout";
import Markdown from "react-markdown";

export default function Entry({ pageContext }) {
  const { frontmatter, body } = pageContext;
  console.log(frontmatter.images);

  return (
    <>
      <ClimbingLayout>
        <div className={styles.entry}>
          <GatsbyImage
            image={getImage(frontmatter.image)}
            alt={frontmatter.title}
          />
          <section className={styles.frontmatter}>
            <h5 className={styles.date}>{frontmatter.date}</h5>
            <div className={styles.keywords}>
              {frontmatter.keywords.map((keyword, index) => (
                <div className={styles.keyword} key={index}>
                  {keyword}
                </div>
              ))}
            </div>
          </section>
          {/* {frontmatter.images.map((image, index) => (
            <GatsbyImage
              key={index}
              image={getImage(image)}
              alt={`${frontmatter.title} - ${index + 1}`}
            />
          ))} */}

          <Markdown>{body}</Markdown>
        </div>
      </ClimbingLayout>
    </>
  );
}
