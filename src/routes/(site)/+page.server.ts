// Highlights the dossier snippet for every instrument at build time so the
// observatory ships prerendered code, the same way /docs/[slug] does.
import { highlight } from '$site/lib/highlight';
import { instrumentPreview, instruments } from '$site/lib/instruments';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const codeHtml = Object.fromEntries(
		await Promise.all(
			instruments.map(async (item) => [item.slug, await highlight(instrumentPreview(item).code)])
		)
	) as Record<string, string>;

	return { codeHtml };
};
