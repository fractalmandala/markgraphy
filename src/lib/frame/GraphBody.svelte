<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		/** Compact padding for dense graphs like Table and Invoice. */
		tight?: boolean;
		children?: Snippet;
	}

	let { class: className = '', tight = false, children }: Props = $props();
</script>

<div class="body {className}" class:tight>
	{@render children?.()}
</div>

<style>
	.body {
		min-width: 0;
		padding: 1.75rem 1.25rem;
	}

	@media (min-width: 640px) {
		.body {
			padding: 2rem;
		}
	}

	.body.tight {
		padding: 1.5rem 0.75rem;
	}

	@media (min-width: 640px) {
		.body.tight {
			padding: 2rem 1.5rem;
		}
	}
</style>
