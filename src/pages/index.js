import * as React from "react";
import { useState, useEffect } from "react";
import { graphql } from "gatsby";
import * as styles from "@styles/pages/content.module.scss";
import li from "@assets/logos/linked.svg";
import re from "@assets/logos/resume.svg";
import gh from "@assets/logos/github.svg";
import Projects from "@components/projects";
import Layout from "@components/layout";
import Seo from "@components/seo";

const IndexPage = ({ data }) => {
  /*   const Greeting = () => {
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
      "Hey there!",
    ];

    let r = Math.floor(Math.random() * g.length);
    let randomGreeting = g[r];

    return (
      <h2 className={styles.subHeader}>
        <span className={styles.flair}>{randomGreeting}</span>
      </h2>
    );
  }; */
  const Greeting = () => {
    const [randomGreeting, setRandomGreeting] = useState("");

    useEffect(() => {
      const greetings = [
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
        "Hey there!",
      ];

      const randomIndex = Math.floor(Math.random() * greetings.length);
      setRandomGreeting(greetings[randomIndex]);
    }, []);

    return (
      <h2 className={styles.subHeader}>
        <span className={styles.flair}>{randomGreeting}</span>
      </h2>
    );
  };

  return (
    <Layout>
      <div className={styles.home}>
        <div className={styles.header}>
          <Greeting />
          <div className={styles.subHeader}>
            <span className={styles.subtitle}>I'm Marco Ramirez.</span>
          </div>
          <div className={styles.subHeader}>
            <span className={styles.subtitle}>
              Web Developer
              <span className={styles.flair}> and </span>
              Rock Climber.
            </span>
          </div>
          <div className={styles.contactOptions}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://drive.google.com/file/d/1Y-JSXySkv6h4fxEzfzRYDLSKMMXPSom4/view?usp=sharing"
            >
              <img className={styles.cLogo} src={re} alt="resume" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://linkedin.com/in/marcoramirez001"
            >
              <img className={styles.cLogo} src={li} alt="LinkedIn" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/mramirez0610"
            >
              <img className={styles.cLogo} src={gh} alt="Github" />
            </a>
          </div>
        </div>
      </div>

      <Projects data={data} />
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
              gatsbyImageData(layout: FIXED, width: 250)
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
