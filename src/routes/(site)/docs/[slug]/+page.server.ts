// Entry resolution, prerender entries, and build-time shiki highlighting
// for the [slug] docs pages. Runs during prerender, so highlighted HTML
// ships in the static markup and no highlighting code reaches the client.
import { error } from '@sveltejs/kit';
import { components, getComponent } from '$site/docs/catalog';
import { FRAME_CODE, previews } from '$site/docs/previews';
import { highlight } from '$site/lib/highlight';
import type { PageServerLoad } from './$types';

export const prerender = true;

export function entries() {
	return components.map((item) => ({ slug: item.slug }));
}

export const load: PageServerLoad = async ({ params }) => {
	const entry = getComponent(params.slug);

	if (!entry) {
		error(404, 'Component not found');
	}

	const pagePreviews = previews[params.slug] ?? [];
	const html = await Promise.all(pagePreviews.map((p) => highlight(p.code)));
	const frameHtml = params.slug === 'graph-frame' ? await highlight(FRAME_CODE) : undefined;

	return { entry, html, frameHtml };
};
