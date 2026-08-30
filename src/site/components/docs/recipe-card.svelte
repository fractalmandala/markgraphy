<script lang="ts">
	import {
		GraphCompare,
		GraphDiff,
		GraphFlow,
		GraphGantt,
		GraphKpi,
		GraphMeter,
		GraphRank,
		GraphSlope,
		GraphStat,
		GraphTimeline,
		GraphUptime
	} from '$lib';
	import { reveal, stagger } from '$lib/frame/motion';
	import { figureLabel, recipeCopy, type Recipe } from '$site/docs/recipes';

	let {
		recipe,
		titleLevel = 2,
		showCode = true,
		usageHtml
	}: {
		recipe: Recipe;
		/** Heading level for the recipe title: 2 on the examples page, 3 in Scenarios. */
		titleLevel?: 2 | 3;
		/** Show the copyable usage block. Scenarios hides it to stay light. */
		showCode?: boolean;
		/** Shiki HTML for the usage block, highlighted on the server; plain text when absent. */
		usageHtml?: string;
	} = $props();

	let copied = $state(false);
	let timeout: ReturnType<typeof setTimeout> | undefined;

	const headingTag = $derived(titleLevel === 3 ? 'h3' : 'h2');

	async function copy() {
		try {
			await navigator.clipboard.writeText(recipeCopy(recipe));
			copied = true;
			clearTimeout(timeout);
			timeout = setTimeout(() => (copied = false), 1600);
		} catch {
			/* clipboard unavailable — the pre block stays selectable */
		}
	}
</script>

<section class="card" id={recipe.slug}>
	<div class="head">
		<div class="lede">
			<svelte:element this={headingTag} class="title">{recipe.title}</svelte:element>
			<p class="story">{recipe.story}</p>
		</div>
		{#if showCode}
			<button class="copy" class:done={copied} type="button" onclick={copy}>
				{copied ? 'copied' : 'copy svelte'}
			</button>
		{/if}
	</div>

	<div class="figures">
		{#each recipe.graphs as figure, index (figure.slug)}
			<div class="figure" use:reveal={{ delay: stagger(index, 40), amount: 0.4 }}>
				{#if figure.component === 'GraphCompare'}
					<GraphCompare {...figure.props} />
				{:else if figure.component === 'GraphDiff'}
					<GraphDiff {...figure.props} />
				{:else if figure.component === 'GraphFlow'}
					<GraphFlow {...figure.props} />
				{:else if figure.component === 'GraphGantt'}
					<GraphGantt {...figure.props} />
				{:else if figure.component === 'GraphKpi'}
					<GraphKpi {...figure.props} />
				{:else if figure.component === 'GraphMeter'}
					<GraphMeter {...figure.props} />
				{:else if figure.component === 'GraphRank'}
					<GraphRank {...figure.props} />
				{:else if figure.component === 'GraphSlope'}
					<GraphSlope {...figure.props} />
				{:else if figure.component === 'GraphStat'}
					<GraphStat {...figure.props} />
				{:else if figure.component === 'GraphTimeline'}
					<GraphTimeline {...figure.props} />
				{:else if figure.component === 'GraphUptime'}
					<GraphUptime {...figure.props} />
				{/if}
				<p class="fig-link">
					<a href="/docs/{figure.slug}">{figureLabel(figure.slug)}</a>
				</p>
			</div>
		{/each}
	</div>

	{#if showCode}
		<div class="usage">
			{#if usageHtml}
				{@html usageHtml}
			{:else}
				{recipeCopy(recipe)}
			{/if}
		</div>
	{/if}
</section>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		scroll-margin-top: 5rem;
	}

	.head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.head {
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;
		}
	}

	.lede {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 0;
	}

	.title {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.025em;
		color: var(--site-fg);
	}

	.story {
		max-width: 56ch;
		margin: 0;
		color: var(--site-muted);
		text-wrap: pretty;
	}

	.copy {
		padding: 0.25rem 0.75rem;
		border: 1px dashed var(--site-rail);
		background: transparent;
		color: var(--site-muted);
		font: inherit;
		font-size: 0.875rem;
		cursor: pointer;
	}

	.copy:hover {
		color: var(--site-fg);
		background: var(--site-faint);
	}

	.copy.done {
		color: var(--graph-accent, oklch(0.78 0.17 155));
		border-color: currentColor;
	}

	.figures {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.figure {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.fig-link {
		margin: 0;
		font-size: 0.875rem;
	}

	.fig-link a {
		color: var(--site-muted);
		text-decoration: none;
	}

	.fig-link a:hover {
		color: var(--site-fg);
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.usage {
		margin: 0;
		padding: 1rem;
		border: 1px dashed var(--site-rail);
		overflow-x: auto;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--site-muted);
		white-space: pre;
	}

	.usage :global(pre) {
		margin: 0;
		padding: 0;
		overflow-x: visible;
		font: inherit;
		color: inherit;
		white-space: inherit;
	}
</style>
