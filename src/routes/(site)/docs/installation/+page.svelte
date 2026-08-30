<script lang="ts">
	import { GraphStat } from '$lib';
	import CodeBlock from '$site/components/docs/code-block.svelte';
	import Install from '$site/components/docs/install.svelte';
	import PageHeader from '$site/components/docs/page-header.svelte';
	import Preview from '$site/components/docs/preview.svelte';
	import { ACCENT_CODE, LAYOUT_CODE, PAGE_CODE, SVX_CODE } from '$site/docs/install-code';
	import { SITE_NAME } from '$site/lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

</script>

<svelte:head>
	<title>Installation — {SITE_NAME}</title>
	<meta
		name="description"
		content="Install fractalgraphy: add the package, import the theme once, use the graphs in pages or .svx markdown, and override the accent with CSS variables."
	/>
</svelte:head>

<div class="page">
	<PageHeader
		title="Installation"
		lead="fractalgraphy ships as one npm package: the graphs, the frame they share, and one stylesheet. Install it, add the theme, and the figures render wherever you put them."
		note="Requires Svelte 5 — SvelteKit, Vite, or plain Svelte."
	/>

	<section class="block">
		<Install />
	</section>

	<section class="block">
		<h2>Theme</h2>
		<p>
			Import the theme once, in your root <code>+layout.svelte</code>. It defines the
			<code>--graph-*</code> custom properties every component reads — dark by default, one
			accent. The accent picker in this site's header does exactly this override, at runtime.
		</p>
		<CodeBlock code={LAYOUT_CODE} html={data.layout} />
	</section>

	<section class="block">
		<h2>Use in a page</h2>
		<p>
			Import any graph from <code>fractalgraphy</code> and pass data as props. The frame, the
			title, and the drawing come with it — no chart config.
		</p>
		<Preview code={PAGE_CODE} html={data.page}>
			<GraphStat
				title="THIS WEEK"
				items={[
					{ value: '12,400', label: 'docs' },
					{ value: '4,100', label: 'copies' },
					{ value: '860', label: 'shipped', accent: true }
				]}
			/>
		</Preview>
	</section>

	<section class="block">
		<h2>Use in markdown</h2>
		<p>
			In a <code>.svx</code> file, add a <code>&lt;script&gt;</code> importing the components,
			then place them between paragraphs. The frame spans the text column, so figures sit inline
			with prose like any other element.
		</p>
		<CodeBlock code={SVX_CODE} html={data.svx} />
	</section>

	<section class="block">
		<h2>Accent overrides</h2>
		<p>
			Every color is a CSS variable with a built-in fallback, so nothing breaks if a token is
			missing. Set them on <code>:root</code> to retheme everything, or scope them to a section:
			<code>--graph-accent</code>, <code>--graph-accent-2</code>, <code>--graph-accent-3</code>,
			<code>--graph-frame</code>, <code>--graph-foreground</code>, <code>--graph-muted</code>,
			<code>--graph-faint</code>.
		</p>
		<CodeBlock code={ACCENT_CODE} html={data.accent} />
	</section>

	<section class="block">
		<h2>Palette and glyphs</h2>
		<p>
			Drawing graphs take a <code>palette</code> — <code>mono</code> (the default),
			<code>duo</code>, or <code>multi</code> — mapped onto the accent variables above. Most also
			take <code>glyphs</code>: a preset (<code>shade</code>, <code>ascii</code>,
			<code>hash</code>, <code>bar</code>) or an array of characters, one per step. Table,
			Invoice, Spec, Stat, Tree, and the Frame stay plain.
		</p>
	</section>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.block {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h2 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.025em;
	}

	.block p {
		max-width: 60ch;
		margin: 0;
		color: var(--site-muted);
		text-wrap: pretty;
	}

	.block p code {
		color: var(--site-fg);
	}
</style>
