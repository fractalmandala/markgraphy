<script lang="ts">
	import { reveal, stagger } from '$lib/frame/motion';
	import SiteContainer from './SiteContainer.svelte';
</script>

<section class="hero">
	<SiteContainer borderTop={false}>
		<div class="stack">
			<div class="head" use:reveal={{ amount: 0.4 }}>
				<p class="eyebrow">Open source</p>
				<h1>fractalgraphy</h1>
				<p class="lede">
					Svelte components for tables, charts, and diagrams in markdown.
					They look like monospace text — dashed frames and block
					characters, not SVG. Install from npm. They sit next to prose in
					docs, posts, and anything an agent writes down.
				</p>
			</div>
			<div class="actions" use:reveal={{ delay: stagger(1, 90), amount: 0.4 }}>
				<a class="btn" href="/docs">Read the docs</a>
				<a class="btn outline" href="/docs/installation">Install</a>
			</div>
		</div>
	</SiteContainer>
</section>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2rem;
	}

	.head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.eyebrow {
		margin: 0;
		font-size: 0.875rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--site-muted);
	}

	h1 {
		max-width: 20ch;
		margin: 0;
		font-size: 2.25rem;
		font-weight: 600;
		letter-spacing: -0.025em;
		text-wrap: balance;
	}

	@media (min-width: 640px) {
		h1 {
			font-size: 3rem;
		}
	}

	.lede {
		max-width: 48ch;
		margin: 0;
		color: var(--site-muted);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
	}

	.btn {
		padding: 0.5rem 1rem;
		background: var(--site-fg);
		color: var(--site-bg);
		font-size: 0.875rem;
		text-decoration: none;
	}

	.btn:hover {
		background: color-mix(in oklab, var(--site-fg) 88%, var(--site-bg));
	}

	.btn.outline {
		background: transparent;
		color: var(--site-fg);
		box-shadow: inset 0 0 0 1px var(--site-rail);
	}

	.btn.outline:hover {
		box-shadow: inset 0 0 0 1px var(--site-fg);
	}
</style>
