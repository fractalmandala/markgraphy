<script lang="ts">
	// Component page: plate and source path on the left, usage, props and
	// the way back to the set on the right. Extra examples stack under the plate.
	import { Graph, GraphBody, GraphRule } from '$lib';
	import CodeBlock from '$site/components/docs/code-block.svelte';
	import PageHeader from '$site/components/docs/page-header.svelte';
	import PropsTable from '$site/components/docs/props-table.svelte';
	import { animatedComponents } from '$site/docs/catalog';
	import { FRAME_CODE, previews } from '$site/docs/previews';
	import { SITE_NAME } from '$site/lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const entry = $derived(data.entry);
	const entryPreviews = $derived(previews[entry.slug] ?? []);
	const entryHtml = $derived(data.html);
	const isFrame = $derived(entry.slug === 'graph-frame');

	const animatedSlugs = new Set(animatedComponents.map((c) => c.slug));

	const family = $derived(
		isFrame
			? 'frame'
			: animatedSlugs.has(entry.slug)
				? 'animated'
				: entry.slug.startsWith('graph-')
					? 'graphs'
					: 'diagrams'
	);

	const sourcePath = $derived(
		isFrame
			? 'src/lib/frame/Graph.svelte'
			: family === 'animated'
				? `src/lib/animated/${entry.name}.svelte`
				: family === 'diagrams'
					? `src/lib/diagram/${entry.name}.svelte`
					: `src/lib/graphs/${entry.name}.svelte`
	);
</script>

<svelte:head>
	<title>{entry.title} — {SITE_NAME}</title>
	<meta name="description" content={entry.description} />
</svelte:head>

<div class="page">
	<PageHeader title={entry.title} kicker={`${family} · ${entry.name}`} lead={entry.description} />

	<div class="comp-layout">
		<div class="stage">
			{#if isFrame}
				<div class="plate">
					<Graph title="USAGE">
						<GraphBody>
							<p class="demo">Content goes inside the frame.</p>
							<GraphRule />
							<p class="demo dim">Same dashed border as the other graphs.</p>
						</GraphBody>
					</Graph>
				</div>
			{:else}
				{#each entryPreviews as p, index (p.code)}
					{@const Comp = p.Comp}
					<div class="plate">
						<div class="art">
							<Comp {...p.props} />
						</div>
					</div>
					{#if index > 0}
						<CodeBlock code={p.code} html={entryHtml[index]} heading={`example ${index + 1}`} label="copy" />
					{/if}
				{/each}
			{/if}
			<p class="file-path">source <code>{sourcePath}</code></p>
		</div>

		<aside class="side">
			{#if isFrame}
				<CodeBlock code={FRAME_CODE} html={data.frameHtml} heading="+page.svelte" label="copy" />
			{:else if entryPreviews[0]}
				<CodeBlock code={entryPreviews[0].code} html={entryHtml[0]} heading="+page.svelte" label="copy" />
			{/if}
			<PropsTable rows={entry.props} />
			<div class="cta-row">
				<a class="ghost" href="/docs">Back to set</a>
			</div>
		</aside>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
	}

	.comp-layout {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.85fr);
		min-height: 0;
	}

	.stage {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 0;
		padding: 1.6rem 1.3rem 1.4rem 0;
	}

	.plate {
		--graph-background: var(--bg-raised);
		display: grid;
		align-items: center;
		min-width: 0;
		min-height: 220px;
		padding: 1.8rem 1.3rem 1.2rem;
		background: var(--bg-raised);
	}

	.art {
		min-width: 0;
		width: min(100%, 52rem);
		margin: 0 auto;
		overflow-x: auto;
	}

	.demo {
		margin: 0;
	}

	.demo:first-child {
		margin-bottom: 0.75rem;
	}

	.dim {
		color: var(--graph-muted);
	}

	.file-path {
		margin: 0;
		color: var(--site-muted);
		font-size: 0.75rem;
	}

	.file-path code {
		color: var(--text-primary);
	}

	.side {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		min-width: 0;
		padding: 1.6rem 0 1.4rem 1.3rem;
		border-left: 1px dashed var(--border);
		background: linear-gradient(180deg, #141414 0%, var(--site-bg) 100%);
	}

	.cta-row {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	@media (max-width: 1024px) {
		.comp-layout {
			grid-template-columns: 1fr;
		}

		.stage {
			padding: 1.1rem 0 1rem;
			gap: 0.8rem;
		}

		.plate {
			min-height: 200px;
			padding: 1.2rem 1rem 1rem;
		}

		.side {
			padding: 1.1rem 0 1rem;
			gap: 0.9rem;
			border-left: 0;
			border-top: 1px dashed var(--border);
			background: none;
		}
	}
</style>
