import * as React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  subtitle,
  header,
  subHeader,
  home,
  linkTo,
  projects,
  project,
  info,
  flair,
  contactOptions,
  cLogo,
} from "../pages/content.module.scss";
import li from "../assets/logos/linked.svg";
import re from "../assets/logos/resume.svg";
import gh from "../assets/logos/github.svg";

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
      "How's your day?",
      "How's your morning?",
      "How's your evening?",
      "How's your afternoon?",
      "Hey there!",
    ];

    let r = Math.floor(Math.random() * g.length);
    let randomGreeting = g[r];

    return (
      <h2 className={subHeader}>
        <span className={flair}>{randomGreeting}</span>
      </h2>
    );
  };

  return (
    <Layout>
      <div className={home}>
        <div className={header}>
          <Greeting />
          <div className={subHeader}>
            <span className={subtitle}>I'm Marco Ramirez.</span>
          </div>
          <div className={subHeader}>
            <span className={subtitle}>
              <span className={flair}>Web Developer</span>
              {" and "}
              <span className={flair}>Rock Climber</span>.
            </span>
          </div>
          <div className={contactOptions}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://linkedin.com/in/marcoramirez001"
            >
              <img className={cLogo} src={li} alt="LinkedIn" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://drive.google.com/file/d/1Y-JSXySkv6h4fxEzfzRYDLSKMMXPSom4/view?usp=sharing"
            >
              <img className={cLogo} src={re} alt="resume" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/mramirez0610"
            >
              <img className={cLogo} src={gh} alt="Github" />
            </a>
          </div>
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
