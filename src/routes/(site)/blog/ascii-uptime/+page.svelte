<script lang="ts">
	import Post from './post.svx';
</script>

<svelte:head>
	<title>Uptime pages are just text — fractalgraphy</title>
	<meta
		name="description"
		content="A status page you can read in a terminal: sixty days of uptime glyphs, one live timer, and no chart library."
	/>
</svelte:head>

<article class="page">
	<p class="back">
		<a href="/blog">← all writing</a>
	</p>

	<div class="fg-prose">
		<Post />
	</div>
</article>

<style>
	.page {
		max-width: 46rem;
		margin: 0 auto;
		padding: 3rem 1.5rem 5rem;
	}

	.back {
		margin: 0;
	}

	.back a {
		color: var(--site-muted);
		text-decoration: underline;
		text-decoration-color: var(--site-rail);
		text-underline-offset: 3px;
	}

	.back a:hover {
		color: var(--site-fg);
		text-decoration-color: var(--site-fg);
	}

	.fg-prose {
		margin-top: 2.5rem;
	}
</style>
