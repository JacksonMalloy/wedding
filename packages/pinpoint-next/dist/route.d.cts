declare const dynamic = "force-dynamic";
declare const runtime = "nodejs";
interface RouteCtx {
    params: Promise<{
        slug?: string[];
    }> | {
        slug?: string[];
    };
}
declare function GET(_req: Request, ctx: RouteCtx): Promise<Response>;
declare function POST(req: Request, ctx: RouteCtx): Promise<Response>;
declare function PATCH(req: Request, ctx: RouteCtx): Promise<Response>;

export { GET, PATCH, POST, dynamic, runtime };
