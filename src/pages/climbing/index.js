import * as React from "react";
import Seo from "@components/seo";
import { graphql } from "gatsby";
import ClimbingLayout from "@components/climbing/climbingLayout";
import Entries from "@components/climbing/climbingEntries";

export default function ClimbingHome({ data }) {
  return (
    <ClimbingLayout>
      <Entries data={data} />
    </ClimbingLayout>
  );
}

export const query = graphql`
  query {
    allMdx(
      filter: {
        internal: { contentFilePath: { regex: "/src/content/climbing/" } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MM-DD-YYYY")
          title
          slug
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
        id
        excerpt(pruneLength: 250)
      }
    }
  }
`;

export const Head = () => (
  <Seo
    title="climbing journal"
    meta={[{ name: "robots", content: "noindex" }]}
  />
);
