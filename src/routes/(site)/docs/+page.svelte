<script lang="ts">
	import { reveal, stagger } from '$lib/frame/motion';
	import Install from '$site/components/docs/install.svelte';
	import PageHeader from '$site/components/docs/page-header.svelte';
	import SiteCorners from '$site/components/SiteCorners.svelte';
	import SiteRule from '$site/components/SiteRule.svelte';
	import { animatedComponents, staticComponents } from '$site/docs/catalog';
	import { SITE_NAME } from '$site/lib/site';
</script>

<svelte:head>
	<title>Introduction — {SITE_NAME}</title>
	<meta
		name="description"
		content="ASCII-framed graph components for Svelte. Install from npm, import into any SvelteKit app."
	/>
</svelte:head>

<div class="page">
	<PageHeader
		title="Introduction"
		lead="ASCII-framed graph components for Svelte 5. Install from npm, import into any SvelteKit app, and drop them next to prose in markdown. Each graph sits in a dashed frame with a title on the top edge and one accent color. Drawing graphs also take a palette of two or three accents."
	>
		<p class="links">
			<a href="/docs/examples">Examples</a> are short write-ups with two graphs each — a
			refactor, an incident, a tradeoff. <a href="/docs/animations">Animations</a> are
			live glyph components, every one moving on a single page.
			<a href="/docs/skill">Skill</a> is the SKILL.md that tells an agent to use those
			instead of drawing SVG.
		</p>
	</PageHeader>

	<section class="install">
		<Install />
		<p class="full"><a href="/docs/installation">Full installation</a></p>
	</section>

	<section class="list">
		<h2>Components</h2>
		<div class="box">
			<SiteRule placement="top" />
			<SiteRule placement="bottom" />
			<SiteCorners />
			<ul class="grid" role="list">
				{#each staticComponents as item, i (item.slug)}
					<li class="cell" use:reveal={{ delay: stagger(i, 40), amount: 0.4 }}>
						<a class="card" href={`/docs/${item.slug}`}>
							<span class="name">{item.title}</span>
							<span class="desc">{item.description}</span>
							<span class="arrow" aria-hidden="true">→</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="list">
		<h2>Animated</h2>
		<div class="box">
			<SiteRule placement="top" />
			<SiteRule placement="bottom" />
			<SiteCorners />
			<ul class="grid" role="list">
				{#each animatedComponents as item, i (item.slug)}
					<li class="cell" use:reveal={{ delay: stagger(i, 40), amount: 0.4 }}>
						<a class="card" href={`/docs/${item.slug}`}>
							<span class="name">{item.title}</span>
							<span class="desc">{item.description}</span>
							<span class="arrow" aria-hidden="true">→</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.links {
		max-width: 56ch;
		margin: 0;
		color: var(--site-muted);
		text-wrap: pretty;
	}

	.links a {
		color: var(--site-fg);
		text-decoration: underline;
		text-decoration-color: var(--site-rail);
		text-underline-offset: 4px;
	}

	.links a:hover {
		text-decoration-color: var(--site-fg);
	}

	.install {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.full {
		margin: 0;
	}

	.full a {
		color: var(--site-fg);
		text-decoration: underline;
		text-decoration-color: var(--site-rail);
		text-underline-offset: 4px;
	}

	.full a:hover {
		text-decoration-color: var(--site-fg);
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	h2 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.025em;
	}

	.box {
		position: relative;
	}

	.grid {
		display: grid;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (min-width: 640px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.cell {
		border-top: 1px dashed var(--site-rail);
	}

	.cell:first-child {
		border-top: 0;
	}

	@media (min-width: 640px) {
		.cell:nth-child(2) {
			border-top: 0;
		}

		.cell:nth-child(odd) {
			border-right: 1px dashed var(--site-rail);
		}
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		height: 100%;
		padding: 1.25rem 1.5rem;
	}

	.card:hover .name {
		color: var(--graph-accent, oklch(0.78 0.17 155));
	}

	.card:hover .arrow {
		color: var(--site-fg);
	}

	.name {
		font-weight: 500;
		color: var(--site-fg);
	}

	.desc {
		max-width: 40ch;
		color: var(--site-muted);
		text-wrap: pretty;
	}

	.arrow {
		align-self: flex-end;
		color: var(--site-muted);
	}
</style>
