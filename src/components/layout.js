import * as React from "react";
import { useLayoutEffect, useRef } from "react";
import { Link } from "gatsby";
import * as styles from "@styles/components/portfolio/layout.module.scss";

const Layout = ({ pageTitle, children }) => {
  const mainRef = useRef();
  const lightRef = useRef();

  useLayoutEffect(() => {
    document.body.className = "homePage";
    const main = mainRef.current;
    const light = lightRef.current;

    if (main && light) {
      const handleMouseMove = (e) => {
        light.style.top = e.pageY + "px";
        light.style.left = e.pageX + "px";
      };
      main.addEventListener("mousemove", handleMouseMove);
      // cleanup function to remove the event listener when the component unmounts
      return () => {
        main.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}></div>
        <nav className={styles.nav}>
          <Link className={styles.link} to="/">
            Home
          </Link>

          <Link className={styles.link} to="/about">
            About
          </Link>
        </nav>
      </header>
      <main ref={mainRef} className={styles.main}>
        <section className={styles.content}>{children}</section>
      </main>
      <div ref={lightRef} className={styles.light}></div>
    </div>
  );
};

export default Layout;
