import * as React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "gatsby";
import { Barbell, BarbellIcon } from "@phosphor-icons/react";
import * as styles from "@styles/components/portfolio/layout.module.scss";

const Layout = ({ pageTitle, children }) => {
  const mainRef = useRef();
  const lightRef = useRef();
  const [dropdown, setDropdown] = useState(false);

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

  const ExtraNav = () => {
    return (
      <div
        className={`${styles.extraNav} ${
          dropdown ? styles.extraNavActive : styles.extraNavInactive
        }`}
      >
        <Link to="/climbing">
          <BarbellIcon className={styles.icon} size={26} />
        </Link>
      </div>
    );
  };

  return (
    <div>
      <header className={styles.header}>
        <div
          className={styles.logo}
          onClick={() => setDropdown(!dropdown)}
        ></div>
        <ExtraNav />

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
