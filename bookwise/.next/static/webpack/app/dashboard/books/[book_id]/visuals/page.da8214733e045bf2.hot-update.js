"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/books/[book_id]/visuals/page",{

/***/ "(app-pages-browser)/./app/dashboard/books/[book_id]/visuals/page.tsx":
/*!********************************************************!*\
  !*** ./app/dashboard/books/[book_id]/visuals/page.tsx ***!
  \********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Visualize; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.tsx\");\n/* harmony import */ var _lib_operations_apiCalls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/operations/apiCalls */ \"(app-pages-browser)/./lib/operations/apiCalls.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Visualize(param) {\n    let { params } = param;\n    _s();\n    const [graphFilename, setGraphFilename] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(\"template.html\");\n    const [isGenerating, setIsGenerating] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_5__.useSearchParams)();\n    const user_id = searchParams.get(\"user_id\");\n    const book_id = params.book_id;\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        if (isGenerating) {\n            (0,_lib_operations_apiCalls__WEBPACK_IMPORTED_MODULE_3__.createKnowledgeGraph)({\n                user_id,\n                book_id\n            }).then((result)=>{\n                console.log(\"Knowledge graph created successfully\", result);\n                if (result.copyHTMLResponse.fileInfo.fileName) {\n                    setGraphFilename(result.copyHTMLResponse.fileInfo.fileName);\n                }\n            }).catch((error)=>{\n                console.error(\"Error creating knowledge graph:\", error);\n            }).finally(()=>{\n                setIsGenerating(false);\n            });\n        }\n    }, [\n        isGenerating,\n        user_id,\n        book_id\n    ]);\n    /*\n  const handleSubmit = async (book_user: SelectedBooksUsersResponse) => {\n    console.log(\"Handling submit...\");\n\n    try {\n      const result = await createKnowledgeGraph(book_user);\n      console.log('Knowledge graph created successfully', result);\n      console.log(result);\n      if (result.copyHTMLResponse.fileInfo.fileName) {\n        setGraphFilename(result.copyHTMLResponse.fileInfo.fileName);\n        console.log(\"Graph HTML Filename\");\n        console.log(result.copyHTMLResponse.fileInfo.fileName);\n      }\n    } catch (error) {\n      console.error(\"Error creating knowledge graph:\", error);\n    }\n  };\n  */ const handleSubmit = ()=>{\n        setIsGenerating(true);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"flex min-h-screen flex-col items-center space-y-8 p-24\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"py-10 space-x-4\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                    type: \"submit\",\n                    onClick: handleSubmit,\n                    disabled: isGenerating,\n                    children: isGenerating ? \"Generating...\" : \"Generate Knowledge Graph\"\n                }, void 0, false, {\n                    fileName: \"/Users/mukuflash/Documents/Projects/JS/bookwise_ai/bookwise/app/dashboard/books/[book_id]/visuals/page.tsx\",\n                    lineNumber: 73,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                    asChild: true,\n                    disabled: isGenerating,\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                        href: \"http://localhost:3000/generated_kg_html/\".concat(graphFilename),\n                        className: \"hover:underline\",\n                        target: \"_blank\",\n                        rel: \"noopener noreferrer\",\n                        children: \"View Knowledge Graph\"\n                    }, void 0, false, {\n                        fileName: \"/Users/mukuflash/Documents/Projects/JS/bookwise_ai/bookwise/app/dashboard/books/[book_id]/visuals/page.tsx\",\n                        lineNumber: 82,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/mukuflash/Documents/Projects/JS/bookwise_ai/bookwise/app/dashboard/books/[book_id]/visuals/page.tsx\",\n                    lineNumber: 81,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                    asChild: true,\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                        href: \"/dashboard/books/\".concat(book_id),\n                        children: \"Return to Book\"\n                    }, void 0, false, {\n                        fileName: \"/Users/mukuflash/Documents/Projects/JS/bookwise_ai/bookwise/app/dashboard/books/[book_id]/visuals/page.tsx\",\n                        lineNumber: 87,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/mukuflash/Documents/Projects/JS/bookwise_ai/bookwise/app/dashboard/books/[book_id]/visuals/page.tsx\",\n                    lineNumber: 86,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/mukuflash/Documents/Projects/JS/bookwise_ai/bookwise/app/dashboard/books/[book_id]/visuals/page.tsx\",\n            lineNumber: 68,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/mukuflash/Documents/Projects/JS/bookwise_ai/bookwise/app/dashboard/books/[book_id]/visuals/page.tsx\",\n        lineNumber: 67,\n        columnNumber: 5\n    }, this);\n}\n_s(Visualize, \"/UmJwNcq5ZXBYloYnb1NL/I2rqA=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_5__.useSearchParams\n    ];\n});\n_c = Visualize;\nvar _c;\n$RefreshReg$(_c, \"Visualize\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9kYXNoYm9hcmQvYm9va3MvW2Jvb2tfaWRdL3Zpc3VhbHMvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUU2QjtBQUNrQjtBQUVrQjtBQUNyQjtBQUNNO0FBU25DLFNBQVNNLFVBQVUsS0FBcUI7UUFBckIsRUFBRUMsTUFBTSxFQUFhLEdBQXJCOztJQUNoQyxNQUFNLENBQUNDLGVBQWVDLGlCQUFpQixHQUFHTiwrQ0FBUUEsQ0FBQztJQUNuRCxNQUFNLENBQUNPLGNBQWNDLGdCQUFnQixHQUFHUiwrQ0FBUUEsQ0FBQztJQUVqRCxNQUFNUyxlQUFlUCxnRUFBZUE7SUFDcEMsTUFBTVEsVUFBVUQsYUFBYUUsR0FBRyxDQUFDO0lBQ2pDLE1BQU1DLFVBQVVSLE9BQU9RLE9BQU87SUFFOUJYLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSU0sY0FBYztZQUNoQlIsOEVBQW9CQSxDQUFDO2dCQUFFVztnQkFBU0U7WUFBUSxHQUNyQ0MsSUFBSSxDQUFDQyxDQUFBQTtnQkFDSkMsUUFBUUMsR0FBRyxDQUFDLHdDQUF3Q0Y7Z0JBQ3BELElBQUlBLE9BQU9HLGdCQUFnQixDQUFDQyxRQUFRLENBQUNDLFFBQVEsRUFBRTtvQkFDN0NiLGlCQUFpQlEsT0FBT0csZ0JBQWdCLENBQUNDLFFBQVEsQ0FBQ0MsUUFBUTtnQkFDNUQ7WUFDRixHQUNDQyxLQUFLLENBQUNDLENBQUFBO2dCQUNMTixRQUFRTSxLQUFLLENBQUMsbUNBQW1DQTtZQUNuRCxHQUNDQyxPQUFPLENBQUM7Z0JBQ1BkLGdCQUFnQjtZQUNsQjtRQUNKO0lBQ0YsR0FBRztRQUFDRDtRQUFjRztRQUFTRTtLQUFRO0lBRW5DOzs7Ozs7Ozs7Ozs7Ozs7OztFQWlCQSxHQUVBLE1BQU1XLGVBQWU7UUFDbkJmLGdCQUFnQjtJQUNsQjtJQUVBLHFCQUNFLDhEQUFDZ0I7UUFBS0MsV0FBVTtrQkFDZCw0RUFBQ0M7WUFBSUQsV0FBVTs7OEJBS2IsOERBQUMzQix5REFBTUE7b0JBQUM2QixNQUFLO29CQUFTQyxTQUFTTDtvQkFBY00sVUFBVXRCOzhCQUNwREEsZUFBZSxrQkFBa0I7Ozs7Ozs4QkFPcEMsOERBQUNULHlEQUFNQTtvQkFBQ2dDLE9BQU87b0JBQUNELFVBQVV0Qjs4QkFDeEIsNEVBQUNWLGlEQUFJQTt3QkFBQ2tDLE1BQU0sMkNBQXlELE9BQWQxQjt3QkFBaUJvQixXQUFVO3dCQUFrQk8sUUFBTzt3QkFBU0MsS0FBSTtrQ0FBc0I7Ozs7Ozs7Ozs7OzhCQUloSiw4REFBQ25DLHlEQUFNQTtvQkFBQ2dDLE9BQU87OEJBQ2IsNEVBQUNqQyxpREFBSUE7d0JBQUNrQyxNQUFNLG9CQUE0QixPQUFSbkI7a0NBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLckQ7R0EzRXdCVDs7UUFJREQsNERBQWVBOzs7S0FKZEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2Rhc2hib2FyZC9ib29rcy9bYm9va19pZF0vdmlzdWFscy9wYWdlLnRzeD80NjBmIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvYnV0dG9uXCJcbmltcG9ydCB7IFNlbGVjdGVkQm9va3NVc2Vyc1Jlc3BvbnNlIH0gZnJvbSAnQC9saWIvdHlwZXMvYm9va3NfdXNlcnMnO1xuaW1wb3J0IHsgY3JlYXRlS25vd2xlZGdlR3JhcGggfSBmcm9tICdAL2xpYi9vcGVyYXRpb25zL2FwaUNhbGxzJztcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTZWFyY2hQYXJhbXMgfSBmcm9tICduZXh0L25hdmlnYXRpb24nO1xuXG5cbmludGVyZmFjZSBCb29rUHJvcHMge1xuICBwYXJhbXM6IHtcbiAgICBib29rX2lkOiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFZpc3VhbGl6ZSh7IHBhcmFtcyB9OiBCb29rUHJvcHMpIHtcbiAgY29uc3QgW2dyYXBoRmlsZW5hbWUsIHNldEdyYXBoRmlsZW5hbWVdID0gdXNlU3RhdGUoJ3RlbXBsYXRlLmh0bWwnKTtcbiAgY29uc3QgW2lzR2VuZXJhdGluZywgc2V0SXNHZW5lcmF0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBzZWFyY2hQYXJhbXMgPSB1c2VTZWFyY2hQYXJhbXMoKTtcbiAgY29uc3QgdXNlcl9pZCA9IHNlYXJjaFBhcmFtcy5nZXQoJ3VzZXJfaWQnKSBhcyBzdHJpbmc7XG4gIGNvbnN0IGJvb2tfaWQgPSBwYXJhbXMuYm9va19pZDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0dlbmVyYXRpbmcpIHtcbiAgICAgIGNyZWF0ZUtub3dsZWRnZUdyYXBoKHsgdXNlcl9pZCwgYm9va19pZCB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdLbm93bGVkZ2UgZ3JhcGggY3JlYXRlZCBzdWNjZXNzZnVsbHknLCByZXN1bHQpO1xuICAgICAgICAgIGlmIChyZXN1bHQuY29weUhUTUxSZXNwb25zZS5maWxlSW5mby5maWxlTmFtZSkge1xuICAgICAgICAgICAgc2V0R3JhcGhGaWxlbmFtZShyZXN1bHQuY29weUhUTUxSZXNwb25zZS5maWxlSW5mby5maWxlTmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjcmVhdGluZyBrbm93bGVkZ2UgZ3JhcGg6XCIsIGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgIHNldElzR2VuZXJhdGluZyhmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSwgW2lzR2VuZXJhdGluZywgdXNlcl9pZCwgYm9va19pZF0pO1xuXG4gIC8qXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChib29rX3VzZXI6IFNlbGVjdGVkQm9va3NVc2Vyc1Jlc3BvbnNlKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJIYW5kbGluZyBzdWJtaXQuLi5cIik7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY3JlYXRlS25vd2xlZGdlR3JhcGgoYm9va191c2VyKTtcbiAgICAgIGNvbnNvbGUubG9nKCdLbm93bGVkZ2UgZ3JhcGggY3JlYXRlZCBzdWNjZXNzZnVsbHknLCByZXN1bHQpO1xuICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgIGlmIChyZXN1bHQuY29weUhUTUxSZXNwb25zZS5maWxlSW5mby5maWxlTmFtZSkge1xuICAgICAgICBzZXRHcmFwaEZpbGVuYW1lKHJlc3VsdC5jb3B5SFRNTFJlc3BvbnNlLmZpbGVJbmZvLmZpbGVOYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJHcmFwaCBIVE1MIEZpbGVuYW1lXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuY29weUhUTUxSZXNwb25zZS5maWxlSW5mby5maWxlTmFtZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjcmVhdGluZyBrbm93bGVkZ2UgZ3JhcGg6XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG4gICovXG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gKCkgPT4ge1xuICAgIHNldElzR2VuZXJhdGluZyh0cnVlKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxtYWluIGNsYXNzTmFtZT1cImZsZXggbWluLWgtc2NyZWVuIGZsZXgtY29sIGl0ZW1zLWNlbnRlciBzcGFjZS15LTggcC0yNFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJweS0xMCBzcGFjZS14LTRcIj5cbiAgICAgICAgey8qIDxCdXR0b24gdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3VibWl0KHsgdXNlcl9pZCwgYm9va19pZCB9KX0+XG4gICAgICAgICAgR2VuZXJhdGUgS25vd2xlZGdlIEdyYXBoXG4gICAgICAgIDwvQnV0dG9uPiAqL31cbiAgICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCIgb25DbGljaz17aGFuZGxlU3VibWl0fSBkaXNhYmxlZD17aXNHZW5lcmF0aW5nfT5cbiAgICAgICAgICB7aXNHZW5lcmF0aW5nID8gJ0dlbmVyYXRpbmcuLi4nIDogJ0dlbmVyYXRlIEtub3dsZWRnZSBHcmFwaCd9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICB7LyogPEJ1dHRvbiBhc0NoaWxkPlxuICAgICAgICAgIDxMaW5rIGhyZWY9e2BodHRwOi8vbG9jYWxob3N0OjMwMDAvZ2VuZXJhdGVkX2tnX2h0bWwvJHtncmFwaEZpbGVuYW1lfWB9IGNsYXNzTmFtZT1cImhvdmVyOnVuZGVybGluZVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cbiAgICAgICAgICAgIFZpZXcgS25vd2xlZGdlIEdyYXBoXG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L0J1dHRvbj4gKi99XG4gICAgICAgIDxCdXR0b24gYXNDaGlsZCBkaXNhYmxlZD17aXNHZW5lcmF0aW5nfT5cbiAgICAgICAgICA8TGluayBocmVmPXtgaHR0cDovL2xvY2FsaG9zdDozMDAwL2dlbmVyYXRlZF9rZ19odG1sLyR7Z3JhcGhGaWxlbmFtZX1gfSBjbGFzc05hbWU9XCJob3Zlcjp1bmRlcmxpbmVcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XG4gICAgICAgICAgICBWaWV3IEtub3dsZWRnZSBHcmFwaFxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b24gYXNDaGlsZD5cbiAgICAgICAgICA8TGluayBocmVmPXtgL2Rhc2hib2FyZC9ib29rcy8ke2Jvb2tfaWR9YH0+UmV0dXJuIHRvIEJvb2s8L0xpbms+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9tYWluPlxuICApXG59XG4iXSwibmFtZXMiOlsiTGluayIsIkJ1dHRvbiIsImNyZWF0ZUtub3dsZWRnZUdyYXBoIiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VTZWFyY2hQYXJhbXMiLCJWaXN1YWxpemUiLCJwYXJhbXMiLCJncmFwaEZpbGVuYW1lIiwic2V0R3JhcGhGaWxlbmFtZSIsImlzR2VuZXJhdGluZyIsInNldElzR2VuZXJhdGluZyIsInNlYXJjaFBhcmFtcyIsInVzZXJfaWQiLCJnZXQiLCJib29rX2lkIiwidGhlbiIsInJlc3VsdCIsImNvbnNvbGUiLCJsb2ciLCJjb3B5SFRNTFJlc3BvbnNlIiwiZmlsZUluZm8iLCJmaWxlTmFtZSIsImNhdGNoIiwiZXJyb3IiLCJmaW5hbGx5IiwiaGFuZGxlU3VibWl0IiwibWFpbiIsImNsYXNzTmFtZSIsImRpdiIsInR5cGUiLCJvbkNsaWNrIiwiZGlzYWJsZWQiLCJhc0NoaWxkIiwiaHJlZiIsInRhcmdldCIsInJlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/dashboard/books/[book_id]/visuals/page.tsx\n"));

/***/ })

});