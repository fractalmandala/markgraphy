<script lang="ts">
	import { reveal } from '$lib/frame/motion';
	import RecipeCard from '$site/components/docs/recipe-card.svelte';
	import { recipes } from '$site/docs/recipes';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const description =
		'Short write-ups with two graphs each. A refactor, an incident, a tradeoff, a pull request.';
</script>

<svelte:head>
	<title>Examples — fractalgraphy</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="page">
	<header class="head" use:reveal={{ amount: 0.4 }}>
		<h1>Examples</h1>
		<p class="lead">
			{description} Copy the Svelte and swap the labels for yours. Each graph
			has its own page if you want the props.
		</p>
		<ul class="chips" role="list">
			{#each recipes as item (item.slug)}
				<li>
					<a href="#{item.slug}">{item.title}</a>
				</li>
			{/each}
		</ul>
	</header>

	<div class="list">
		{#each recipes as item (item.slug)}
			<RecipeCard recipe={item} usageHtml={data.usageHtml[item.slug]} />
		{/each}
	</div>

	<p class="outro">
		Give this to an agent:
		<a href="/docs/skill">Skill</a>. Every graph in one file:
		<a href="/llms.txt">/llms.txt</a>.
	</p>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h1 {
		margin: 0;
		font-size: 2rem;
		font-weight: 600;
		letter-spacing: -0.025em;
	}

	.lead {
		max-width: 56ch;
		margin: 0;
		color: var(--site-muted);
		text-wrap: pretty;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
		color: var(--site-muted);
		font-size: 0.875rem;
	}

	.chips a {
		color: var(--site-muted);
		text-decoration: none;
	}

	.chips a:hover {
		color: var(--site-fg);
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	.outro {
		max-width: 56ch;
		margin: 0;
		color: var(--site-muted);
	}

	.outro a {
		color: var(--site-fg);
		text-decoration: underline;
		text-decoration-color: var(--site-rail);
		text-underline-offset: 4px;
	}

	.outro a:hover {
		text-decoration-color: var(--site-fg);
	}
</style>
