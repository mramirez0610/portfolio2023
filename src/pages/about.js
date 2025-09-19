import * as React from "react";
import { Link } from "gatsby";
import * as styles from "@styles/pages/content.module.scss";
import Layout from "@components/layout";
import Seo from "@components/seo";
import li from "@assets/logos/linked.svg";
import re from "@assets/logos/resume.svg";
import gh from "@assets/logos/github.svg";

const AboutPage = () => {
  return (
    <Layout>
      <div className={styles.contact}>
        <h1 className={styles.flair}>About Me!</h1>
        <p>
          I'm Marco Ramirez, a dedicated web developer with a passion for
          creating intuitive and dynamic web experiences. Rock climbing and web
          development are my two biggest passions, and I'm looking for a life
          where I can happily do both.
        </p>

        <p>
          I'm comfortable with a variety of technologies, the most notable being
          Javascript (along with frameworks), Firebase, and NoSQL. I'm also
          familiar with the basics of Node.js, GraphQL, and MySQL. I'm always
          looking to learn more, and I'm always looking for new opportunities to
          grow as a developer. Feel free to{" "}
          <Link
            className={styles.linkTo}
            target="_blank"
            rel="noreferrer"
            to="https://linkedin.com/in/marcoramirez001"
          >
            reach out
          </Link>{" "}
          if you have any questions or if you'd like to work together.
        </p>

        <div className={styles.subHeader}>
          <h3 className={styles.flair} style={{ fontSize: "1.4em" }}>
            Shoot me a message!
          </h3>
        </div>
        <p>
          I'm currently looking for a full-time position as a front-end
          developer. I'm also open to freelance work, so if you have a project
          you'd like to work on, feel free to reach out!
        </p>
        <p>
          If you have any questions or inquiries, feel free to contact me via
          LinkedIn or email. I've also included my Github below, if you'd like
          to see other projects I'm working on. Feel free to get in touch!
        </p>

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
    </Layout>
  );
};

export default AboutPage;

export const Head = () => <Seo title="About Me" />;
