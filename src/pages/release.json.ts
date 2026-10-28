export const prerender = true;
export function GET() {
  return new Response(JSON.stringify({commit: process.env.GITHUB_SHA || 'local-preview', builtAt: new Date().toISOString()}), {headers: {'Content-Type': 'application/json'}});
}
