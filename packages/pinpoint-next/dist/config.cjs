"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/config.ts
var config_exports = {};
__export(config_exports, {
  default: () => pinpoint,
  pinpoint: () => pinpoint
});
module.exports = __toCommonJS(config_exports);
var import_node_module = require("module");
var import_meta = {};
var loaderPath = (() => {
  const baseUrl = import_meta.url ?? `file://${process.cwd()}/__pinpoint_config__.js`;
  const req = (0, import_node_module.createRequire)(baseUrl);
  try {
    return req.resolve("@pinpoint/next/loader");
  } catch {
    return req.resolve("./loader.cjs");
  }
})();
var PINPOINT_REWRITE = {
  source: "/__pinpoint/:path*",
  destination: "/pinpoint/:path*"
};
function pinpoint(config = {}, options = {}) {
  const userWebpack = config.webpack;
  const userRewrites = config.rewrites;
  const isDev = process.env.NODE_ENV !== "production";
  if (isDev && options.spawnAgent) {
    process.env.PINPOINT_SPAWN_AGENT = options.spawnAgent;
  } else if (isDev) {
    delete process.env.PINPOINT_SPAWN_AGENT;
  }
  const next = {
    ...config,
    webpack(webpackConfig, options2) {
      if (options2.dev && !options2.isServer) {
        webpackConfig.module = webpackConfig.module ?? {};
        webpackConfig.module.rules = webpackConfig.module.rules ?? [];
        webpackConfig.module.rules.unshift({
          test: /\.(t|j)sx$/,
          exclude: /node_modules/,
          use: [{ loader: loaderPath }]
        });
      }
      return userWebpack ? userWebpack(webpackConfig, options2) : webpackConfig;
    },
    async rewrites() {
      const existing = await (typeof userRewrites === "function" ? userRewrites() : Promise.resolve(userRewrites ?? []));
      if (!isDev) return existing;
      if (Array.isArray(existing)) {
        return [PINPOINT_REWRITE, ...existing];
      }
      const obj = existing;
      return {
        beforeFiles: [PINPOINT_REWRITE, ...obj.beforeFiles ?? []],
        afterFiles: obj.afterFiles ?? [],
        fallback: obj.fallback ?? []
      };
    }
  };
  if (isDev) {
    next.turbopack = {
      ...config.turbopack ?? {},
      rules: {
        ...config.turbopack?.rules ?? {},
        "*.{ts,tsx,js,jsx}": {
          loaders: [loaderPath]
        }
      }
    };
  }
  return next;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pinpoint
});
//# sourceMappingURL=config.cjs.map