import * as React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  subtitle,
  greeting,
  subHeader,
  home,
  linkTo,
  projects,
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
          <span className={subtitle}>I'm Marco Ramirez.</span>
        </div>
        <div className={subHeader}>
          <span className={subtitle}>
            Avid <span className={flair}>Web Developer</span>,{" "}
            <span className={flair}>Rock Climber</span>, and{" "}
            <span className={flair}>Student</span>.
          </span>
        </div>

        <div className={projects}>
          {data.allMdx.nodes.map((node) => (
            <Link
              className={project}
              key={node.id}
              to={`/projects/${node.frontmatter.slug}`}
            >
              <GatsbyImage
                image={getImage(node.frontmatter.image)}
              ></GatsbyImage>
              <div className={info}>
                <h3>
                  <Link
                    to={`/projects/${node.frontmatter.slug}`}
                    className={linkTo}
                  >
                    {node.frontmatter.title}
                  </Link>
                </h3>
              </div>
            </Link>
          ))}
        </div>
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
              gatsbyImageData(layout: FIXED, width: 300)
            }
          }
        }
        id
        excerpt(pruneLength: 250)
      }
    }
  }
`;

export default IndexPage;

export const Head = () => <Seo title="Home" />;
