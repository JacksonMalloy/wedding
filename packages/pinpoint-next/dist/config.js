// src/config.ts
import { createRequire } from "module";
var loaderPath = (() => {
  const baseUrl = import.meta.url ?? `file://${process.cwd()}/__pinpoint_config__.js`;
  const req = createRequire(baseUrl);
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
export {
  pinpoint as default,
  pinpoint
};
//# sourceMappingURL=config.js.map