import * as React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "@styles/pages/climbing/cEntries.module.scss";

export default function Entries({ data }) {
  return (
    <section className={styles.entriesPage}>
      <h2>my entries</h2>
      <div className={styles.entries}>
        {data.allMdx.nodes.map((node) => (
          <Link
            className={styles.entry}
            key={node.id}
            to={`/climbing/entries/${node.frontmatter.slug}`}
          >
            <GatsbyImage
              image={getImage(node.frontmatter.image)}
              className={styles.image}
              alt={node.frontmatter.title}
            />

            <div className={styles.link}>
              <div className={styles.date}>{node.frontmatter.date}</div>
              <div className={styles.title}>{node.frontmatter.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
