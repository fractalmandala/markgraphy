<script lang="ts">
	import Example from './example.svx';
</script>

<svelte:head>
	<title>Markdown graphs — fractalgraphy</title>
	<meta
		name="description"
		content="Write fractalgraphy components inline in .svx markdown files — one tag between paragraphs, rendered server-side."
	/>
</svelte:head>

<section class="page">
	<header class="intro">
		<p class="kicker">[ MDSVEX ]</p>
		<h1>Markdown graphs</h1>
		<p class="lede">
			This page is written in markdown. Everything under the rule is
			<code>example.svx</code> — a real .svx file imported like a component
			and rendered inside this one. Prose styling comes from one global
			<code>.fg-prose</code> class; the graphs style themselves.
		</p>
	</header>

	<hr class="start" />

	<div class="fg-prose">
		<Example />
	</div>
</section>

<style>
	.page {
		max-width: 56rem;
		margin: 0 auto;
		padding: 3rem 1.5rem 5rem;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.kicker {
		margin: 0;
		color: var(--site-muted);
		letter-spacing: 0.05em;
	}

	h1 {
		margin: 0;
		font-size: 2.25rem;
		font-weight: 600;
		letter-spacing: -0.025em;
	}

	.lede {
		max-width: 58ch;
		margin: 0;
		line-height: 1.7;
		color: var(--site-muted);
	}

	.lede code {
		padding: 0.125rem 0.375rem;
		background: var(--site-faint);
		font-size: 0.875rem;
		color: var(--site-fg);
	}

	.start {
		height: 1px;
		margin: 2.5rem 0 0;
		border: 0;
		background-image: repeating-linear-gradient(
			to right,
			var(--site-rail) 0 2px,
			transparent 2px 7px
		);
	}

	.fg-prose {
		margin-top: 3rem;
	}
</style>
