<script lang="ts">
	import CopyCode from './copy-code.svelte';

	let {
		code,
		html,
		label = 'copy'
	}: {
		code: string;
		/** Shiki HTML highlighted on the server at build time; falls back to plain text. */
		html?: string;
		label?: string;
	} = $props();
</script>

<div class="codeblock">
	{#if html}
		{@html html}
	{:else}
		<pre><code>{code}</code></pre>
	{/if}
	<div class="action">
		<CopyCode text={code} {label} />
	</div>
</div>

<style>
	.codeblock {
		position: relative;
	}

	.codeblock :global(pre) {
		margin: 0;
		padding: 1rem 6.5rem 1rem 1.25rem;
		overflow-x: auto;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--site-muted);
	}

	.action {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
	}
</style>
