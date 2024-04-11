import * as React from "react";
import { useEffect, useRef } from "react";
import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import {
  header,
  nav,
  link,
  main,
  light,
  svg,
  before_main,
  logo,
} from "../components/layout.module.scss";

const Layout = ({ pageTitle, children }) => {
  const location = useLocation();
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
        <div className={before_main}>
          <main className={main} ref={mainRef}>
            {children}
          </main>
        </div>
      </div>
      <div ref={lightRef} className={light}></div>
    </div>
  );
};

export default Layout;
