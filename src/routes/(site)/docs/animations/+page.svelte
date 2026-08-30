<script lang="ts">
	import { reveal, stagger } from '$lib/frame/motion';
	import type { Component } from 'svelte';
	import PageHeader from '$site/components/docs/page-header.svelte';
	import SiteCorners from '$site/components/SiteCorners.svelte';
	import SiteRule from '$site/components/SiteRule.svelte';
	import { animatedComponents } from '$site/docs/catalog';
	import { SITE_NAME } from '$site/lib/site';
	import {
		GraphFire,
		GraphFlowPlayer,
		GraphLife,
		GraphMandel,
		GraphPulse,
		GraphRain,
		GraphScope,
		GraphSpinners,
		GraphStream,
		GraphTicker,
		GraphTypewriter
	} from '$lib';

	type DemoEntry = {
		// Component with heterogeneous props — validated against the map below.
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		Comp: Component<any>;
		props: Record<string, unknown>;
	};

	const demos: Record<string, DemoEntry> = {
		'graph-typewriter': {
			Comp: GraphTypewriter,
			props: { title: 'BOOT', speedMs: 45, lines: ['> boot fractalgraphy', '> ready'] }
		},
		'graph-ticker': {
			Comp: GraphTicker,
			props: {
				title: 'FLEET',
				items: [
					{ label: 'api', status: 'ok' },
					{ label: 'db-lag 2.1s', status: 'warn' },
					{ label: 'edge-eu', status: 'down' },
					{ label: 'cdn', status: 'ok' }
				]
			}
		},
		'graph-scope': {
			Comp: GraphScope,
			props: {
				title: 'RPM',
				mode: 'area',
				window: 32,
				rows: 5,
				data: [12, 18, 31, 27, 44, 39, 52, 48, 61, 55, 40, 33, 25, 29, 37, 46, 58, 50, 42, 35]
			}
		},
		'graph-stream': {
			Comp: GraphStream,
			props: { title: 'THROUGHPUT', unit: 'req/s', length: 44, intervalMs: 750 }
		},
		'graph-flow-player': {
			Comp: GraphFlowPlayer,
			props: {
				title: 'PIPELINE',
				autoPlay: true,
				speedMs: 1400,
				steps: [
					{ label: 'scaffold the parser', detail: 'reads the grammar file' },
					{ label: 'emit tokens', detail: 'one pass, no backtracking' },
					{ label: 'render frames', detail: 'dashed borders, four corners' },
					{ label: 'publish', detail: 'npm and done' }
				]
			}
		},
		'graph-life': {
			Comp: GraphLife,
			props: { title: 'LIFE', cols: 40, rows: 12 }
		},
		'graph-mandel': {
			Comp: GraphMandel,
			props: { title: 'SEAHORSE', cols: 48, rows: 14 }
		},
		'graph-pulse': {
			Comp: GraphPulse,
			props: { title: 'API', length: 44, intervalMs: 900 }
		},
		'graph-spinners': {
			Comp: GraphSpinners,
			props: { title: 'FETCH', kind: 'bounce', label: 'loading tiles', speedMs: 90 }
		},
		'graph-fire': {
			Comp: GraphFire,
			props: { title: 'FURNACE', cols: 48, rows: 10, cooling: 0.55 }
		},
		'graph-rain': {
			Comp: GraphRain,
			props: { title: 'RAIN', cols: 48, rows: 12 }
		}
	};
</script>

<svelte:head>
	<title>Animations — {SITE_NAME}</title>
	<meta
		name="description"
		content="Eleven live glyph components — typewriters, tickers, scopes, and sims — all running on one page."
	/>
</svelte:head>

<div class="page">
	<PageHeader
		title="Animations"
		kicker="Category"
		lead="Eleven live glyph components, all moving on one page. Same dashed frames and --graph-* tokens as the rest of the library, one accent. Every unit freezes to a meaningful static frame under prefers-reduced-motion or animated={false}; explicit playback still works."
	/>

	<section class="list">
		<div class="box">
			<SiteRule placement="top" />
			<SiteRule placement="bottom" />
			<SiteCorners />
			<ul class="grid" role="list">
				{#each animatedComponents as item, i (item.slug)}
					{@const demo = demos[item.slug]}
					<li class="cell" use:reveal={{ delay: stagger(i, 40), amount: 0.4 }}>
						<div class="card">
							<div class="demo">
								<demo.Comp {...demo.props} />
							</div>
							<a class="name" href={`/docs/${item.slug}`}>
								{item.title}
								<span class="arrow" aria-hidden="true">→</span>
							</a>
							<span class="desc">{item.description}</span>
						</div>
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

	.list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
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

	.demo {
		overflow-x: auto;
	}

	.name {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		width: fit-content;
		font-weight: 500;
		color: var(--site-fg);
		text-decoration: none;
	}

	.name:hover {
		color: var(--graph-accent, oklch(0.78 0.17 155));
	}

	.arrow {
		color: var(--site-muted);
	}

	.name:hover .arrow {
		color: var(--site-fg);
	}

	.desc {
		max-width: 40ch;
		color: var(--site-muted);
		text-wrap: pretty;
	}
</style>
