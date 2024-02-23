import * as React from "react";
import { Link } from "gatsby";
import {
  contact,
  contactOptions,
  cLogo,
  subHeader,
  linkTo,
} from "../pages/content.module.scss";
import Layout from "../components/layout";
import Seo from "../components/seo";
import li from "../assets/logos/linked.svg";
import ma from "../assets/logos/mail.svg";
import gh from "../assets/logos/github.svg";

const AboutPage = () => {
  return (
    <Layout>
      <h1>About Me!</h1>
      <p>
        Hello! I'm Marco Ramirez, and I am currently a senior attending Indiana
        University Indianapolis (IUI). I'm majoring in Media Arts and Science,
        and specializing in Web Design & Development.
      </p>

      <p>
        I'm comfortable with a variety of technologies, the most notable being
        Javascript (along with frameworks), Firebase, and NoSQL. I'm also
        familiar with the basics of Node.js, GraphQL, and MySQL. I'm always
        looking to learn more, and I'm always looking for new opportunities to
        grow as a developer. Feel free to{" "}
        <Link className={linkTo} to="https://linkedin.com/in/marcoramirez001">
          reach out
        </Link>{" "}
        if you have any questions or if you'd like to work together.
      </p>
      <div className={contact}>
        <div className={subHeader}>
          <h3 style={{ fontSize: "1.4em" }}>Shoot me a message!</h3>
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

        <div className={contactOptions}>
          <a href="https://linkedin.com/in/marcoramirez001">
            <img className={cLogo} src={li} alt="LinkedIn" />
          </a>
          <a href="mailto:marcoramirezmail@gmail.com">
            <img className={cLogo} src={ma} alt="mail" />
          </a>
          <a href="https://github.com/mramirez0610">
            <img className={cLogo} src={gh} alt="Github" />
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const Head = () => <Seo title="About" />;