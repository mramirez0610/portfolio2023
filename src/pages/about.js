import * as React from "react";
import { graphql } from "gatsby";
import { useState, useEffect } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "@styles/pages/about/about.module.scss";
import Layout from "@components/layout";
import Seo from "@components/seo";
import li from "@assets/logos/linked.svg";
import re from "@assets/logos/resume.svg";
import gh from "@assets/logos/github.svg";
import SpotifyWidget from "../components/home/spotifyWidget";

const AboutPage = ({ data }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [count, setCount] = useState(0);

  const photos = [getImage(data.photo1), getImage(data.photo2)];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentPhoto((prev) => (prev + 1) % photos.length);
  //   }, 6000);
  //   return () => clearInterval(interval);
  // }, [photos.length]);

  const Slideshow = () => (
    <GatsbyImage
      className={styles.image}
      image={photos[currentPhoto]}
      alt="Marco Ramirez Headshot"
    />
  );

  const SinglePhoto = () => (
    <GatsbyImage
      className={styles.image}
      image={photos[1]}
      alt="Marco Ramirez Headshot"
    />
  );

  const EasterEgg = () => (
    <GatsbyImage
      className={styles.image}
      image={getImage(data.photo3)}
      alt="ouchies"
    />
  );

  return (
    <Layout>
      <section className={styles.about}>
        <section className={styles.aboutMedia}>
          <div
            onClick={() => setCount((prev) => prev + 1)}
            className={styles.imgContainer}
          >
            {count < 8 ? <SinglePhoto /> : <EasterEgg />}
          </div>

          <div className={styles.spotifyWidget}>
            <SpotifyWidget />
          </div>
        </section>
        <article className={styles.aboutContact}>
          <h1 className={styles.flair}>About Me!</h1>
          <p>
            I'm Marco Ramirez, a dedicated web developer with a passion for
            creating intuitive and dynamic web experiences. Rock climbing and
            web development are my two biggest passions, and I'm looking for a
            life where I can happily do both.
          </p>

          <p>
            I'm comfortable with a variety of technologies, the most notable
            being Javascript (along with frameworks), Firebase, and NoSQL. I'm
            also familiar with the basics of Node.js, GraphQL, and MySQL. I'm
            always looking to learn more, and I'm always looking for new
            opportunities to grow as a developer. Feel free to{" "}
            <a
              className={styles.linkTo}
              target="_blank"
              rel="noreferrer"
              href="https://linkedin.com/in/marcoramirez001"
            >
              reach out
            </a>{" "}
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
        </article>
      </section>
    </Layout>
  );
};

export default AboutPage;

export const Head = () => <Seo title="About Me" />;

export const query = graphql`
  query {
    photo1: file(relativePath: { eq: "portfolio/about/photo1.JPG" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
    photo2: file(relativePath: { eq: "portfolio/about/photo2.JPG" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
    photo3: file(relativePath: { eq: "portfolio/about/photo3.jpeg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
  }
`;
