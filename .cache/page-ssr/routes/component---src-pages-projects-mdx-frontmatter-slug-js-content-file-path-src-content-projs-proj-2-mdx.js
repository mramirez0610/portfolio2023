"use strict";
exports.id = 469;
exports.ids = [469];
exports.modules = {

/***/ 4924:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Head: () => (/* binding */ Head),
  "default": () => (/* binding */ GatsbyMDXWrapper)
});

// EXTERNAL MODULE: ./node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__(1151);
// EXTERNAL MODULE: external "/Users/marco/Documents/personalProjs/portfolio/node_modules/react/index.js"
var index_js_ = __webpack_require__(6402);
var index_js_default = /*#__PURE__*/__webpack_require__.n(index_js_);
;// CONCATENATED MODULE: ./src/content/projs/proj2.mdx
/*@jsxRuntime classic @jsx React.createElement @jsxFrag React.Fragment*/function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",strong:"strong",h2:"h2",ul:"ul",li:"li"},(0,lib/* useMDXComponents */.a)(),props.components);return/*#__PURE__*/index_js_default().createElement((index_js_default()).Fragment,null,/*#__PURE__*/index_js_default().createElement(_components.h1,null,"test project"),"\n",/*#__PURE__*/index_js_default().createElement(_components.p,null,"this is a markdown file that would ideally contain information about a ",/*#__PURE__*/index_js_default().createElement(_components.strong,null,"project"),"."),"\n",/*#__PURE__*/index_js_default().createElement(_components.h2,null,"this is a heading"),"\n",/*#__PURE__*/index_js_default().createElement(_components.p,null,"and i am marco"),"\n",/*#__PURE__*/index_js_default().createElement(_components.ul,null,"\n",/*#__PURE__*/index_js_default().createElement(_components.li,null,"this"),"\n",/*#__PURE__*/index_js_default().createElement(_components.li,null,"is"),"\n",/*#__PURE__*/index_js_default().createElement(_components.li,null,"a"),"\n",/*#__PURE__*/index_js_default().createElement(_components.li,null,"list"),"\n"));}function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib/* useMDXComponents */.a)(),props.components);return MDXLayout?/*#__PURE__*/index_js_default().createElement(MDXLayout,props,/*#__PURE__*/index_js_default().createElement(_createMdxContent,props)):_createMdxContent(props);}/* harmony default export */ const proj2 = (MDXContent);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 11 modules
var gatsby_browser_entry = __webpack_require__(7076);
// EXTERNAL MODULE: ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js
var gatsby_image_module = __webpack_require__(3040);
// EXTERNAL MODULE: ./src/components/layout.js + 1 modules
var layout = __webpack_require__(7252);
// EXTERNAL MODULE: ./src/components/seo.js
var seo = __webpack_require__(9357);
;// CONCATENATED MODULE: ./src/pages/projects/{mdx.frontmatter__slug}.js?__contentFilePath=/Users/marco/Documents/personalProjs/portfolio/src/content/projs/proj2.mdx







const MDXStyling = props => /*#__PURE__*/index_js_.createElement("li", Object.assign({
  style: {
    marginLeft: "5%"
  }
}, props));
const Project = ({
  data,
  children
}) => {
  const image = (0,gatsby_image_module/* getImage */.gJ)(data.mdx.frontmatter.image);
  const {
    frontmatter,
    body
  } = data.mdx;
  return /*#__PURE__*/index_js_.createElement(layout/* default */.Z, {
    pageTitle: "Project Description"
  }, /*#__PURE__*/index_js_.createElement(gatsby_browser_entry.Link, {
    to: "/"
  }, "Back to projects"), /*#__PURE__*/index_js_.createElement("p", null, data.mdx.frontmatter.date), /*#__PURE__*/index_js_.createElement(gatsby_image_module/* GatsbyImage */.HN, {
    image: image,
    alt: "Keurig Recreation"
  }), /*#__PURE__*/index_js_.createElement(lib/* MDXProvider */.Z, {
    components: {
      li: MDXStyling
    }
  }, children));
};
const query = "1301565596";
const Head = ({
  data
}) => /*#__PURE__*/index_js_.createElement(seo/* default */.Z, {
  title: data.mdx.frontmatter.title
});
Project;
function GatsbyMDXWrapper(props) {
  return /*#__PURE__*/index_js_.createElement(Project, props, /*#__PURE__*/index_js_.createElement(proj2, props));
}

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

/***/ })

};
;
//# sourceMappingURL=component---src-pages-projects-mdx-frontmatter-slug-js-content-file-path-src-content-projs-proj-2-mdx.js.map