<script lang="ts">
	import type { Snippet } from 'svelte';
	import SiteCorners from '../SiteCorners.svelte';
	import SiteRule from '../SiteRule.svelte';

	let {
		title,
		kicker,
		lead,
		note,
		children
	}: {
		title: string;
		/** Component name above the title, e.g. GraphStat. */
		kicker?: string;
		/** Intro paragraph under the title. */
		lead?: string;
		/** Extra muted line, e.g. when / when-not guidance. */
		note?: string;
		children?: Snippet;
	} = $props();
</script>

<header class="header">
	{#if kicker}
		<p class="kicker">{kicker}</p>
	{/if}
	<h1>{title}</h1>
	{#if lead}
		<p class="lead">{lead}</p>
	{/if}
	{#if note}
		<p class="note">{note}</p>
	{/if}
	{@render children?.()}
	<SiteRule placement="bottom" />
	<SiteCorners corners={['bl', 'br']} />
</header>

<style>
	.header {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
		padding-bottom: 2rem;
	}

	.kicker {
		margin: 0;
		color: var(--graph-accent, oklch(0.78 0.17 155));
	}

	h1 {
		margin: 0;
		font-size: 2.25rem;
		font-weight: 600;
		letter-spacing: -0.025em;
		text-wrap: balance;
	}

	.lead,
	.note {
		max-width: 56ch;
		margin: 0;
		color: var(--site-muted);
		text-wrap: pretty;
	}
</style>
