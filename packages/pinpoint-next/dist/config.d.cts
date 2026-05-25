type NextConfig = any;
interface PinpointOptions {
    /**
     * When a feedback is submitted, automatically spawn an isolated `claude -p`
     * agent to address it.
     *
     * - `false` (default): no spawn. Use channel mode (`claude --dangerously-load-development-channels`)
     *   or pull mode (ask the agent yourself) instead.
     * - `'worktree'`: each submit creates a fresh git worktree at
     *   `.pinpoint/worktrees/<id>` on a `pinpoint/<id>` branch, then spawns
     *   `claude -p` inside it. Agents run in true parallel without trampling
     *   each other. Review each branch like a PR. Requires a git repo.
     * - `'inline'`: spawn `claude -p` in the main project directory (no
     *   worktree). Cheaper but parallel agents may race on the same files.
     *
     * Communicated to the route handler via PINPOINT_SPAWN_AGENT env var.
     * Set PINPOINT_AGENT_PERMISSION_MODE to override the default `acceptEdits`.
     */
    spawnAgent?: 'worktree' | 'inline' | false;
}
/**
 * Wrap your Next.js config to enable Pinpoint in development.
 *
 * In dev mode this:
 *  - Adds a webpack/Turbopack loader that tags every JSX opening element with
 *    `data-pp-loc`.
 *  - Rewrites `/__pinpoint/*` to `/pinpoint/*` so the widget's hardcoded URLs
 *    hit your route handler. We can't use `app/__pinpoint/...` directly because
 *    Next.js treats folders starting with `_` as private (not routable).
 *
 * Prod builds are completely untouched.
 *
 * You still need two more files:
 *
 *   // app/layout.tsx — somewhere inside <body>
 *   import { Pinpoint } from '@pinpoint/next';
 *   ...
 *   <Pinpoint />
 *
 *   // app/pinpoint/[[...slug]]/route.ts — exactly this content:
 *   export const dynamic = 'force-dynamic';
 *   export const runtime = 'nodejs';
 *   export { GET, POST, PATCH } from '@pinpoint/next/route';
 *
 * Note: `dynamic` and `runtime` must be declared inline. Next 16 statically
 * parses route-segment config and rejects re-exports of those fields.
 */
declare function pinpoint(config?: NextConfig, options?: PinpointOptions): NextConfig;

export { type PinpointOptions, pinpoint as default, pinpoint };
