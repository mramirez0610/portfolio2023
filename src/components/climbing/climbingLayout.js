import * as React from "react";
import * as styles from "@styles/components/climbing/climbingLayout.module.scss";
import ClimbingNav from "./climbingNav";
import { Link } from "gatsby";
import { useLayoutEffect } from "react";

export default function ClimbingLayout({ children }) {
  useLayoutEffect(() => {
    const updateBodyClass = () => {
      const path = window.location.pathname;
      const bodyClass =
        path === "/"
          ? "homePage"
          : path.includes("climbing")
          ? "climbingPage"
          : "";
      document.body.className = bodyClass;
    };
    updateBodyClass();
    window.addEventListener("popstate", updateBodyClass);
    return () => {
      window.removeEventListener("popstate", updateBodyClass);
    };
  }, []);
  return (
    <main className={styles.cLayout}>
      <div className={styles.background}>
        <div className={styles.text}>
          <h1>marco's</h1>
          <h1>climbing</h1>
          <h1>journal</h1>
        </div>
      </div>
      <header className={styles.header}>
        <Link to="/">
          <div className={styles.logo}></div>
        </Link>
        <ClimbingNav />
      </header>
      <section className={styles.content}>
        <article>{children}</article>
      </section>
    </main>
  );
}
