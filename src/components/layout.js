import * as React from "react";
import { useEffect, useRef } from "react";
import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import { header, nav, link, main } from "../components/layout.module.scss";

const Layout = ({ pageTitle, children }) => {
  const location = useLocation();
  const mainRef = useRef();

  useEffect(() => {
    //natural height of the content
    const contentHeight = mainRef.current.scrollHeight;
    //computed style of the .main element
    const computedStyle = window.getComputedStyle(mainRef.current);
    //bottom padding from the computed style
    const paddingBottom = parseFloat(computedStyle.paddingBottom);
    //add the bottom padding to the content height
    const totalHeight = contentHeight + paddingBottom;
    //set the height of the .main element to the total height
    mainRef.current.style.height = `${totalHeight}px`;
  }, [location]);

  return (
    <div>
      <header className={header}>
        <div className="logo">Logo</div>
        <nav className={nav}>
          <Link className={link} to="/">
            Home
          </Link>

          <Link className={link} to="/projects">
            Projects
          </Link>

          <Link className={link} to="/contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className={main} ref={mainRef}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
