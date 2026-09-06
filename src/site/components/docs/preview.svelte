<script lang="ts">
	// Plate + usage: the live component on a dark plate, its snippet in an
	// import box beneath. Same pairing the home page's dossier uses.
	import type { Snippet } from 'svelte';
	import CodeBlock from './code-block.svelte';

	let {
		code,
		html,
		children
	}: {
		code: string;
		html?: string;
		children: Snippet;
	} = $props();
</script>

<section class="preview">
	<div class="plate">
		<div class="live">
			{@render children()}
		</div>
	</div>
	<CodeBlock {code} {html} label="copy code" heading="usage" />
</section>

<style>
	.preview {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.plate {
		--graph-background: var(--site-plate);
		min-width: 0;
		padding: 1.8rem 1.3rem 1.2rem;
		background: var(--site-plate);
	}

	.live {
		min-width: 0;
		width: min(100%, 52rem);
		margin: 0 auto;
		overflow-x: auto;
	}
</style>
