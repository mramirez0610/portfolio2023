import * as React from "react";
import ClimbingLayout from "../../components/climbing/climbingLayout";
import * as styles from "@styles/pages/climbing/cAbout.module.scss";
import Seo from "@components/seo";

export default function ClimbingAbout() {
  return (
    <ClimbingLayout>
      <div className={styles.cAbout}>
        <h2>about</h2>

        <div className={styles.content}>
          <p>
            what ever happened to blogs?? yea yea maybe they're a bit silly in
            the 2020's since social media is Aywhere And Everywhere, but cmon
            dude. if everyone had a blog i think people would be a lot happier.
          </p>
          <p>
            i love rock climbing. i really REALLY love rock climbing, so i
            figured i'd make a place to write my thoughts over my progression in
            the sport, and how i'm currently feeling about it. thanks for
            stopping by!
          </p>
        </div>
      </div>
    </ClimbingLayout>
  );
}

export const Head = () => (
  <Seo title="about" meta={[{ name: "robots", content: "noindex" }]} />
);
