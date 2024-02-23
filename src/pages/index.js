import * as React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  subtitle,
  greeting,
  subHeader,
  seperator,
  home,
  linkTo,
  project,
  info,
  flair,
} from "../pages/content.module.scss";
import Layout from "../components/layout";
import Seo from "../components/seo";

const IndexPage = ({ data }) => {
  const Greeting = () => {
    let g = [
      "Hello!",
      "Nice to see you!",
      "Welcome!",
      "Good morning!",
      "Good afternoon!",
      "Good evening!",
      "How's it going?",
      "How are you?",
      "How's your day?",
      "How's your morning?",
      "How's your evening?",
    ];

    let r = Math.floor(Math.random() * g.length);
    let randomGreeting = g[r];

    return <h2 className={greeting}>{randomGreeting}</h2>;
  };

  return (
    <Layout>
      <div className={home}>
        <Greeting />
        <div className={subHeader}>
          <span className={subtitle}>i'm marco ramirez</span>
          <span className={seperator}>||</span>
          <span className={subtitle}>
            an avid <span className={flair}>web developer</span>,{" "}
            <span className={flair}>rock climber</span>, and{" "}
            <span className={flair}>student</span>.
          </span>
        </div>

        {data.allMdx.nodes.map((node) => (
          <article className={project} key={node.id}>
            <GatsbyImage image={getImage(node.frontmatter.image)}></GatsbyImage>
            <div className={info}>
              <h3>
                <Link
                  to={`/projects/${node.frontmatter.slug}`}
                  className={linkTo}
                >
                  {node.frontmatter.title}
                </Link>
              </h3>
              <p>{node.excerpt}</p>
              <p>Posted: {node.frontmatter.date}</p>
            </div>
          </article>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
          image {
            childImageSharp {
              gatsbyImageData(layout: FIXED, width: 400)
            }
          }
        }
        id
        excerpt
      }
    }
  }
`;

export default IndexPage;

export const Head = () => <Seo title="Home" />;
