import * as React from "react";
import { graphql } from "gatsby";
import * as styles from "@styles/pages/climbing/cEntry.module.scss";
import ClimbingLayout from "@components/climbing/climbingLayout";

export default function Entry({ data, children }) {
  const { frontmatter } = data.mdx;
  console.log(frontmatter.image);
  console.log(data);

  return (
    <>
      <ClimbingLayout>
        <div className={styles.entry}>
          <div className={styles.frontmatter}></div>
          <h5>{frontmatter.date}</h5>
          <div>{children}</div>
        </div>
      </ClimbingLayout>
    </>
  );
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MM-DD-YYYY")
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 600)
          }
        }
        category
        keywords
      }
    }
  }
`;
