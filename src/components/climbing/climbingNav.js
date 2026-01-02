import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import * as styles from "@styles/components/climbing/climbingNav.module.scss";
import {
  ArrowFatLeftIcon,
  ArrowFatLinesLeftIcon,
  DotsNineIcon,
} from "@phosphor-icons/react";

export default function ClimbingNav() {
  const [open, setOpen] = useState(false);
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
          {/* <Link className={styles.link} to="/">
            <ArrowFatLeftIcon size={24} />
            <ArrowFatLineLeft size={32} />
            portfolio
          </Link> */}
          <Link className={styles.link} to="/">
            <span className={styles.iconSwap}>
              <ArrowFatLeftIcon className={styles.iconPrimary} size={24} />
              <ArrowFatLinesLeftIcon className={styles.iconHover} size={24} />
            </span>
            <span>portfolio</span>
          </Link>
        </div>

        <Link className={styles.link} to="/climbing">
          entries
        </Link>
        <Link className={styles.link} to="/climbing/about">
          about
        </Link>
      </nav>

      <div
        className={`${styles.mobileNavButton} ${open ? styles.navOpen : ""}`}
        onClick={() => setOpen(!open)}
      >
        <DotsNineIcon size={32} weight="bold" />
      </div>

      <nav className={`${styles.mobileNav} ${open ? styles.open : ""}`}>
        <div className={styles.navLinks}>
          <Link className={styles.link} to="/">
            <span className={styles.iconSwap}>
              <ArrowFatLeftIcon className={styles.iconPrimary} size={24} />
            </span>
            <span>portfolio</span>
          </Link>
          <Link className={styles.link} to="/climbing">
            entries
          </Link>
          <Link className={styles.link} to="/climbing/about">
            about
          </Link>
        </div>
      </nav>
    </section>
  );
}
