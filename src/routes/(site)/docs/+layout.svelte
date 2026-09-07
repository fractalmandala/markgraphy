<script lang="ts">
	// Docs shell: the "cabinet" — an index rail on the left, the plate on the
	// right, dashed rails on both edges. Below 1024px the index becomes a strip.
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import Nav from '$site/components/docs/nav.svelte';

	let { children }: { children: Snippet } = $props();

	const cabinet = $derived(page.url.pathname === '/docs');
</script>

<div class="docs">
	{#if !cabinet}
		<Nav variant="mobile" />
	{/if}
	<div class="cabinet" class:solo={cabinet}>
		{#if !cabinet}
			<Nav variant="rail" />
		{/if}
		<main class="content">
			{@render children()}
		</main>
	</div>
</div>

<style>
	.docs {
		position: relative;
		width: 100%;
		max-width: var(--site-max);
		margin-inline: auto;
		padding: 0 var(--pad) 1.4rem;
	}

	.cabinet {
		display: flex;
		flex-direction: column;
		min-width: 0;
		border-left: 1px dashed var(--border);
		border-right: 1px dashed var(--border);
	}

	@media (min-width: 1024px) {
		.cabinet {
			display: grid;
			grid-template-columns: 17rem minmax(0, 1fr);
			align-items: start;
		}

		.cabinet.solo {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	.content {
		min-width: 0;
		padding: 1.2rem 1rem 3rem;
	}

	@media (min-width: 1024px) {
		.content {
			padding: 1.6rem 1.6rem 5rem;
		}
	}

	/* Section headings inside docs pages share one voice. */
	.content :global(h2) {
		margin: 0;
		font-family: var(--font-sans);
		font-size: 1.45rem;
		font-weight: 600;
		letter-spacing: -0.04em;
	}
</style>
