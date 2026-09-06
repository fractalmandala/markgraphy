<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<p class="kicker">[ {@render children()} ]</p>

<style>
	.kicker {
		margin: 0;
	}
</style>
