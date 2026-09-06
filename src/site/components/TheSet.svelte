<script lang="ts">
	// "The set": seven real components on one wall, each linking to its docs.
	import { GraphActivity } from '$lib';
	import { animatedComponents, staticComponents } from '$site/docs/catalog';
	import { previews } from '$site/docs/previews';
	import { commits } from '$site/lib/wall';

	const graphs = staticComponents.filter((item) => item.slug.startsWith('graph-')).length;
	const diagrams = staticComponents.length - graphs;
	const animated = animatedComponents.length;

	const tiles = [
		{ slug: 'graph-invoice', entry: previews['graph-invoice'][0] },
		{ slug: 'graph-table', entry: previews['graph-table'][1] },
		{ slug: 'graph-flow', entry: previews['graph-flow'][0] },
		{ slug: 'graph-tree', entry: previews['graph-tree'][0] },
		{ slug: 'graph-bars', entry: previews['graph-bars'][0] },
		{ slug: 'graph-kpi', entry: previews['graph-kpi'][0] }
	];
</script>

<section class="section" id="set">
	<div class="section-head">
		<h2 class="display">The set.</h2>
		<p>
			Mix a kpi next to a status line, a flow under a paragraph, a spark beside a sentence. Same
			frame, same accent — they read as one piece.
		</p>
	</div>
	<div class="wall">
		{#each tiles as tile (tile.slug)}
			<article class="tile">
				<tile.entry.Comp {...tile.entry.props} />
				<a class="docs" href={`/docs/${tile.slug}`}>[ docs ]</a>
			</article>
		{/each}
		<article class="tile span">
			<div class="scroll">
				<GraphActivity title="COMMITS" palette="multi" days={commits} />
			</div>
			<a class="docs" href="/docs/graph-activity">[ docs ]</a>
		</article>
	</div>
</section>

<style>
	.section {
		position: relative;
		z-index: 1;
		padding: 3.2rem var(--pad) 4rem;
		border-top: 1px dashed var(--border);
	}

	.section-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		max-width: var(--site-max);
		margin: 0 auto 1.6rem;
	}

	h2 {
		margin: 0;
		font-size: clamp(1.6rem, 3vw, 2.4rem);
	}

	.section-head p {
		max-width: 42ch;
		margin: 0;
		color: var(--site-muted);
		font-size: 0.85rem;
	}

	.wall {
		max-width: var(--site-max);
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 1.1rem;
	}

	.tile {
		--graph-background: var(--bg-raised);
		position: relative;
		min-width: 0;
		display: flex;
		flex-direction: column;
		background: var(--bg-raised);
	}

	.tile :global(.graph) {
		flex: 1;
	}

	.tile.span {
		grid-column: 1 / -1;
	}

	.scroll {
		min-width: 0;
		overflow-x: auto;
	}

	.docs {
		position: absolute;
		right: 0.9rem;
		bottom: 0.45rem;
		z-index: 11;
		padding: 0 0.4rem;
		background: var(--bg-raised);
		color: var(--site-faint);
		font-size: 0.62rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		text-decoration: none;
	}

	.docs:hover {
		color: var(--graph-accent);
	}

	@media (max-width: 980px) {
		.section-head {
			flex-direction: column;
		}

		.wall {
			grid-template-columns: 1fr;
		}
	}
</style>
