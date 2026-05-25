interface LoaderContext {
    resourcePath: string;
    rootContext: string;
    async(): (err: Error | null, content?: string) => void;
}
/**
 * Webpack loader for Next.js. Runs the same JSX transform as @pinpoint/vite-plugin.
 *
 * Wire it up via @pinpoint/next/config or directly in next.config.js:
 *
 *   webpack(config, { dev, isServer }) {
 *     if (dev && !isServer) {
 *       config.module.rules.unshift({
 *         test: /\.(t|j)sx$/,
 *         exclude: /node_modules/,
 *         use: require.resolve('@pinpoint/next/loader'),
 *       });
 *     }
 *     return config;
 *   }
 */
declare function pinpointLoader(this: LoaderContext, source: string): void;

export { pinpointLoader as default };
