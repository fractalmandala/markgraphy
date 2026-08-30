<script lang="ts">
	import { Graph, GraphBody, GraphRule } from '$lib';
	import Install from '$site/components/docs/install.svelte';
	import PageHeader from '$site/components/docs/page-header.svelte';
	import Preview from '$site/components/docs/preview.svelte';
	import PropsTable from '$site/components/docs/props-table.svelte';
	import { FRAME_CODE, previews } from '$site/docs/previews';
	import { SITE_NAME } from '$site/lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const entry = $derived(data.entry);
	const entryPreviews = $derived(previews[entry.slug] ?? []);
	const entryHtml = $derived(data.html);
</script>

<svelte:head>
	<title>{entry.title} — {SITE_NAME}</title>
	<meta name="description" content={entry.description} />
</svelte:head>

<div class="page">
	<PageHeader title={entry.title} kicker={entry.name} lead={entry.description} />

	<section class="block">
		<Install />
	</section>

	{#if entry.slug === 'graph-frame'}
		<Preview code={FRAME_CODE} html={data.frameHtml}>
			<Graph title="USAGE">
				<GraphBody>
					<p class="demo">Content goes inside the frame.</p>
					<GraphRule />
					<p class="demo dim">Same dashed border as the other graphs.</p>
				</GraphBody>
			</Graph>
		</Preview>
	{:else}
		{#each entryPreviews as p, index (p.code)}
			{@const Comp = p.Comp}
			<Preview code={p.code} html={entryHtml[index]}>
				<Comp {...p.props} />
			</Preview>
		{/each}
	{/if}

	<PropsTable rows={entry.props} />
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
	}

	.demo {
		margin: 0;
	}

	.demo:first-child {
		margin-bottom: 0.75rem;
	}

	.dim {
		color: var(--graph-muted, oklch(0.62 0 0));
	}
</style>
