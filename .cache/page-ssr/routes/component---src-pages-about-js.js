"use strict";
exports.id = 682;
exports.ids = [682];
exports.modules = {

/***/ 2223:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B9: () => (/* binding */ contactOptions),
/* harmony export */   DQ: () => (/* binding */ flair),
/* harmony export */   Jz: () => (/* binding */ cLogo),
/* harmony export */   LE: () => (/* binding */ home),
/* harmony export */   Oc: () => (/* binding */ subtitle),
/* harmony export */   PX: () => (/* binding */ contact),
/* harmony export */   Qw: () => (/* binding */ greeting),
/* harmony export */   fg: () => (/* binding */ subHeader),
/* harmony export */   iV: () => (/* binding */ project),
/* harmony export */   kZ: () => (/* binding */ linkTo),
/* harmony export */   p2: () => (/* binding */ seperator),
/* harmony export */   um: () => (/* binding */ info)
/* harmony export */ });
/* unused harmony exports tech, fadeIn, techLogo */
// Exports
var home = "content-module--home--03ad9";
var greeting = "content-module--greeting--f7eda";
var subHeader = "content-module--subHeader--6c408";
var flair = "content-module--flair--14713";
var subtitle = "content-module--subtitle--48a2e";
var linkTo = "content-module--linkTo--288cb";
var seperator = "content-module--seperator--71ce9";
var tech = "content-module--tech--8083f";
var fadeIn = "content-module--fadeIn--9e290";
var techLogo = "content-module--techLogo--9e3db";
var project = "content-module--project--9f684";
var info = "content-module--info--bf89f";
var contact = "content-module--contact--312eb";
var contactOptions = "content-module--contactOptions--f5367";
var cLogo = "content-module--cLogo--f8b6b";


/***/ }),

/***/ 7252:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ layout)
});

// EXTERNAL MODULE: external "/Users/marco/Documents/personalProjs/portfolio/node_modules/react/index.js"
var index_js_ = __webpack_require__(6402);
// EXTERNAL MODULE: ./node_modules/@gatsbyjs/reach-router/dist/index.modern.mjs
var index_modern = __webpack_require__(7896);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 11 modules
var gatsby_browser_entry = __webpack_require__(7076);
;// CONCATENATED MODULE: ./src/components/layout.module.scss
// Exports
var header = "layout-module--header--6a868";
var nav = "layout-module--nav--dad1f";
var layout_module_link = "layout-module--link--e8e0c";
var main = "layout-module--main--6b2f2";
var fadeIn = "layout-module--fadeIn--ce902";
var svg = "layout-module--svg--26d29";
var before_main = "layout-module--before_main--8e73c";
var light = "layout-module--light--bccac";

;// CONCATENATED MODULE: ./src/components/layout.js
const Layout=({pageTitle,children})=>{const location=(0,index_modern.useLocation)();const mainRef=(0,index_js_.useRef)();const svgRef=(0,index_js_.useRef)();const lightRef=(0,index_js_.useRef)();(0,index_js_.useEffect)(()=>{const svg=svgRef.current;const light=lightRef.current;if(svg&&light){const handleMouseMove=e=>{light.style.top=e.pageY+"px";light.style.left=e.pageX+"px";};svg.addEventListener("mousemove",handleMouseMove);// Cleanup function to remove the event listener when the component unmounts
return()=>{svg.removeEventListener("mousemove",handleMouseMove);};}},[]);(0,index_js_.useEffect)(()=>{//natural height of the content
const contentHeight=mainRef.current.scrollHeight;//computed style of the .main element
const computedStyle=window.getComputedStyle(mainRef.current);//bottom padding from the computed style
const paddingBottom=parseFloat(computedStyle.paddingBottom);//add the bottom padding to the content height
const totalHeight=contentHeight+paddingBottom;//set the height of the .main element to the total height
mainRef.current.style.height=`${totalHeight}px`;},[location]);return/*#__PURE__*/index_js_.createElement("div",null,/*#__PURE__*/index_js_.createElement("header",{className:header},/*#__PURE__*/index_js_.createElement("div",{className:"logo"},"Logo"),/*#__PURE__*/index_js_.createElement("nav",{className:nav},/*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link,{className:layout_module_link,to:"/"},"Home"),/*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link,{className:layout_module_link,to:"/about"},"About"))),/*#__PURE__*/index_js_.createElement("div",{ref:svgRef,className:svg},/*#__PURE__*/index_js_.createElement("div",{className:before_main},/*#__PURE__*/index_js_.createElement("main",{className:main,ref:mainRef},children))),/*#__PURE__*/index_js_.createElement("div",{ref:lightRef,className:light}));};/* harmony default export */ const layout = (Layout);

/***/ }),

/***/ 9357:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6402);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7076);
const Seo=({title})=>{const data=(0,gatsby__WEBPACK_IMPORTED_MODULE_1__.useStaticQuery)("3159585216");return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("title",null,title," | ",data.site.siteMetadata.title);};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Seo);

/***/ }),

/***/ 3045:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Head: () => (/* binding */ Head),
  "default": () => (/* binding */ about)
});

// EXTERNAL MODULE: external "/Users/marco/Documents/personalProjs/portfolio/node_modules/react/index.js"
var index_js_ = __webpack_require__(6402);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 11 modules
var gatsby_browser_entry = __webpack_require__(7076);
// EXTERNAL MODULE: ./src/pages/content.module.scss
var content_module = __webpack_require__(2223);
// EXTERNAL MODULE: ./src/components/layout.js + 1 modules
var layout = __webpack_require__(7252);
// EXTERNAL MODULE: ./src/components/seo.js
var seo = __webpack_require__(9357);
;// CONCATENATED MODULE: ./src/assets/logos/linked.svg
/* harmony default export */ const linked = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0yMiAzLjQ3MDU5VjIwLjUyOTRDMjIgMjAuOTE5NCAyMS44NDUxIDIxLjI5MzUgMjEuNTY5MyAyMS41NjkzQzIxLjI5MzUgMjEuODQ1MSAyMC45MTk0IDIyIDIwLjUyOTQgMjJIMy40NzA1OUMzLjA4MDU2IDIyIDIuNzA2NTEgMjEuODQ1MSAyLjQzMDczIDIxLjU2OTNDMi4xNTQ5NCAyMS4yOTM1IDIgMjAuOTE5NCAyIDIwLjUyOTRWMy40NzA1OUMyIDMuMDgwNTYgMi4xNTQ5NCAyLjcwNjUxIDIuNDMwNzMgMi40MzA3M0MyLjcwNjUxIDIuMTU0OTQgMy4wODA1NiAyIDMuNDcwNTkgMkgyMC41Mjk0QzIwLjkxOTQgMiAyMS4yOTM1IDIuMTU0OTQgMjEuNTY5MyAyLjQzMDczQzIxLjg0NTEgMi43MDY1MSAyMiAzLjA4MDU2IDIyIDMuNDcwNTlaTTcuODgyMzUgOS42NDcwNkg0Ljk0MTE4VjE5LjA1ODhINy44ODIzNVY5LjY0NzA2Wk04LjE0NzA2IDYuNDExNzdDOC4xNDg2MSA2LjE4OTI5IDguMTA2MzIgNS45Njg2OSA4LjAyMjYxIDUuNzYyNTVDNy45Mzg5MSA1LjU1NjQyIDcuODE1NDIgNS4zNjg3OSA3LjY1OTE5IDUuMjEwMzlDNy41MDI5NyA1LjA1MTk4IDcuMzE3MDggNC45MjU4OSA3LjExMjEzIDQuODM5MzNDNi45MDcxOCA0Ljc1Mjc3IDYuNjg3MTggNC43MDc0MiA2LjQ2NDcxIDQuNzA1ODhINi40MTE3N0M1Ljk1OTM0IDQuNzA1ODggNS41MjU0NCA0Ljg4NTYxIDUuMjA1NTIgNS4yMDU1MkM0Ljg4NTYxIDUuNTI1NDQgNC43MDU4OCA1Ljk1OTM0IDQuNzA1ODggNi40MTE3N0M0LjcwNTg4IDYuODY0MTkgNC44ODU2MSA3LjI5ODA5IDUuMjA1NTIgNy42MTgwMUM1LjUyNTQ0IDcuOTM3OTIgNS45NTkzNCA4LjExNzY1IDYuNDExNzcgOC4xMTc2NUM2LjYzNDI2IDguMTIzMTIgNi44NTU2NSA4LjA4NDcgNy4wNjMyOCA4LjAwNDU4QzcuMjcwOTIgNy45MjQ0NyA3LjQ2MDc0IDcuODA0MjIgNy42MjE4OSA3LjY1MDcyQzcuNzgzMDQgNy40OTcyMiA3LjkxMjM3IDcuMzEzNDYgOC4wMDI0OCA3LjEwOTk2QzguMDkyNTkgNi45MDY0NiA4LjE0MTcyIDYuNjg3MiA4LjE0NzA2IDYuNDY0NzFWNi40MTE3N1pNMTkuMDU4OCAxMy4zNDEyQzE5LjA1ODggMTAuNTExOCAxNy4yNTg4IDkuNDExNzcgMTUuNDcwNiA5LjQxMTc3QzE0Ljg4NTEgOS4zODI0NSAxNC4zMDIxIDkuNTA3MTUgMTMuNzc5OSA5Ljc3MzQ1QzEzLjI1NzYgMTAuMDM5NyAxMi44MTQzIDEwLjQzODMgMTIuNDk0MSAxMC45Mjk0SDEyLjQxMThWOS42NDcwNkg5LjY0NzA2VjE5LjA1ODhIMTIuNTg4MlYxNC4wNTI5QzEyLjU0NTcgMTMuNTQwMyAxMi43MDcyIDEzLjAzMTUgMTMuMDM3NiAxMi42MzcyQzEzLjM2ODEgMTIuMjQyOSAxMy44NDA3IDExLjk5NDkgMTQuMzUyOSAxMS45NDcxSDE0LjQ2NDdDMTUuNCAxMS45NDcxIDE2LjA5NDEgMTIuNTM1MyAxNi4wOTQxIDE0LjAxNzZWMTkuMDU4OEgxOS4wMzUzTDE5LjA1ODggMTMuMzQxMloiIGZpbGw9IiMwMDAwMDAiLz4NCjwvc3ZnPg==");
;// CONCATENATED MODULE: ./src/assets/logos/mail.svg
/* harmony default export */ const mail = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8Zz4KICAgICAgICA8cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+CiAgICAgICAgPHBhdGggZD0iTTMgM2gxOGExIDEgMCAwIDEgMSAxdjE2YTEgMSAwIDAgMS0xIDFIM2ExIDEgMCAwIDEtMS0xVjRhMSAxIDAgMCAxIDEtMXptOS4wNiA4LjY4M0w1LjY0OCA2LjIzOCA0LjM1MyA3Ljc2Mmw3LjcyIDYuNTU1IDcuNTgxLTYuNTYtMS4zMDgtMS41MTMtNi4yODUgNS40Mzl6Ii8+CiAgICA8L2c+Cjwvc3ZnPg==");
;// CONCATENATED MODULE: ./src/assets/logos/github.svg
/* harmony default export */ const github = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyIDBDNS4zNyAwIDAgNS4zNyAwIDEyQzAgMTcuMzEgMy40MzUgMjEuNzk1IDguMjA1IDIzLjM4NUM4LjgwNSAyMy40OSA5LjAzIDIzLjEzIDkuMDMgMjIuODE1QzkuMDMgMjIuNTMgOS4wMTUgMjEuNTg1IDkuMDE1IDIwLjU4QzYgMjEuMTM1IDUuMjIgMTkuODQ1IDQuOTggMTkuMTdDNC44NDUgMTguODI1IDQuMjYgMTcuNzYgMy43NSAxNy40NzVDMy4zMyAxNy4yNSAyLjczIDE2LjY5NSAzLjczNSAxNi42OEM0LjY4IDE2LjY2NSA1LjM1NSAxNy41NSA1LjU4IDE3LjkxQzYuNjYgMTkuNzI1IDguMzg1IDE5LjIxNSA5LjA3NSAxOC45QzkuMTggMTguMTIgOS40OTUgMTcuNTk1IDkuODQgMTcuMjk1QzcuMTcgMTYuOTk1IDQuMzggMTUuOTYgNC4zOCAxMS4zN0M0LjM4IDEwLjA2NSA0Ljg0NSA4Ljk4NSA1LjYxIDguMTQ1QzUuNDkgNy44NDUgNS4wNyA2LjYxNSA1LjczIDQuOTY1QzUuNzMgNC45NjUgNi43MzUgNC42NSA5LjAzIDYuMTk1QzkuOTkgNS45MjUgMTEuMDEgNS43OSAxMi4wMyA1Ljc5QzEzLjA1IDUuNzkgMTQuMDcgNS45MjUgMTUuMDMgNi4xOTVDMTcuMzI1IDQuNjM1IDE4LjMzIDQuOTY1IDE4LjMzIDQuOTY1QzE4Ljk5IDYuNjE1IDE4LjU3IDcuODQ1IDE4LjQ1IDguMTQ1QzE5LjIxNSA4Ljk4NSAxOS42OCAxMC4wNSAxOS42OCAxMS4zN0MxOS42OCAxNS45NzUgMTYuODc1IDE2Ljk5NSAxNC4yMDUgMTcuMjk1QzE0LjY0IDE3LjY3IDE1LjAxNSAxOC4zOSAxNS4wMTUgMTkuNTE1QzE1LjAxNSAyMS4xMiAxNSAyMi40MSAxNSAyMi44MTVDMTUgMjMuMTMgMTUuMjI1IDIzLjUwNSAxNS44MjUgMjMuMzg1QzE4LjIwNzIgMjIuNTgwOCAyMC4yNzczIDIxLjA0OTggMjEuNzQzOCAxOS4wMDc0QzIzLjIxMDMgMTYuOTY1MSAyMy45OTk0IDE0LjUxNDMgMjQgMTJDMjQgNS4zNyAxOC42MyAwIDEyIDBaIiBmaWxsPSIjMDAwMDAwIi8+Cjwvc3ZnPg==");
;// CONCATENATED MODULE: ./src/pages/about.js
const AboutPage=()=>{return/*#__PURE__*/index_js_.createElement(layout/* default */.Z,null,/*#__PURE__*/index_js_.createElement("h1",null,"About Me!"),/*#__PURE__*/index_js_.createElement("p",null,"Hello! I'm Marco Ramirez, and I am currently a senior attending Indiana University Indianapolis (IUI). I'm majoring in Media Arts and Science, and specializing in Web Design & Development."),/*#__PURE__*/index_js_.createElement("p",null,"I'm comfortable with a variety of technologies, the most notable being Javascript (along with frameworks), Firebase, and NoSQL. I'm also familiar with the basics of Node.js, GraphQL, and MySQL. I'm always looking to learn more, and I'm always looking for new opportunities to grow as a developer. Feel free to"," ",/*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link,{className:content_module/* linkTo */.kZ,to:"https://linkedin.com/in/marcoramirez001"},"reach out")," ","if you have any questions or if you'd like to work together."),/*#__PURE__*/index_js_.createElement("div",{className:content_module/* contact */.PX},/*#__PURE__*/index_js_.createElement("div",{className:content_module/* subHeader */.fg},/*#__PURE__*/index_js_.createElement("h3",{style:{fontSize:"1.4em"}},"Shoot me a message!")),/*#__PURE__*/index_js_.createElement("p",null,"I'm currently looking for a full-time position as a front-end developer. I'm also open to freelance work, so if you have a project you'd like to work on, feel free to reach out!"),/*#__PURE__*/index_js_.createElement("p",null,"If you have any questions or inquiries, feel free to contact me via LinkedIn or email. I've also included my Github below, if you'd like to see other projects I'm working on. Feel free to get in touch!"),/*#__PURE__*/index_js_.createElement("div",{className:content_module/* contactOptions */.B9},/*#__PURE__*/index_js_.createElement("a",{href:"https://linkedin.com/in/marcoramirez001"},/*#__PURE__*/index_js_.createElement("img",{className:content_module/* cLogo */.Jz,src:linked,alt:"LinkedIn"})),/*#__PURE__*/index_js_.createElement("a",{href:"mailto:marcoramirezmail@gmail.com"},/*#__PURE__*/index_js_.createElement("img",{className:content_module/* cLogo */.Jz,src:mail,alt:"mail"})),/*#__PURE__*/index_js_.createElement("a",{href:"https://github.com/mramirez0610"},/*#__PURE__*/index_js_.createElement("img",{className:content_module/* cLogo */.Jz,src:github,alt:"Github"})))));};/* harmony default export */ const about = (AboutPage);const Head=()=>/*#__PURE__*/index_js_.createElement(seo/* default */.Z,{title:"About"});

/***/ })

};
;
//# sourceMappingURL=component---src-pages-about-js.js.map