import * as React from "react";
import * as styles from "@styles/components/climbing/climbingLayout.module.scss";
import ClimbingNav from "./climbingNav";
import { Link } from "gatsby";

export default function ClimbingLayout({ children }) {
  return (
    <main className={styles.cLayout}>
      <header className={styles.header}>
        <Link to="/">
          <div className={styles.logo}></div>
        </Link>
      </header>
      <section className={styles.content}>
        <ClimbingNav />
        <article>{children}</article>
      </section>
    </main>
  );
}
