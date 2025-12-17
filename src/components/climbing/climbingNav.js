import * as React from "react";
import { Link } from "gatsby";
import * as styles from "@styles/components/climbing/climbingNav.module.scss";
import { ArrowFatLeftIcon } from "@phosphor-icons/react";

export default function ClimbingNav() {
  return (
    <section className={styles.cNav}>
      {/* <div className={styles.logo}></div> */}

      {/* <section>
        <nav className={styles.nav}>
          <Link className={styles.link} to="/">
            portfolio
          </Link>
          <Link className={styles.link} to="/climbing">
            entries
          </Link>
          <Link className={styles.link} to="/climbing/about">
            about
          </Link>
        </nav>
      </section> */}

      <nav className={styles.nav}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link className={styles.link} to="/">
            <ArrowFatLeftIcon size={24} />
            portfolio
          </Link>
        </div>

        <Link className={styles.link} to="/climbing">
          entries
        </Link>
        <Link className={styles.link} to="/climbing/about">
          about
        </Link>
      </nav>
    </section>
  );
}
