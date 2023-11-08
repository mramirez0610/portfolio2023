import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Link } from "gatsby";

const ContactPage = () => {
  return (
    <Layout>
      <main>
        <h2>Get in Contact with me</h2>
        <Link to="/">Back to Home</Link>
        <p>Send me a message!</p>
      </main>
    </Layout>
  );
};

export default ContactPage;

export const Head = () => <Seo title="Contact" />;
