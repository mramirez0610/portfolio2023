exports.onRenderBody = ({ setBodyAttributes, pathname }) => {
  // Set the body class based on the current pathname
  const bodyClass =
    pathname === "/"
      ? "homePage"
      : pathname.includes("climbing")
      ? "climbingPage"
      : "";
  setBodyAttributes({
    className: bodyClass,
  });
};
