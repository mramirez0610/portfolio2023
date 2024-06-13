import * as React from "react";
import { useEffect, useRef } from "react";
import { Link } from "gatsby";
import {
  header,
  nav,
  link,
  main,
  light,
  svg,
  logo,
} from "../components/layout.module.scss";

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
      <header className={header}>
        <div className={logo}></div>
        <nav className={nav}>
          <Link className={link} to="/">
            Home
          </Link>

          <Link className={link} to="/about">
            About
          </Link>
        </nav>
      </header>
      <div ref={svgRef} className={svg}>
        <main className={main} ref={mainRef}>
          {children}
        </main>
      </div>
      <div ref={lightRef} className={light}></div>
    </div>
  );
};

export default Layout;
