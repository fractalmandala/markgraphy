<script lang="ts">
	import CopyCode from './copy-code.svelte';
	import MonoLabel from './mono-label.svelte';
</script>

<div class="install">
	<MonoLabel>Install</MonoLabel>
	<CopyCode text="pnpm add fractalgraphy">
		<pre class="cmd"><code>pnpm add fractalgraphy</code></pre>
	</CopyCode>
	<p class="alt">or <code>npm install fractalgraphy</code></p>
</div>

<style>
	.install {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.cmd {
		margin: 0;
		overflow-x: auto;
		color: var(--site-muted);
	}

	.cmd code {
		white-space: nowrap;
	}

	.alt {
		margin: 0;
		font-size: 0.875rem;
		color: var(--site-muted);
	}

	.alt code {
		color: var(--site-fg);
	}
</style>
