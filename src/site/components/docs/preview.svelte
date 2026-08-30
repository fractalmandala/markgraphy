<script lang="ts">
	import type { Snippet } from 'svelte';
	import CodeBlock from './code-block.svelte';
	import SiteCorners from '../SiteCorners.svelte';

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
	<div class="stage">
		<SiteCorners tone="rail" />
		<div class="live">
			{@render children()}
		</div>
	</div>
	<div class="source">
		<CodeBlock {code} {html} label="copy code" />
	</div>
</section>

<style>
	.preview {
		display: flex;
		flex-direction: column;
	}

	.stage {
		position: relative;
		border: 1px dashed var(--site-rail);
	}

	.live {
		min-width: 0;
		padding: 1.5rem 1.25rem;
		overflow-x: auto;
	}

	@media (min-width: 640px) {
		.live {
			padding: 2rem;
		}
	}
</style>
