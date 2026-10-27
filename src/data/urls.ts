/** Prefix local links and public assets for both root and GitHub project Pages. */
export function localUrl(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
