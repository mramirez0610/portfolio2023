import * as React from "react";
import ClimbingLayout from "../../components/climbing/climbingLayout";
import Seo from "@components/seo";

export default function ClimbingAbout() {
  return (
    <ClimbingLayout>
      <div>about</div>
    </ClimbingLayout>
  );
}

export const Head = ({ pageContext }) => (
  <Seo title="about" meta={[{ name: "robots", content: "noindex" }]} />
);
