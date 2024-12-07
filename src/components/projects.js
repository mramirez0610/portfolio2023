import * as React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  projects,
  project,
  info,
  linkTo,
  imageStyle,
  transition,
} from "./projects.module.scss";
import { useRef } from "react";

export default function Projects({ data }) {
  const boundingRef = useRef(null);

  const handleMouseEnter = (e) => {
    boundingRef.current = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg)`;
    e.currentTarget.classList.remove(transition);
  };

  const handleMouseMove = (e) => {
    if (!boundingRef.current) return;

    const x = e.clientX - boundingRef.current.left;
    const y = e.clientY - boundingRef.current.top;

    const xPercent = x / boundingRef.current.width;
    const yPercent = y / boundingRef.current.height;

    const xRotation = (0.5 - xPercent) * 10;
    const yRotation = (0.5 - yPercent) * 10;

    e.currentTarget.style.transform = `perspective(800px) rotateX(${-yRotation}deg) rotateY(${xRotation}deg)`;
  };

  const handleMouseLeave = (e) => {
    boundingRef.current = null;
    e.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg)`;
    e.currentTarget.classList.add(transition);
  };

  return (
    <div>
      <div className={projects}>
        {data.allMdx.nodes.map((node) => (
          <Link
            className={project}
            key={node.id}
            to={`/projects/${node.frontmatter.slug}`}
          >
            <div
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <GatsbyImage
                image={getImage(node.frontmatter.image)}
                alt={node.frontmatter.title}
                className={imageStyle}
              />
            </div>
            <div className={info}>
              <h3>
                <Link
                  to={`/projects/${node.frontmatter.slug}`}
                  className={linkTo}
                >
                  {node.frontmatter.title}
                </Link>
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
