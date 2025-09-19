import * as React from "react";
import { useEffect, useRef } from "react";
import { Link } from "gatsby";
import * as styles from "../styles/components/layout.module.scss";

const Layout = ({ pageTitle, children }) => {
  const mainRef = useRef();
  const svgRef = useRef();
  const lightRef = useRef();

  useEffect(() => {
    const svg = svgRef.current;
    const light = lightRef.current;

    if (svg && light) {
      const handleMouseMove = (e) => {
        light.style.top = e.pageY + "px";
        light.style.left = e.pageX + "px";
      };

      svg.addEventListener("mousemove", handleMouseMove);

      // cleanup function to remove the event listener when the component unmounts
      return () => {
        svg.removeEventListener("mousemove", handleMouseMove);
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
      <div ref={svgRef} className={styles.svg}>
        <main className={styles.main} ref={mainRef}>
          {children}
        </main>
      </div>
      <div ref={lightRef} className={styles.light}></div>
    </div>
  );
};

export default Layout;
