<script lang="ts">
	import type { Snippet } from 'svelte';
	import { type GraphPad } from '$lib/types'

	interface Props {
		class?: string;
		/** Compact padding for dense graphs like Table and Invoice. */
		tight?: boolean;
		pad?: GraphPad;
		children?: Snippet;
	}

	let { class: className = '', tight = false, children, pad = 'sm' }: Props = $props();
</script>

<div class="body {className} pad-{pad}" class:tight>
	{@render children?.()}
</div>
