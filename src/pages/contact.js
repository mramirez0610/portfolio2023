import * as React from "react";
import { contact, contactOptions, cLogo } from "../pages/content.module.scss";
import Layout from "../components/layout";
import Seo from "../components/seo";
import li from "../assets/logos/linked.svg";
import ma from "../assets/logos/mail.svg";
import gh from "../assets/logos/github.svg";

const ContactPage = () => {
  return (
    <Layout>
      <div className={contact}>
        <h2>Get in Contact with me</h2>
        <h3>Shoot me a message!</h3>
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

export default ContactPage;

export const Head = () => <Seo title="Contact" />;
