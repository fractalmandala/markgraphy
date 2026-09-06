// The set: every specimen's first usage snippet, highlighted at build time so
// the cabinet can swap plates client-side without shipping shiki.
import { previews } from '$site/docs/previews';
import { highlight } from '$site/lib/highlight';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const entries = Object.entries(previews).filter(([, list]) => list.length > 0);
	const codeHtml = Object.fromEntries(
		await Promise.all(entries.map(async ([slug, list]) => [slug, await highlight(list[0].code)]))
	) as Record<string, string>;
	return { codeHtml };
};
