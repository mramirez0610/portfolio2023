import * as React from "react";
import { graphql, Link } from "gatsby";
import {
  subtitle,
  subHeader,
  seperator,
  tech,
  techLogo,
  home,
} from "../pages/content.module.scss";
import Layout from "../components/layout";
import Seo from "../components/seo";
import fb from "../assets/logos/firebase.svg";
import gql from "../assets/logos/graphql.svg";
import js from "../assets/logos/js.svg";
import r from "../assets/logos/react.svg";
import sass from "../assets/logos/sass.svg";

const IndexPage = ({ data }) => {
  const Greeting = () => {
    let g = [
      "hello!",
      "nice to see you!",
      "welcome!",
      "good morning!",
      "good afternoon!",
      "good evening!",
      "how's it going?",
      "how are you?",
      "how's your day?",
      "how's your morning?",
      "how's your evening?",
    ];

    let r = Math.floor(Math.random() * g.length);
    let randomGreeting = g[r];

    return <h2>{randomGreeting}</h2>;
  };

  return (
    <Layout>
      <div className={home}>
        <Greeting />
        <div className={subHeader}>
          <span className={subtitle}>i'm marco ramirez</span>
          <span className={seperator}>||</span>
          <Link className={subtitle} to="/projects">
            skip to the projects!
          </Link>
        </div>

        <p>
          Hello! I'm Marco Ramirez, and I am currently a senior attending
          Indiana University Indianapolis (what used to be IUPUI). I'm majoring
          in Media Arts and Science, and specializing in Web Design &
          Development.
        </p>
        <p>
          My first experience with web development was back in high school, when
          I started to mess around with the source code of websites that I
          frequented. I remember viewing a javascript file using the sources
          tab, and then I remember being the most confused I had ever been. From
          that point on, I was enamored with the concept of web design.
        </p>
        <p>
          I'm comfortable with a variety of technologies, the most notable being
          Javascript (along with frameworks), Firebase, and NoSQL. I'm also
          familiar with the basics of Node.js, GraphQL, and MySQL. I'm always
          looking to learn more, and I'm always looking for new opportunities to
          grow as a developer. Feel free to <Link to="/contact">reach out</Link>{" "}
          if you have any questions or if you'd like to work together!
        </p>
        <div className={tech}>
          <img className={techLogo} src={fb} alt="Firebase" />
          <img className={techLogo} src={gql} alt="GraphQL" />
          <img className={techLogo} src={js} alt="JS" />
          <img className={techLogo} src={r} alt="React" />
          <img className={techLogo} src={sass} alt="Sass" />
        </div>
        <p></p>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "YYYY MMMM Do")
          title
        }
        id
        excerpt
      }
    }
  }
`;

export default IndexPage;

export const Head = () => <Seo title="Home" />;
