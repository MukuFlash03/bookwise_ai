"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/read-notes/route";
exports.ids = ["app/api/read-notes/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fread-notes%2Froute&page=%2Fapi%2Fread-notes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fread-notes%2Froute.ts&appDir=%2FUsers%2Fmukuflash%2FDocuments%2FProjects%2FJS%2Fbookwise_ai%2Fbookwise%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmukuflash%2FDocuments%2FProjects%2FJS%2Fbookwise_ai%2Fbookwise&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fread-notes%2Froute&page=%2Fapi%2Fread-notes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fread-notes%2Froute.ts&appDir=%2FUsers%2Fmukuflash%2FDocuments%2FProjects%2FJS%2Fbookwise_ai%2Fbookwise%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmukuflash%2FDocuments%2FProjects%2FJS%2Fbookwise_ai%2Fbookwise&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_mukuflash_Documents_Projects_JS_bookwise_ai_bookwise_app_api_read_notes_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/read-notes/route.ts */ \"(rsc)/./app/api/read-notes/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/read-notes/route\",\n        pathname: \"/api/read-notes\",\n        filename: \"route\",\n        bundlePath: \"app/api/read-notes/route\"\n    },\n    resolvedPagePath: \"/Users/mukuflash/Documents/Projects/JS/bookwise_ai/bookwise/app/api/read-notes/route.ts\",\n    nextConfigOutput,\n    userland: _Users_mukuflash_Documents_Projects_JS_bookwise_ai_bookwise_app_api_read_notes_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/read-notes/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZyZWFkLW5vdGVzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZyZWFkLW5vdGVzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcmVhZC1ub3RlcyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm11a3VmbGFzaCUyRkRvY3VtZW50cyUyRlByb2plY3RzJTJGSlMlMkZib29rd2lzZV9haSUyRmJvb2t3aXNlJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm11a3VmbGFzaCUyRkRvY3VtZW50cyUyRlByb2plY3RzJTJGSlMlMkZib29rd2lzZV9haSUyRmJvb2t3aXNlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUN1QztBQUNwSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2Jvb2t3aXNlLz81NTc5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9tdWt1Zmxhc2gvRG9jdW1lbnRzL1Byb2plY3RzL0pTL2Jvb2t3aXNlX2FpL2Jvb2t3aXNlL2FwcC9hcGkvcmVhZC1ub3Rlcy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcmVhZC1ub3Rlcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3JlYWQtbm90ZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3JlYWQtbm90ZXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvbXVrdWZsYXNoL0RvY3VtZW50cy9Qcm9qZWN0cy9KUy9ib29rd2lzZV9haS9ib29rd2lzZS9hcHAvYXBpL3JlYWQtbm90ZXMvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3JlYWQtbm90ZXMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fread-notes%2Froute&page=%2Fapi%2Fread-notes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fread-notes%2Froute.ts&appDir=%2FUsers%2Fmukuflash%2FDocuments%2FProjects%2FJS%2Fbookwise_ai%2Fbookwise%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmukuflash%2FDocuments%2FProjects%2FJS%2Fbookwise_ai%2Fbookwise&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/read-notes/route.ts":
/*!*************************************!*\
  !*** ./app/api/read-notes/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _utils_supabase_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/supabase/server */ \"(rsc)/./utils/supabase/server.ts\");\n\n\nasync function GET(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const user_id = searchParams.get(\"user_id\");\n        const book_id = searchParams.get(\"book_id\");\n        if (!user_id || !book_id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"User ID and Book ID are required\"\n            }, {\n                status: 400\n            });\n        }\n        const supabase = (0,_utils_supabase_server__WEBPACK_IMPORTED_MODULE_1__.createClient)();\n        const { data: BookUserData, error: BookUserError } = await supabase.from(\"bw_books_users\").select().eq(\"user_id\", user_id).eq(\"book_id\", book_id);\n        if (!BookUserData || BookUserData.length === 0) {\n            throw new Error(\"No matching book user found\");\n        }\n        const book_user_id = BookUserData[0].id;\n        // console.log(\"Book user id;\", book_user_id);\n        if (BookUserError) throw BookUserError;\n        const { data, error } = await supabase.from(\"bw_notes\").select().eq(\"book_user_id\", book_user_id);\n        if (error) throw error;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Notes fetched successfully\",\n            data\n        });\n    } catch (error) {\n        console.log(error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch notes\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3JlYWQtbm90ZXMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJDO0FBQ1k7QUFFaEQsZUFBZUUsSUFBSUMsT0FBZ0I7SUFDeEMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSUYsUUFBUUcsR0FBRztRQUM1QyxNQUFNQyxVQUFVSCxhQUFhSSxHQUFHLENBQUM7UUFDakMsTUFBTUMsVUFBVUwsYUFBYUksR0FBRyxDQUFDO1FBRWpDLElBQUksQ0FBQ0QsV0FBVyxDQUFDRSxTQUFTO1lBQ3hCLE9BQU9ULHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBbUMsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3hGO1FBQ0EsTUFBTUMsV0FBV1osb0VBQVlBO1FBRTdCLE1BQU0sRUFBRWEsTUFBTUMsWUFBWSxFQUFFSixPQUFPSyxhQUFhLEVBQUUsR0FBRyxNQUFNSCxTQUN4REksSUFBSSxDQUFDLGtCQUNMQyxNQUFNLEdBQ05DLEVBQUUsQ0FBQyxXQUFXWixTQUNkWSxFQUFFLENBQUMsV0FBV1Y7UUFHakIsSUFBSSxDQUFDTSxnQkFBZ0JBLGFBQWFLLE1BQU0sS0FBSyxHQUFHO1lBQzlDLE1BQU0sSUFBSUMsTUFBTTtRQUNsQjtRQUVBLE1BQU1DLGVBQWVQLFlBQVksQ0FBQyxFQUFFLENBQUNRLEVBQUU7UUFFdkMsOENBQThDO1FBRTlDLElBQUlQLGVBQWUsTUFBTUE7UUFFekIsTUFBTSxFQUFFRixJQUFJLEVBQUVILEtBQUssRUFBRSxHQUFHLE1BQU1FLFNBQzNCSSxJQUFJLENBQUMsWUFDTEMsTUFBTSxHQUNOQyxFQUFFLENBQUMsZ0JBQWdCRztRQUV0QixJQUFJWCxPQUFPLE1BQU1BO1FBRWpCLE9BQU9YLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRWMsU0FBUztZQUE4QlY7UUFBSztJQUN6RSxFQUFFLE9BQU9ILE9BQU87UUFDZGMsUUFBUUMsR0FBRyxDQUFDZjtRQUNaLE9BQU9YLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM3RTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm9va3dpc2UvLi9hcHAvYXBpL3JlYWQtbm90ZXMvcm91dGUudHM/OGU0MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAL3V0aWxzL3N1cGFiYXNlL3NlcnZlcic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcXVlc3QudXJsKTtcbiAgICBjb25zdCB1c2VyX2lkID0gc2VhcmNoUGFyYW1zLmdldCgndXNlcl9pZCcpO1xuICAgIGNvbnN0IGJvb2tfaWQgPSBzZWFyY2hQYXJhbXMuZ2V0KCdib29rX2lkJyk7XG5cbiAgICBpZiAoIXVzZXJfaWQgfHwgIWJvb2tfaWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVXNlciBJRCBhbmQgQm9vayBJRCBhcmUgcmVxdWlyZWQnIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KCk7XG5cbiAgICBjb25zdCB7IGRhdGE6IEJvb2tVc2VyRGF0YSwgZXJyb3I6IEJvb2tVc2VyRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbSgnYndfYm9va3NfdXNlcnMnKVxuICAgICAgLnNlbGVjdCgpXG4gICAgICAuZXEoJ3VzZXJfaWQnLCB1c2VyX2lkKVxuICAgICAgLmVxKCdib29rX2lkJywgYm9va19pZClcbiAgICAgIDtcblxuICAgIGlmICghQm9va1VzZXJEYXRhIHx8IEJvb2tVc2VyRGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbWF0Y2hpbmcgYm9vayB1c2VyIGZvdW5kJyk7XG4gICAgfVxuXG4gICAgY29uc3QgYm9va191c2VyX2lkID0gQm9va1VzZXJEYXRhWzBdLmlkO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJCb29rIHVzZXIgaWQ7XCIsIGJvb2tfdXNlcl9pZCk7XG5cbiAgICBpZiAoQm9va1VzZXJFcnJvcikgdGhyb3cgQm9va1VzZXJFcnJvcjtcblxuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAuZnJvbSgnYndfbm90ZXMnKVxuICAgICAgLnNlbGVjdCgpXG4gICAgICAuZXEoJ2Jvb2tfdXNlcl9pZCcsIGJvb2tfdXNlcl9pZClcblxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiAnTm90ZXMgZmV0Y2hlZCBzdWNjZXNzZnVsbHknLCBkYXRhIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCBub3RlcycgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNyZWF0ZUNsaWVudCIsIkdFVCIsInJlcXVlc3QiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJ1c2VyX2lkIiwiZ2V0IiwiYm9va19pZCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInN1cGFiYXNlIiwiZGF0YSIsIkJvb2tVc2VyRGF0YSIsIkJvb2tVc2VyRXJyb3IiLCJmcm9tIiwic2VsZWN0IiwiZXEiLCJsZW5ndGgiLCJFcnJvciIsImJvb2tfdXNlcl9pZCIsImlkIiwibWVzc2FnZSIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/read-notes/route.ts\n");

/***/ }),

/***/ "(rsc)/./utils/supabase/server.ts":
/*!**********************************!*\
  !*** ./utils/supabase/server.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createClient: () => (/* binding */ createClient)\n/* harmony export */ });\n/* harmony import */ var _supabase_ssr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/ssr */ \"(rsc)/./node_modules/@supabase/ssr/dist/module/index.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nfunction createClient() {\n    const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    return (0,_supabase_ssr__WEBPACK_IMPORTED_MODULE_0__.createServerClient)(\"https://qsaqmebruyslpdykmyvx.supabase.co\", \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzYXFtZWJydXlzbHBkeWtteXZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4OTUzOTYsImV4cCI6MjAzNzQ3MTM5Nn0.q2fXU5YOm8aaK4LOxsDKSpRqdfpqMzGx7JBdnv5CHi8\", {\n        cookies: {\n            get (name) {\n                return cookieStore.get(name)?.value;\n            },\n            set (name, value, options) {\n                try {\n                    cookieStore.set({\n                        name,\n                        value,\n                        ...options\n                    });\n                } catch (error) {\n                // The `set` method was called from a Server Component.\n                // This can be ignored if you have middleware refreshing\n                // user sessions.\n                }\n            },\n            remove (name, options) {\n                try {\n                    cookieStore.set({\n                        name,\n                        value: \"\",\n                        ...options\n                    });\n                } catch (error) {\n                // The `delete` method was called from a Server Component.\n                // This can be ignored if you have middleware refreshing\n                // user sessions.\n                }\n            }\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi91dGlscy9zdXBhYmFzZS9zZXJ2ZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXNFO0FBQ2hDO0FBRS9CLFNBQVNFO0lBQ2QsTUFBTUMsY0FBY0YscURBQU9BO0lBRTNCLE9BQU9ELGlFQUFrQkEsQ0FDdkJJLDBDQUFvQyxFQUNwQ0Esa05BQXlDLEVBQ3pDO1FBQ0VILFNBQVM7WUFDUE8sS0FBSUMsSUFBWTtnQkFDZCxPQUFPTixZQUFZSyxHQUFHLENBQUNDLE9BQU9DO1lBQ2hDO1lBQ0FDLEtBQUlGLElBQVksRUFBRUMsS0FBYSxFQUFFRSxPQUFzQjtnQkFDckQsSUFBSTtvQkFDRlQsWUFBWVEsR0FBRyxDQUFDO3dCQUFFRjt3QkFBTUM7d0JBQU8sR0FBR0UsT0FBTztvQkFBQztnQkFDNUMsRUFBRSxPQUFPQyxPQUFPO2dCQUNkLHVEQUF1RDtnQkFDdkQsd0RBQXdEO2dCQUN4RCxpQkFBaUI7Z0JBQ25CO1lBQ0Y7WUFDQUMsUUFBT0wsSUFBWSxFQUFFRyxPQUFzQjtnQkFDekMsSUFBSTtvQkFDRlQsWUFBWVEsR0FBRyxDQUFDO3dCQUFFRjt3QkFBTUMsT0FBTzt3QkFBSSxHQUFHRSxPQUFPO29CQUFDO2dCQUNoRCxFQUFFLE9BQU9DLE9BQU87Z0JBQ2QsMERBQTBEO2dCQUMxRCx3REFBd0Q7Z0JBQ3hELGlCQUFpQjtnQkFDbkI7WUFDRjtRQUNGO0lBQ0Y7QUFFSiIsInNvdXJjZXMiOlsid2VicGFjazovL2Jvb2t3aXNlLy4vdXRpbHMvc3VwYWJhc2Uvc2VydmVyLnRzPzBmNTUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2VydmVyQ2xpZW50LCB0eXBlIENvb2tpZU9wdGlvbnMgfSBmcm9tICdAc3VwYWJhc2Uvc3NyJ1xuaW1wb3J0IHsgY29va2llcyB9IGZyb20gJ25leHQvaGVhZGVycydcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNsaWVudCgpIHtcbiAgY29uc3QgY29va2llU3RvcmUgPSBjb29raWVzKClcblxuICByZXR1cm4gY3JlYXRlU2VydmVyQ2xpZW50KFxuICAgIHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCEsXG4gICAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkhLFxuICAgIHtcbiAgICAgIGNvb2tpZXM6IHtcbiAgICAgICAgZ2V0KG5hbWU6IHN0cmluZykge1xuICAgICAgICAgIHJldHVybiBjb29raWVTdG9yZS5nZXQobmFtZSk/LnZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHNldChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG9wdGlvbnM6IENvb2tpZU9wdGlvbnMpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29va2llU3RvcmUuc2V0KHsgbmFtZSwgdmFsdWUsIC4uLm9wdGlvbnMgfSlcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gVGhlIGBzZXRgIG1ldGhvZCB3YXMgY2FsbGVkIGZyb20gYSBTZXJ2ZXIgQ29tcG9uZW50LlxuICAgICAgICAgICAgLy8gVGhpcyBjYW4gYmUgaWdub3JlZCBpZiB5b3UgaGF2ZSBtaWRkbGV3YXJlIHJlZnJlc2hpbmdcbiAgICAgICAgICAgIC8vIHVzZXIgc2Vzc2lvbnMuXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZW1vdmUobmFtZTogc3RyaW5nLCBvcHRpb25zOiBDb29raWVPcHRpb25zKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvb2tpZVN0b3JlLnNldCh7IG5hbWUsIHZhbHVlOiAnJywgLi4ub3B0aW9ucyB9KVxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBUaGUgYGRlbGV0ZWAgbWV0aG9kIHdhcyBjYWxsZWQgZnJvbSBhIFNlcnZlciBDb21wb25lbnQuXG4gICAgICAgICAgICAvLyBUaGlzIGNhbiBiZSBpZ25vcmVkIGlmIHlvdSBoYXZlIG1pZGRsZXdhcmUgcmVmcmVzaGluZ1xuICAgICAgICAgICAgLy8gdXNlciBzZXNzaW9ucy5cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH1cbiAgKVxufSJdLCJuYW1lcyI6WyJjcmVhdGVTZXJ2ZXJDbGllbnQiLCJjb29raWVzIiwiY3JlYXRlQ2xpZW50IiwiY29va2llU3RvcmUiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJnZXQiLCJuYW1lIiwidmFsdWUiLCJzZXQiLCJvcHRpb25zIiwiZXJyb3IiLCJyZW1vdmUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./utils/supabase/server.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/cookie","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fread-notes%2Froute&page=%2Fapi%2Fread-notes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fread-notes%2Froute.ts&appDir=%2FUsers%2Fmukuflash%2FDocuments%2FProjects%2FJS%2Fbookwise_ai%2Fbookwise%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmukuflash%2FDocuments%2FProjects%2FJS%2Fbookwise_ai%2Fbookwise&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();