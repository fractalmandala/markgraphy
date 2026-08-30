<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<p class="label">{@render children()}</p>

<style>
	.label {
		margin: 0;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--graph-accent, oklch(0.78 0.17 155));
	}
</style>
