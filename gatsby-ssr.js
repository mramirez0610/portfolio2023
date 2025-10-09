exports.onRenderBody = ({ setBodyAttributes, pathname }) => {
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
