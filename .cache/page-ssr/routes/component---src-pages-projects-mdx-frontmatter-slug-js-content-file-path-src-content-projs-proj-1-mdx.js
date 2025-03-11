"use strict";
exports.id = "component---src-pages-projects-mdx-frontmatter-slug-js-content-file-path-src-content-projs-proj-1-mdx";
exports.ids = ["component---src-pages-projects-mdx-frontmatter-slug-js-content-file-path-src-content-projs-proj-1-mdx"];
exports.modules = {

/***/ "./node_modules/@mdx-js/react/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@mdx-js/react/lib/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MDXProvider: () => (/* binding */ MDXProvider),
/* harmony export */   useMDXComponents: () => (/* binding */ useMDXComponents)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/**
 * @import {MDXComponents} from 'mdx/types.js'
 * @import {Component, ReactElement, ReactNode} from 'react'
 */

/**
 * @callback MergeComponents
 *   Custom merge function.
 * @param {Readonly<MDXComponents>} currentComponents
 *   Current components from the context.
 * @returns {MDXComponents}
 *   Additional components.
 *
 * @typedef Props
 *   Configuration for `MDXProvider`.
 * @property {ReactNode | null | undefined} [children]
 *   Children (optional).
 * @property {Readonly<MDXComponents> | MergeComponents | null | undefined} [components]
 *   Additional components to use or a function that creates them (optional).
 * @property {boolean | null | undefined} [disableParentContext=false]
 *   Turn off outer component context (default: `false`).
 */



/** @type {Readonly<MDXComponents>} */
const emptyComponents = {}

const MDXContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents)

/**
 * Get current components from the MDX Context.
 *
 * @param {Readonly<MDXComponents> | MergeComponents | null | undefined} [components]
 *   Additional components to use or a function that creates them (optional).
 * @returns {MDXComponents}
 *   Current components.
 */
function useMDXComponents(components) {
  const contextComponents = react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext)

  // Memoize to avoid unnecessary top-level context changes
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    function () {
      // Custom merge via a function prop
      if (typeof components === 'function') {
        return components(contextComponents)
      }

      return {...contextComponents, ...components}
    },
    [contextComponents, components]
  )
}

/**
 * Provider for MDX context.
 *
 * @param {Readonly<Props>} properties
 *   Properties.
 * @returns {ReactElement}
 *   Element.
 * @satisfies {Component}
 */
function MDXProvider(properties) {
  /** @type {Readonly<MDXComponents>} */
  let allComponents

  if (properties.disableParentContext) {
    allComponents =
      typeof properties.components === 'function'
        ? properties.components(emptyComponents)
        : properties.components || emptyComponents
  } else {
    allComponents = useMDXComponents(properties.components)
  }

  return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    MDXContext.Provider,
    {value: allComponents},
    properties.children
  )
}


/***/ }),

/***/ "./node_modules/camelcase/index.js":
/*!*****************************************!*\
  !*** ./node_modules/camelcase/index.js ***!
  \*****************************************/
/***/ ((module) => {



const UPPERCASE = /[\p{Lu}]/u;
const LOWERCASE = /[\p{Ll}]/u;
const LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/;

const LEADING_SEPARATORS = new RegExp('^' + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, 'gu');
const NUMBERS_AND_IDENTIFIER = new RegExp('\\d+' + IDENTIFIER.source, 'gu');

const preserveCamelCase = (string, toLowerCase, toUpperCase) => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < string.length; i++) {
		const character = string[i];

		if (isLastCharLower && UPPERCASE.test(character)) {
			string = string.slice(0, i) + '-' + string.slice(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
			string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
		}
	}

	return string;
};

const preserveConsecutiveUppercase = (input, toLowerCase) => {
	LEADING_CAPITAL.lastIndex = 0;

	return input.replace(LEADING_CAPITAL, m1 => toLowerCase(m1));
};

const postProcess = (input, toUpperCase) => {
	SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
	NUMBERS_AND_IDENTIFIER.lastIndex = 0;

	return input.replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier))
		.replace(NUMBERS_AND_IDENTIFIER, m => toUpperCase(m));
};

const camelCase = (input, options) => {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = {
		pascalCase: false,
		preserveConsecutiveUppercase: false,
		...options
	};

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	const toLowerCase = options.locale === false ?
		string => string.toLowerCase() :
		string => string.toLocaleLowerCase(options.locale);
	const toUpperCase = options.locale === false ?
		string => string.toUpperCase() :
		string => string.toLocaleUpperCase(options.locale);

	if (input.length === 1) {
		return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
	}

	const hasUpperCase = input !== toLowerCase(input);

	if (hasUpperCase) {
		input = preserveCamelCase(input, toLowerCase, toUpperCase);
	}

	input = input.replace(LEADING_SEPARATORS, '');

	if (options.preserveConsecutiveUppercase) {
		input = preserveConsecutiveUppercase(input, toLowerCase);
	} else {
		input = toLowerCase(input);
	}

	if (options.pascalCase) {
		input = toUpperCase(input.charAt(0)) + input.slice(1);
	}

	return postProcess(input, toUpperCase);
};

module.exports = camelCase;
// TODO: Remove this for the next major release
module.exports["default"] = camelCase;


/***/ }),

/***/ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js":
/*!**********************************************************************!*\
  !*** ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GatsbyImage: () => (/* binding */ X),
/* harmony export */   MainImage: () => (/* binding */ D),
/* harmony export */   Placeholder: () => (/* binding */ C),
/* harmony export */   StaticImage: () => (/* binding */ Z),
/* harmony export */   generateImageData: () => (/* binding */ b),
/* harmony export */   getImage: () => (/* binding */ I),
/* harmony export */   getImageData: () => (/* binding */ R),
/* harmony export */   getLowResolutionImageURL: () => (/* binding */ y),
/* harmony export */   getSrc: () => (/* binding */ W),
/* harmony export */   getSrcSet: () => (/* binding */ j),
/* harmony export */   withArtDirection: () => (/* binding */ _)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camelcase */ "./node_modules/camelcase/index.js");
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(camelcase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);




function n() {
  return n = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];
      for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
  }, n.apply(this, arguments);
}
function o(e, t) {
  if (null == e) return {};
  var a,
    i,
    r = {},
    n = Object.keys(e);
  for (i = 0; i < n.length; i++) t.indexOf(a = n[i]) >= 0 || (r[a] = e[a]);
  return r;
}
var s = [.25, .5, 1, 2],
  l = [750, 1080, 1366, 1920],
  u = [320, 654, 768, 1024, 1366, 1600, 1920, 2048, 2560, 3440, 3840, 4096],
  d = 800,
  c = 800,
  h = 4 / 3,
  g = function (e) {
    return console.warn(e);
  },
  p = function (e, t) {
    return e - t;
  },
  m = function (e, t) {
    switch (t) {
      case "constrained":
        return "(min-width: " + e + "px) " + e + "px, 100vw";
      case "fixed":
        return e + "px";
      case "fullWidth":
        return "100vw";
      default:
        return;
    }
  },
  f = function (e) {
    return e.map(function (e) {
      return e.src + " " + e.width + "w";
    }).join(",\n");
  };
function v(e) {
  var t = e.lastIndexOf(".");
  if (-1 !== t) {
    var a = e.slice(t + 1);
    if ("jpeg" === a) return "jpg";
    if (3 === a.length || 4 === a.length) return a;
  }
}
function w(e) {
  var t = e.layout,
    i = void 0 === t ? "constrained" : t,
    r = e.width,
    o = e.height,
    s = e.sourceMetadata,
    l = e.breakpoints,
    u = e.aspectRatio,
    d = e.formats,
    g = void 0 === d ? ["auto", "webp"] : d;
  return g = g.map(function (e) {
    return e.toLowerCase();
  }), i = camelcase__WEBPACK_IMPORTED_MODULE_1___default()(i), r && o ? n({}, e, {
    formats: g,
    layout: i,
    aspectRatio: r / o
  }) : (s.width && s.height && !u && (u = s.width / s.height), "fullWidth" === i ? (r = r || s.width || l[l.length - 1], o = o || Math.round(r / (u || h))) : (r || (r = o && u ? o * u : s.width ? s.width : o ? Math.round(o / h) : c), u && !o ? o = Math.round(r / u) : u || (u = r / o)), n({}, e, {
    width: r,
    height: o,
    aspectRatio: u,
    layout: i,
    formats: g
  }));
}
function y(e, t) {
  var a;
  return void 0 === t && (t = 20), null == (a = (0, (e = w(e)).generateImageSource)(e.filename, t, Math.round(t / e.aspectRatio), e.sourceMetadata.format || "jpg", e.fit, e.options)) ? void 0 : a.src;
}
function b(e) {
  var t,
    a = (e = w(e)).pluginName,
    i = e.sourceMetadata,
    r = e.generateImageSource,
    o = e.layout,
    u = e.fit,
    d = e.options,
    h = e.width,
    p = e.height,
    y = e.filename,
    b = e.reporter,
    S = void 0 === b ? {
      warn: g
    } : b,
    N = e.backgroundColor,
    x = e.placeholderURL;
  if (a || S.warn('[gatsby-plugin-image] "generateImageData" was not passed a plugin name'), "function" != typeof r) throw new Error("generateImageSource must be a function");
  i && (i.width || i.height) ? i.format || (i.format = v(y)) : i = {
    width: h,
    height: p,
    format: (null == (t = i) ? void 0 : t.format) || v(y) || "auto"
  };
  var I = new Set(e.formats);
  (0 === I.size || I.has("auto") || I.has("")) && (I.delete("auto"), I.delete(""), I.add(i.format)), I.has("jpg") && I.has("png") && (S.warn("[" + a + "] Specifying both 'jpg' and 'png' formats is not supported. Using 'auto' instead"), I.delete("jpg" === i.format ? "png" : "jpg"));
  var W = function (e) {
      var t = e.filename,
        a = e.layout,
        i = void 0 === a ? "constrained" : a,
        r = e.sourceMetadata,
        o = e.reporter,
        u = void 0 === o ? {
          warn: g
        } : o,
        d = e.breakpoints,
        h = void 0 === d ? l : d,
        p = Object.entries({
          width: e.width,
          height: e.height
        }).filter(function (e) {
          var t = e[1];
          return "number" == typeof t && t < 1;
        });
      if (p.length) throw new Error("Specified dimensions for images must be positive numbers (> 0). Problem dimensions you have are " + p.map(function (e) {
        return e.join(": ");
      }).join(", "));
      return "fixed" === i ? function (e) {
        var t = e.filename,
          a = e.sourceMetadata,
          i = e.width,
          r = e.height,
          n = e.fit,
          o = void 0 === n ? "cover" : n,
          l = e.outputPixelDensities,
          u = e.reporter,
          d = void 0 === u ? {
            warn: g
          } : u,
          h = a.width / a.height,
          p = k(void 0 === l ? s : l);
        if (i && r) {
          var m = M(a, {
            width: i,
            height: r,
            fit: o
          });
          i = m.width, r = m.height, h = m.aspectRatio;
        }
        i ? r || (r = Math.round(i / h)) : i = r ? Math.round(r * h) : c;
        var f = i;
        if (a.width < i || a.height < r) {
          var v = a.width < i ? "width" : "height";
          d.warn("\nThe requested " + v + ' "' + ("width" === v ? i : r) + 'px" for the image ' + t + " was larger than the actual image " + v + " of " + a[v] + "px. If possible, replace the current image with a larger one."), "width" === v ? (i = a.width, r = Math.round(i / h)) : i = (r = a.height) * h;
        }
        return {
          sizes: p.filter(function (e) {
            return e >= 1;
          }).map(function (e) {
            return Math.round(e * i);
          }).filter(function (e) {
            return e <= a.width;
          }),
          aspectRatio: h,
          presentationWidth: f,
          presentationHeight: Math.round(f / h),
          unscaledWidth: i
        };
      }(e) : "constrained" === i ? E(e) : "fullWidth" === i ? E(n({
        breakpoints: h
      }, e)) : (u.warn("No valid layout was provided for the image at " + t + ". Valid image layouts are fixed, fullWidth, and constrained. Found " + i), {
        sizes: [r.width],
        presentationWidth: r.width,
        presentationHeight: r.height,
        aspectRatio: r.width / r.height,
        unscaledWidth: r.width
      });
    }(n({}, e, {
      sourceMetadata: i
    })),
    j = {
      sources: []
    },
    R = e.sizes;
  R || (R = m(W.presentationWidth, o)), I.forEach(function (e) {
    var t = W.sizes.map(function (t) {
      var i = r(y, t, Math.round(t / W.aspectRatio), e, u, d);
      if (null != i && i.width && i.height && i.src && i.format) return i;
      S.warn("[" + a + "] The resolver for image " + y + " returned an invalid value.");
    }).filter(Boolean);
    if ("jpg" === e || "png" === e || "auto" === e) {
      var i = t.find(function (e) {
        return e.width === W.unscaledWidth;
      }) || t[0];
      i && (j.fallback = {
        src: i.src,
        srcSet: f(t),
        sizes: R
      });
    } else {
      var n;
      null == (n = j.sources) || n.push({
        srcSet: f(t),
        sizes: R,
        type: "image/" + e
      });
    }
  });
  var _ = {
    images: j,
    layout: o,
    backgroundColor: N
  };
  switch (x && (_.placeholder = {
    fallback: x
  }), o) {
    case "fixed":
      _.width = W.presentationWidth, _.height = W.presentationHeight;
      break;
    case "fullWidth":
      _.width = 1, _.height = 1 / W.aspectRatio;
      break;
    case "constrained":
      _.width = e.width || W.presentationWidth || 1, _.height = (_.width || 1) / W.aspectRatio;
  }
  return _;
}
var k = function (e) {
  return Array.from(new Set([1].concat(e))).sort(p);
};
function E(e) {
  var t,
    a = e.sourceMetadata,
    i = e.width,
    r = e.height,
    n = e.fit,
    o = void 0 === n ? "cover" : n,
    l = e.outputPixelDensities,
    u = e.breakpoints,
    c = e.layout,
    h = a.width / a.height,
    g = k(void 0 === l ? s : l);
  if (i && r) {
    var m = M(a, {
      width: i,
      height: r,
      fit: o
    });
    i = m.width, r = m.height, h = m.aspectRatio;
  }
  i = i && Math.min(i, a.width), r = r && Math.min(r, a.height), i || r || (r = (i = Math.min(d, a.width)) / h), i || (i = r * h);
  var f = i;
  return (a.width < i || a.height < r) && (i = a.width, r = a.height), i = Math.round(i), (null == u ? void 0 : u.length) > 0 ? (t = u.filter(function (e) {
    return e <= a.width;
  })).length < u.length && !t.includes(a.width) && t.push(a.width) : t = (t = g.map(function (e) {
    return Math.round(e * i);
  })).filter(function (e) {
    return e <= a.width;
  }), "constrained" !== c || t.includes(i) || t.push(i), {
    sizes: t = t.sort(p),
    aspectRatio: h,
    presentationWidth: f,
    presentationHeight: Math.round(f / h),
    unscaledWidth: i
  };
}
function M(e, t) {
  var a = e.width / e.height,
    i = t.width,
    r = t.height;
  switch (t.fit) {
    case "fill":
      i = t.width ? t.width : e.width, r = t.height ? t.height : e.height;
      break;
    case "inside":
      var n = t.width ? t.width : Number.MAX_SAFE_INTEGER,
        o = t.height ? t.height : Number.MAX_SAFE_INTEGER;
      i = Math.min(n, Math.round(o * a)), r = Math.min(o, Math.round(n / a));
      break;
    case "outside":
      var s = t.width ? t.width : 0,
        l = t.height ? t.height : 0;
      i = Math.max(s, Math.round(l * a)), r = Math.max(l, Math.round(s / a));
      break;
    default:
      t.width && !t.height && (i = t.width, r = Math.round(t.width / a)), t.height && !t.width && (i = Math.round(t.height * a), r = t.height);
  }
  return {
    width: i,
    height: r,
    aspectRatio: i / r
  };
}
var S = ["baseUrl", "urlBuilder", "sourceWidth", "sourceHeight", "pluginName", "formats", "breakpoints", "options"],
  N = ["images", "placeholder"];
function x() {
  return "undefined" != typeof GATSBY___IMAGE && GATSBY___IMAGE;
}
var I = function (e) {
    var t;
    return function (e) {
      var t, a;
      return Boolean(null == e || null == (t = e.images) || null == (a = t.fallback) ? void 0 : a.src);
    }(e) ? e : function (e) {
      return Boolean(null == e ? void 0 : e.gatsbyImageData);
    }(e) ? e.gatsbyImageData : function (e) {
      return Boolean(null == e ? void 0 : e.gatsbyImage);
    }(e) ? e.gatsbyImage : null == e || null == (t = e.childImageSharp) ? void 0 : t.gatsbyImageData;
  },
  W = function (e) {
    var t, a, i;
    return null == (t = I(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.src;
  },
  j = function (e) {
    var t, a, i;
    return null == (t = I(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.srcSet;
  };
function R(e) {
  var t,
    a = e.baseUrl,
    i = e.urlBuilder,
    r = e.sourceWidth,
    s = e.sourceHeight,
    l = e.pluginName,
    d = void 0 === l ? "getImageData" : l,
    c = e.formats,
    h = void 0 === c ? ["auto"] : c,
    g = e.breakpoints,
    p = e.options,
    m = o(e, S);
  return null != (t = g) && t.length || "fullWidth" !== m.layout && "FULL_WIDTH" !== m.layout || (g = u), b(n({}, m, {
    pluginName: d,
    generateImageSource: function (e, t, a, r) {
      return {
        width: t,
        height: a,
        format: r,
        src: i({
          baseUrl: e,
          width: t,
          height: a,
          options: p,
          format: r
        })
      };
    },
    filename: a,
    formats: h,
    breakpoints: g,
    sourceMetadata: {
      width: r,
      height: s,
      format: "auto"
    }
  }));
}
function _(e, t) {
  var a,
    i,
    r,
    s = e.images,
    l = e.placeholder,
    u = n({}, o(e, N), {
      images: n({}, s, {
        sources: []
      }),
      placeholder: l && n({}, l, {
        sources: []
      })
    });
  return t.forEach(function (t) {
    var a,
      i = t.media,
      r = t.image;
    i ? (r.layout !== e.layout && "development" === "development" && console.warn('[gatsby-plugin-image] Mismatched image layout: expected "' + e.layout + '" but received "' + r.layout + '". All art-directed images use the same layout as the default image'), (a = u.images.sources).push.apply(a, r.images.sources.map(function (e) {
      return n({}, e, {
        media: i
      });
    }).concat([{
      media: i,
      srcSet: r.images.fallback.srcSet
    }])), u.placeholder && u.placeholder.sources.push({
      media: i,
      srcSet: r.placeholder.fallback
    })) :  true && console.warn("[gatsby-plugin-image] All art-directed images passed to must have a value set for `media`. Skipping.");
  }), (a = u.images.sources).push.apply(a, s.sources), null != l && l.sources && (null == (i = u.placeholder) || (r = i.sources).push.apply(r, l.sources)), u;
}
var A,
  O = ["src", "srcSet", "loading", "alt", "shouldLoad"],
  T = ["fallback", "sources", "shouldLoad"],
  z = function (t) {
    var a = t.src,
      i = t.srcSet,
      r = t.loading,
      s = t.alt,
      l = void 0 === s ? "" : s,
      u = t.shouldLoad,
      d = o(t, O);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", n({}, d, {
      decoding: "async",
      loading: r,
      src: u ? a : void 0,
      "data-src": u ? void 0 : a,
      srcSet: u ? i : void 0,
      "data-srcset": u ? void 0 : i,
      alt: l
    }));
  },
  L = function (t) {
    var a = t.fallback,
      i = t.sources,
      r = void 0 === i ? [] : i,
      s = t.shouldLoad,
      l = void 0 === s || s,
      u = o(t, T),
      d = u.sizes || (null == a ? void 0 : a.sizes),
      c = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z, n({}, u, a, {
        sizes: d,
        shouldLoad: l
      }));
    return r.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("picture", null, r.map(function (t) {
      var a = t.media,
        i = t.srcSet,
        r = t.type;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("source", {
        key: a + "-" + r + "-" + i,
        type: r,
        media: a,
        srcSet: l ? i : void 0,
        "data-srcset": l ? void 0 : i,
        sizes: d
      });
    }), c) : c;
  };
z.propTypes = {
  src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool
}, L.displayName = "Picture", L.propTypes = {
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool,
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string
  }),
  sources: prop_types__WEBPACK_IMPORTED_MODULE_2__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  }), prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  })]))
};
var q = ["fallback"],
  C = function (t) {
    var a = t.fallback,
      i = o(t, q);
    return a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(L, n({}, i, {
      fallback: {
        src: a
      },
      "aria-hidden": !0,
      alt: ""
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", n({}, i));
  };
C.displayName = "Placeholder", C.propTypes = {
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  sources: null == (A = L.propTypes) ? void 0 : A.sources,
  alt: function (e, t, a) {
    return e[t] ? new Error("Invalid prop `" + t + "` supplied to `" + a + "`. Validation failed.") : null;
  }
};
var D = function (t) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(L, n({}, t)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("noscript", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(L, n({}, t, {
    shouldLoad: !0
  }))));
};
D.displayName = "MainImage", D.propTypes = L.propTypes;
var P = ["children"],
  H = function () {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
      type: "module",
      dangerouslySetInnerHTML: {
        __html: 'const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img[data-main-image]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source[data-srcset]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1,e.parentNode.parentNode.querySelector("[data-placeholder-image]").style.opacity=0)}}'
      }
    });
  },
  F = function (t) {
    var a = t.layout,
      i = t.width,
      r = t.height;
    return "fullWidth" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      "aria-hidden": !0,
      style: {
        paddingTop: r / i * 100 + "%"
      }
    }) : "constrained" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        maxWidth: i,
        display: "block"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
      alt: "",
      role: "presentation",
      "aria-hidden": "true",
      src: "data:image/svg+xml;charset=utf-8,%3Csvg%20height='" + r + "'%20width='" + i + "'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E",
      style: {
        maxWidth: "100%",
        display: "block",
        position: "static"
      }
    })) : null;
  },
  B = function (a) {
    var i = a.children,
      r = o(a, P);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(F, n({}, r)), i, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(H, null));
  },
  G = ["as", "className", "class", "style", "image", "loading", "imgClassName", "imgStyle", "backgroundColor", "objectFit", "objectPosition"],
  V = ["style", "className"],
  U = function (e) {
    return e.replace(/\n/g, "");
  },
  X = function (t) {
    var a = t.as,
      i = void 0 === a ? "div" : a,
      r = t.className,
      s = t.class,
      l = t.style,
      u = t.image,
      d = t.loading,
      c = void 0 === d ? "lazy" : d,
      h = t.imgClassName,
      g = t.imgStyle,
      p = t.backgroundColor,
      m = t.objectFit,
      f = t.objectPosition,
      v = o(t, G);
    if (!u) return console.warn("[gatsby-plugin-image] Missing image prop"), null;
    s && (r = s), g = n({
      objectFit: m,
      objectPosition: f,
      backgroundColor: p
    }, g);
    var w = u.width,
      y = u.height,
      b = u.layout,
      k = u.images,
      E = u.placeholder,
      M = u.backgroundColor,
      S = function (e, t, a) {
        var i = {},
          r = "gatsby-image-wrapper";
        return x() || (i.position = "relative", i.overflow = "hidden"), "fixed" === a ? (i.width = e, i.height = t) : "constrained" === a && (x() || (i.display = "inline-block", i.verticalAlign = "top"), r = "gatsby-image-wrapper gatsby-image-wrapper-constrained"), {
          className: r,
          "data-gatsby-image-wrapper": "",
          style: i
        };
      }(w, y, b),
      N = S.style,
      I = S.className,
      W = o(S, V),
      j = {
        fallback: void 0,
        sources: []
      };
    return k.fallback && (j.fallback = n({}, k.fallback, {
      srcSet: k.fallback.srcSet ? U(k.fallback.srcSet) : void 0
    })), k.sources && (j.sources = k.sources.map(function (e) {
      return n({}, e, {
        srcSet: U(e.srcSet)
      });
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(i, n({}, W, {
      style: n({}, N, l, {
        backgroundColor: p
      }),
      className: I + (r ? " " + r : "")
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(B, {
      layout: b,
      width: w,
      height: y
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(C, n({}, function (e, t, a, i, r, o, s, l) {
      var u = {};
      o && (u.backgroundColor = o, "fixed" === a ? (u.width = i, u.height = r, u.backgroundColor = o, u.position = "relative") : ("constrained" === a || "fullWidth" === a) && (u.position = "absolute", u.top = 0, u.left = 0, u.bottom = 0, u.right = 0)), s && (u.objectFit = s), l && (u.objectPosition = l);
      var d = n({}, e, {
        "aria-hidden": !0,
        "data-placeholder-image": "",
        style: n({
          opacity: 1,
          transition: "opacity 500ms linear"
        }, u)
      });
      return x() || (d.style = {
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%"
      }), d;
    }(E, 0, b, w, y, M, m, f))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(D, n({
      "data-gatsby-image-ssr": "",
      className: h
    }, v, function (e, t, a, i, r) {
      return void 0 === r && (r = {}), x() || (r = n({
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        transform: "translateZ(0)",
        transition: "opacity 250ms linear",
        width: "100%",
        willChange: "opacity"
      }, r)), n({}, a, {
        loading: i,
        shouldLoad: e,
        "data-main-image": "",
        style: n({}, r, {
          opacity: 0
        })
      });
    }("eager" === c, 0, j, c, g)))));
  },
  Y = ["src", "__imageData", "__error", "width", "height", "aspectRatio", "tracedSVGOptions", "placeholder", "formats", "quality", "transformOptions", "jpgOptions", "pngOptions", "webpOptions", "avifOptions", "blurredOptions", "breakpoints", "outputPixelDensities"],
  Z = function (t) {
    return function (a) {
      var i = a.src,
        r = a.__imageData,
        s = a.__error,
        l = o(a, Y);
      return s && console.warn(s), r ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t, n({
        image: r
      }, l)) : (console.warn("Image not loaded", i), s || "development" !== "development" || console.warn('Please ensure that "gatsby-plugin-image" is included in the plugins array in gatsby-config.js, and that your version of gatsby is at least 2.24.78'), null);
    };
  }(X),
  J = function (e, t) {
    return "fullWidth" !== e.layout || "width" !== t && "height" !== t || !e[t] ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().number.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t].concat([].slice.call(arguments, 2))) : new Error('"' + t + '" ' + e[t] + " may not be passed when layout is fullWidth.");
  },
  K = new Set(["fixed", "fullWidth", "constrained"]),
  Q = {
    src: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
    alt: function (e, t, a) {
      return e.alt || "" === e.alt ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t, a].concat([].slice.call(arguments, 3))) : new Error('The "alt" prop is required in ' + a + '. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html');
    },
    width: J,
    height: J,
    sizes: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    layout: function (e) {
      if (void 0 !== e.layout && !K.has(e.layout)) return new Error("Invalid value " + e.layout + '" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".');
    }
  };
Z.displayName = "StaticImage", Z.propTypes = Q;


/***/ }),

/***/ "./public/page-data/sq/d/3159585216.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/3159585216.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"data":{"site":{"siteMetadata":{"title":"Marco Ramirez Portfolio"}}}}');

/***/ }),

/***/ "./src/assets/logos/github.svg":
/*!*************************************!*\
  !*** ./src/assets/logos/github.svg ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyIDBDNS4zNyAwIDAgNS4zNyAwIDEyQzAgMTcuMzEgMy40MzUgMjEuNzk1IDguMjA1IDIzLjM4NUM4LjgwNSAyMy40OSA5LjAzIDIzLjEzIDkuMDMgMjIuODE1QzkuMDMgMjIuNTMgOS4wMTUgMjEuNTg1IDkuMDE1IDIwLjU4QzYgMjEuMTM1IDUuMjIgMTkuODQ1IDQuOTggMTkuMTdDNC44NDUgMTguODI1IDQuMjYgMTcuNzYgMy43NSAxNy40NzVDMy4zMyAxNy4yNSAyLjczIDE2LjY5NSAzLjczNSAxNi42OEM0LjY4IDE2LjY2NSA1LjM1NSAxNy41NSA1LjU4IDE3LjkxQzYuNjYgMTkuNzI1IDguMzg1IDE5LjIxNSA5LjA3NSAxOC45QzkuMTggMTguMTIgOS40OTUgMTcuNTk1IDkuODQgMTcuMjk1QzcuMTcgMTYuOTk1IDQuMzggMTUuOTYgNC4zOCAxMS4zN0M0LjM4IDEwLjA2NSA0Ljg0NSA4Ljk4NSA1LjYxIDguMTQ1QzUuNDkgNy44NDUgNS4wNyA2LjYxNSA1LjczIDQuOTY1QzUuNzMgNC45NjUgNi43MzUgNC42NSA5LjAzIDYuMTk1QzkuOTkgNS45MjUgMTEuMDEgNS43OSAxMi4wMyA1Ljc5QzEzLjA1IDUuNzkgMTQuMDcgNS45MjUgMTUuMDMgNi4xOTVDMTcuMzI1IDQuNjM1IDE4LjMzIDQuOTY1IDE4LjMzIDQuOTY1QzE4Ljk5IDYuNjE1IDE4LjU3IDcuODQ1IDE4LjQ1IDguMTQ1QzE5LjIxNSA4Ljk4NSAxOS42OCAxMC4wNSAxOS42OCAxMS4zN0MxOS42OCAxNS45NzUgMTYuODc1IDE2Ljk5NSAxNC4yMDUgMTcuMjk1QzE0LjY0IDE3LjY3IDE1LjAxNSAxOC4zOSAxNS4wMTUgMTkuNTE1QzE1LjAxNSAyMS4xMiAxNSAyMi40MSAxNSAyMi44MTVDMTUgMjMuMTMgMTUuMjI1IDIzLjUwNSAxNS44MjUgMjMuMzg1QzE4LjIwNzIgMjIuNTgwOCAyMC4yNzczIDIxLjA0OTggMjEuNzQzOCAxOS4wMDc0QzIzLjIxMDMgMTYuOTY1MSAyMy45OTk0IDE0LjUxNDMgMjQgMTJDMjQgNS4zNyAxOC42MyAwIDEyIDBaIiBmaWxsPSIjZjJmNWVhIi8+Cjwvc3ZnPg==");

/***/ }),

/***/ "./src/assets/logos/internet.svg":
/*!***************************************!*\
  !*** ./src/assets/logos/internet.svg ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgZmlsbD0iI2YyZjVlYSIgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgaWQ9IkxheWVyXzEiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQoNCjxnPg0KDQo8cGF0aCBkPSJtNDM3LjAyIDc0Ljk4Yy00OC4zNTMtNDguMzUyLTExMi42NC03NC45OC0xODEuMDItNzQuOThzLTEzMi42NjcgMjYuNjI4LTE4MS4wMiA3NC45OC03NC45OCAxMTIuNjQtNzQuOTggMTgxLjAyIDI2LjYyOCAxMzIuNjY3IDc0Ljk4IDE4MS4wMiAxMTIuNjQgNzQuOTggMTgxLjAyIDc0Ljk4IDEzMi42NjctMjYuNjI4IDE4MS4wMi03NC45OCA3NC45OC0xMTIuNjQgNzQuOTgtMTgxLjAyLTI2LjYyOC0xMzIuNjY3LTc0Ljk4LTE4MS4wMnptLTIuMTMyIDMxNS42NzljLTE1LjMxLTEwLjM2MS0zMS4zMzYtMTkuMzE0LTQ3Ljk1Mi0yNi43ODkgNy4zMzktMjguNjE3IDExLjY5Ny01OS42ODggMTIuNzg0LTkxLjg3aDc5LjcwMmMtMy4xNDQgNDQuMzM2LTE5LjI0NCA4NS4xNDctNDQuNTM0IDExOC42NTl6bS00MDIuMzEtMTE4LjY1OWg3OS43MDJjMS4wODggMzIuMTgzIDUuNDQ2IDYzLjI1NCAxMi43ODQgOTEuODctMTYuNjE2IDcuNDc1LTMyLjY0MiAxNi40MjctNDcuOTUyIDI2Ljc4OS0yNS4yOS0zMy41MTItNDEuMzktNzQuMzIzLTQ0LjUzNC0xMTguNjU5em00NC41My0xNTAuNjU0YzE1LjMxIDEwLjM2MiAzMS4zMzYgMTkuMzE1IDQ3Ljk1NCAyNi43OS03LjMzOCAyOC42MTUtMTEuNjk1IDU5LjY4My0xMi43ODMgOTEuODY0aC03OS43MDFjMy4xNDQtNDQuMzM0IDE5LjI0My04NS4xNDIgNDQuNTMtMTE4LjY1NHptMjgzLjUxOS00Mi41ODFjLTUuODYzLTEwLjk5Mi0xMi4xOTgtMjAuOTExLTE4LjkzNS0yOS43MTMgMjcuMDY5IDExLjI1IDUxLjQ3MyAyNy42NTggNzEuOTc3IDQ3Ljk5Ny0xMS42MjUgNy42MzgtMjMuNzAyIDE0LjM2OS0zNi4xNTUgMjAuMTg1LTQuODg2LTEzLjY2NC0xMC41MjgtMjYuNTQ3LTE2Ljg4Ny0zOC40Njl6bS0xMi45NjUgNTAuNDA0Yy0yOS4yMTEgOS43OTItNjAuMDM5IDE0LjgzMS05MS42NjIgMTQuODMxcy02Mi40NTEtNS4wMzktOTEuNjYyLTE0LjgzMWMyMC40NjMtNTguMjUzIDU0LjI3My05Ny4xNjkgOTEuNjYyLTk3LjE2OXM3MS4xOTkgMzguOTE2IDkxLjY2MiA5Ny4xNjl6bS0yMDMuMzU5IDExMC44MzFjMS4wNTYtMjguMzQyIDQuODg1LTU1LjQyMSAxMC45MzctODAuMTE2IDMyLjEzNiAxMC42NDQgNjYuMDE4IDE2LjExNiAxMDAuNzYgMTYuMTE2czY4LjYyNC01LjQ3MiAxMDAuNzYtMTYuMTE2YzYuMDUzIDI0LjY5NSA5Ljg4MSA1MS43NzMgMTAuOTM3IDgwLjExNnptMjIzLjM5NCAzMmMtMS4wNTcgMjguMzQ0LTQuODg1IDU1LjQyNC0xMC45MzggODAuMTItMzIuMTM5LTEwLjY0Ni02Ni4wMi0xNi4xMi0xMDAuNzU5LTE2LjEycy02OC42MiA1LjQ3NC0xMDAuNzU5IDE2LjEyYy02LjA1My0yNC42OTYtOS44ODItNTEuNzc2LTEwLjkzOC04MC4xMnptLTIxNi4zMjQtMTkzLjIzNWMtNi4zNTggMTEuOTIyLTEyIDI0LjgwNS0xNi44ODcgMzguNDY4LTEyLjQ1Mi01LjgxNS0yNC41My0xMi41NDctMzYuMTU1LTIwLjE4NSAyMC41MDMtMjAuMzQgNDQuOTA3LTM2Ljc0NyA3MS45NzctNDcuOTk3LTYuNzM3IDguODAzLTEzLjA3MyAxOC43MjItMTguOTM1IDI5LjcxNHptLTE2Ljg4NiAzMTYuMDA4YzQuODg2IDEzLjY2MSAxMC41MjggMjYuNTQyIDE2Ljg4NSAzOC40NjIgNS44NjMgMTAuOTkyIDEyLjE5OCAyMC45MTEgMTguOTM1IDI5LjcxMy0yNy4wNjctMTEuMjUtNTEuNDY5LTI3LjY1NS03MS45NzEtNDcuOTkyIDExLjYyNS03LjYzNyAyMy43MDEtMTQuMzY4IDM2LjE1MS0yMC4xODN6bTI5Ljg1My0xMS45MzhjMjkuMjEzLTkuNzk0IDYwLjA0LTE0LjgzNSA5MS42Ni0xNC44MzVzNjIuNDQ3IDUuMDQxIDkxLjY2IDE0LjgzNWMtMjAuNDYzIDU4LjI1MS01NC4yNzIgOTcuMTY1LTkxLjY2IDk3LjE2NXMtNzEuMTk3LTM4LjkxNC05MS42Ni05Ny4xNjV6bTE5Ni4yODcgNTAuNGM2LjM1Ny0xMS45MiAxMS45OTktMjQuODAxIDE2Ljg4NS0zOC40NjIgMTIuNDUxIDUuODE1IDI0LjUyNyAxMi41NDcgMzYuMTUxIDIwLjE4My0yMC41MDIgMjAuMzM3LTQ0LjkwNCAzNi43NDMtNzEuOTcxIDQ3Ljk5MiA2LjczNy04LjgwMiAxMy4wNzMtMTguNzIxIDE4LjkzNS0yOS43MTN6bTM5LjA5My0xOTMuMjM1Yy0xLjA4OC0zMi4xOC01LjQ0NS02My4yNDktMTIuNzgzLTkxLjg2NCAxNi42MTgtNy40NzUgMzIuNjQ1LTE2LjQyOCA0Ny45NTQtMjYuNzkgMjUuMjg3IDMzLjUxMSA0MS4zODYgNzQuMzE5IDQ0LjUzIDExOC42NTR6Ii8+DQoNCjwvZz4NCg0KPC9zdmc+");

/***/ }),

/***/ "./src/components/layout.js":
/*!**********************************!*\
  !*** ./src/components/layout.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _components_layout_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/layout.module.scss */ "./src/components/layout.module.scss");




const Layout = ({
  pageTitle,
  children
}) => {
  const mainRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const svgRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const lightRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const svg = svgRef.current;
    const light = lightRef.current;
    if (svg && light) {
      const handleMouseMove = e => {
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("header", {
    className: _components_layout_module_scss__WEBPACK_IMPORTED_MODULE_2__.header
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: _components_layout_module_scss__WEBPACK_IMPORTED_MODULE_2__.logo
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", {
    className: _components_layout_module_scss__WEBPACK_IMPORTED_MODULE_2__.nav
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    className: _components_layout_module_scss__WEBPACK_IMPORTED_MODULE_2__.link,
    to: "/"
  }, "Home"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    className: _components_layout_module_scss__WEBPACK_IMPORTED_MODULE_2__.link,
    to: "/about"
  }, "About"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    ref: svgRef,
    className: _components_layout_module_scss__WEBPACK_IMPORTED_MODULE_2__.svg
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("main", {
    className: _components_layout_module_scss__WEBPACK_IMPORTED_MODULE_2__.main,
    ref: mainRef
  }, children)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    ref: lightRef,
    className: _components_layout_module_scss__WEBPACK_IMPORTED_MODULE_2__.light
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/components/layout.module.scss":
/*!*******************************************!*\
  !*** ./src/components/layout.module.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   before_main: () => (/* binding */ before_main),
/* harmony export */   fadeIn: () => (/* binding */ fadeIn),
/* harmony export */   header: () => (/* binding */ header),
/* harmony export */   light: () => (/* binding */ light),
/* harmony export */   link: () => (/* binding */ link),
/* harmony export */   logo: () => (/* binding */ logo),
/* harmony export */   main: () => (/* binding */ main),
/* harmony export */   nav: () => (/* binding */ nav),
/* harmony export */   svg: () => (/* binding */ svg)
/* harmony export */ });
// Exports
var header = "layout-module--header--6a868";
var logo = "layout-module--logo--d069a";
var nav = "layout-module--nav--dad1f";
var link = "layout-module--link--e8e0c";
var main = "layout-module--main--6b2f2";
var fadeIn = "layout-module--fadeIn--ce902";
var svg = "layout-module--svg--26d29";
var before_main = "layout-module--before_main--8e73c";
var light = "layout-module--light--bccac";


/***/ }),

/***/ "./src/components/seo.js":
/*!*******************************!*\
  !*** ./src/components/seo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_3159585216_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/3159585216.json */ "./public/page-data/sq/d/3159585216.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Seo = ({
  title
}) => {
  const data = _public_page_data_sq_d_3159585216_json__WEBPACK_IMPORTED_MODULE_0__.data;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("title", null, title, " | ", data.site.siteMetadata.title);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Seo);

/***/ }),

/***/ "./src/content/projs/proj1.mdx":
/*!*************************************!*\
  !*** ./src/content/projs/proj1.mdx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mdx-js/react */ "./node_modules/@mdx-js/react/lib/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/*@jsxRuntime classic @jsx React.createElement @jsxFrag React.Fragment*/


function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    ul: "ul",
    li: "li"
  }, (0,_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.useMDXComponents)(), props.components);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components.h1, null, "Keurig Recreation"), "\n", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components.p, null, "A simple, yet very fun project to work on. The goal was to recreate the Keurig website using HTML, CSS, and JavaScript. It was a great way to brush up on the basics, while also adhering to the design and functionality of the original website."), "\n", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components.p, null, "It was a fun way to practice building off of a \"prototype\", and allowed me to try to attempt and make a accurate recreation of a professional design."), "\n", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components.h2, null, "Technology Used"), "\n", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components.ul, null, "\n", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components.li, null, "JQuery"), "\n", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components.li, null, "Firebase Authentication"), "\n", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components.li, null, "LocalStorage"), "\n"));
}
function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = Object.assign({}, (0,_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.useMDXComponents)(), props.components);
  return MDXLayout ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MDXLayout, props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_createMdxContent, props)) : _createMdxContent(props);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MDXContent);

/***/ }),

/***/ "./src/pages/content.module.scss":
/*!***************************************!*\
  !*** ./src/pages/content.module.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cLogo: () => (/* binding */ cLogo),
/* harmony export */   contact: () => (/* binding */ contact),
/* harmony export */   contactOptions: () => (/* binding */ contactOptions),
/* harmony export */   details: () => (/* binding */ details),
/* harmony export */   fadeIn: () => (/* binding */ fadeIn),
/* harmony export */   flair: () => (/* binding */ flair),
/* harmony export */   greeting: () => (/* binding */ greeting),
/* harmony export */   header: () => (/* binding */ header),
/* harmony export */   home: () => (/* binding */ home),
/* harmony export */   info: () => (/* binding */ info),
/* harmony export */   left: () => (/* binding */ left),
/* harmony export */   linkTo: () => (/* binding */ linkTo),
/* harmony export */   projectDetails: () => (/* binding */ projectDetails),
/* harmony export */   seperator: () => (/* binding */ seperator),
/* harmony export */   subHeader: () => (/* binding */ subHeader),
/* harmony export */   subtitle: () => (/* binding */ subtitle)
/* harmony export */ });
// Exports
var home = "content-module--home--03ad9";
var header = "content-module--header--52a34";
var greeting = "content-module--greeting--f7eda";
var subHeader = "content-module--subHeader--6c408";
var flair = "content-module--flair--14713";
var subtitle = "content-module--subtitle--48a2e";
var linkTo = "content-module--linkTo--288cb";
var seperator = "content-module--seperator--71ce9";
var contactOptions = "content-module--contactOptions--f5367";
var fadeIn = "content-module--fadeIn--9e290";
var cLogo = "content-module--cLogo--f8b6b";
var contact = "content-module--contact--312eb";
var projectDetails = "content-module--projectDetails--56a5e";
var details = "content-module--details--c857c";
var info = "content-module--info--bf89f";
var left = "content-module--left--87cfd";


/***/ }),

/***/ "./src/pages/projects/{mdx.frontmatter__slug}.js?__contentFilePath=/Users/marco/Documents/personalProjs/portfolio/src/content/projs/proj1.mdx&export=default":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./src/pages/projects/{mdx.frontmatter__slug}.js?__contentFilePath=/Users/marco/Documents/personalProjs/portfolio/src/content/projs/proj1.mdx&export=default ***!
  \*******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Head: () => (/* binding */ Head),
/* harmony export */   "default": () => (/* binding */ GatsbyMDXWrapper)
/* harmony export */ });
/* harmony import */ var _Users_marco_Documents_personalProjs_portfolio_src_content_projs_proj1_mdx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/content/projs/proj1.mdx */ "./src/content/projs/proj1.mdx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mdx-js/react */ "./node_modules/@mdx-js/react/lib/index.js");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");
/* harmony import */ var _content_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../content.module.scss */ "./src/pages/content.module.scss");
/* harmony import */ var _assets_logos_github_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/logos/github.svg */ "./src/assets/logos/github.svg");
/* harmony import */ var _assets_logos_internet_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../assets/logos/internet.svg */ "./src/assets/logos/internet.svg");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/layout */ "./src/components/layout.js");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/seo */ "./src/components/seo.js");










const MDXStyling = props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("li", Object.assign({
  style: {
    marginLeft: "3%"
  }
}, props));
const Project = ({
  data,
  children
}) => {
  const image = (0,gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_8__.getImage)(data.mdx.frontmatter.image);
  const {
    frontmatter
  } = data.mdx;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_layout__WEBPACK_IMPORTED_MODULE_6__["default"], {
    pageTitle: "Project Description"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: _content_module_scss__WEBPACK_IMPORTED_MODULE_3__.projectDetails
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
    className: _content_module_scss__WEBPACK_IMPORTED_MODULE_3__.flair,
    to: "/"
  }, "Back to projects"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: _content_module_scss__WEBPACK_IMPORTED_MODULE_3__.details
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: _content_module_scss__WEBPACK_IMPORTED_MODULE_3__.left
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_8__.GatsbyImage, {
    image: image,
    alt: "Project Photo"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: _content_module_scss__WEBPACK_IMPORTED_MODULE_3__.contactOptions
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", {
    target: "_blank",
    rel: "noreferrer",
    href: frontmatter.url
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("img", {
    className: _content_module_scss__WEBPACK_IMPORTED_MODULE_3__.cLogo,
    src: _assets_logos_internet_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
    alt: "live server"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", {
    target: "_blank",
    rel: "noreferrer",
    href: frontmatter.github
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("img", {
    className: _content_module_scss__WEBPACK_IMPORTED_MODULE_3__.cLogo,
    src: _assets_logos_github_svg__WEBPACK_IMPORTED_MODULE_4__["default"],
    alt: "github"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: _content_module_scss__WEBPACK_IMPORTED_MODULE_3__.info
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mdx_js_react__WEBPACK_IMPORTED_MODULE_9__.MDXProvider, {
    components: {
      li: MDXStyling
    }
  }, children)))));
};
const query = "3748910434";
const Head = ({
  data
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_seo__WEBPACK_IMPORTED_MODULE_7__["default"], {
  title: data.mdx.frontmatter.title
});
Project;
function GatsbyMDXWrapper(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Project, props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Users_marco_Documents_personalProjs_portfolio_src_content_projs_proj1_mdx__WEBPACK_IMPORTED_MODULE_0__["default"], props));
}

/***/ })

};
;
//# sourceMappingURL=component---src-pages-projects-mdx-frontmatter-slug-js-content-file-path-src-content-projs-proj-1-mdx.js.map