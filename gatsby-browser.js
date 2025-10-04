import React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover"
      key="viewport"
    />,
  ]);
};
