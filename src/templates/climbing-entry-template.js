import * as React from "react";
import * as styles from "@styles/pages/climbing/cEntry.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ClimbingLayout from "@components/climbing/climbingLayout";
import Markdown from "react-markdown";

import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

export default function Entry({ pageContext }) {
  const { frontmatter, body } = pageContext;

  const buttonStyle = {
    background: "white",
    border: "1px solid black",
    margin: "10px",
    borderRadius: "10px",
    opacity: "25%",
  };

  const properties = {
    prevArrow: <CaretLeftIcon size={32} style={{ ...buttonStyle }} />,
    nextArrow: <CaretRightIcon size={32} style={{ ...buttonStyle }} />,
  };

  return (
    <>
      <ClimbingLayout>
        <div className={styles.entry}>
          {/*           
          <GatsbyImage
            image={getImage(frontmatter.image)}
            alt={frontmatter.title}
          /> 
          */}

          <section className={styles.images}>
            <Fade
              arrows={true}
              autoplay={true}
              duration={5000}
              pauseOnHover={true}
              canSwipe={true}
              {...properties}
            >
              {frontmatter.images.map((img, index) => (
                <div key={index} className={styles.eachSlideEffect}>
                  <GatsbyImage
                    image={getImage(img)}
                    className={styles.image}
                    alt={`${frontmatter.title} ${index + 1}`}
                  />
                </div>
              ))}
            </Fade>
          </section>

          <section className={styles.frontmatter}>
            <h5 className={styles.date}>{frontmatter.date}</h5>
            <div className={styles.keywords}>
              {frontmatter.keywords.map((keyword, index) => (
                <div className={styles.keyword} key={index}>
                  {keyword}
                </div>
              ))}
            </div>
          </section>

          <Markdown>{body}</Markdown>
        </div>
      </ClimbingLayout>
    </>
  );
}
