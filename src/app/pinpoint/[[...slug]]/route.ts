// Pinpoint feedback endpoints (dev only). Mounted at /pinpoint/*; rewritten
// from /__pinpoint/* by the pinpoint() Next config wrapper.
//
// `dynamic` and `runtime` must be declared inline — Next 16 statically
// parses route-segment config and rejects re-exports for those fields.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export { GET, POST, PATCH } from "@pinpoint/next/route";
