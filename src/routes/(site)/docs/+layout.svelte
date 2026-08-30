<script lang="ts">
	import type { Snippet } from 'svelte';
	import Nav from '$site/components/docs/nav.svelte';
	import SiteRule from '$site/components/SiteRule.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="docs">
	<SiteRule orientation="y" placement="left" />
	<SiteRule orientation="y" placement="right" />
	<Nav variant="mobile" />
	<div class="cols">
		<Nav variant="rail" />
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
		padding-inline: 1rem;
	}

	@media (min-width: 640px) {
		.docs {
			padding-inline: 1.5rem;
		}
	}

	@media (min-width: 1024px) {
		.docs {
			padding-inline: 2rem;
		}
	}

	.cols {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	@media (min-width: 1024px) {
		.cols {
			flex-direction: row;
			align-items: flex-start;
			gap: 2.5rem;
		}
	}

	.content {
		flex: 1;
		min-width: 0;
		padding-block: 2rem 5rem;
	}

	@media (min-width: 1024px) {
		.content {
			padding-block: 2.5rem 5rem;
		}
	}
</style>
