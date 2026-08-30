<script lang="ts">
	import { reveal, stagger } from '$lib/frame/motion';

	const posts = [
		{
			slug: 'ascii-uptime',
			title: 'Uptime pages are just text',
			date: '2026-08-30',
			teaser:
				'Sixty days of glyphs, one live timer, zero chart libraries — a status page you could paste into a terminal.'
		}
	];
</script>

<svelte:head>
	<title>Writing — fractalgraphy</title>
	<meta
		name="description"
		content="Short pieces on ASCII-framed graphs, markdown workflows, and text-first interfaces."
	/>
</svelte:head>

<section class="page">
	<header class="head">
		<p class="kicker">[ BLOG ]</p>
		<h1>Writing</h1>
		<p class="sub">Notes on glyphs, frames, and markdown surfaces.</p>
	</header>

	<ul class="posts" role="list">
		{#each posts as post, i (post.slug)}
			<li class="post" use:reveal={{ delay: stagger(i, 60), amount: 0.4 }}>
				<a class="card" href="/blog/{post.slug}">
					<p class="date">{post.date}</p>
					<h2 class="title">{post.title}</h2>
					<p class="teaser">{post.teaser}</p>
					<p class="more">read →</p>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.page {
		max-width: var(--site-max);
		margin: 0 auto;
		padding: 3rem 1.5rem 5rem;
	}

	.head {
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

	.sub {
		max-width: 52ch;
		margin: 0;
		line-height: 1.7;
		color: var(--site-muted);
	}

	.posts {
		display: flex;
		flex-direction: column;
		margin: 3rem 0 0;
		padding: 0;
		list-style: none;
	}

	.post + .post {
		border-top: 1px dashed var(--site-rail);
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 2rem 0;
	}

	.card:hover .title {
		text-decoration: underline;
		text-decoration-color: var(--site-fg);
		text-underline-offset: 4px;
	}

	.date {
		margin: 0;
		color: var(--site-muted);
	}

	.title {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		letter-spacing: -0.025em;
		color: var(--site-fg);
	}

	.teaser {
		max-width: 60ch;
		margin: 0;
		line-height: 1.7;
		color: var(--site-muted);
	}

	.more {
		margin: 0;
		color: var(--graph-accent, oklch(0.78 0.17 155));
	}
</style>
