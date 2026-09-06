<script lang="ts">
	import { reveal, stagger } from '$lib/frame/motion';
	import RecipeCard from '$site/components/docs/recipe-card.svelte';
	import SiteContainer from '$site/components/SiteContainer.svelte';
	import { featuredRecipes } from '$site/docs/recipes';
</script>

<section>
	<SiteContainer>
		<div class="stack">
			<div class="intro" use:reveal={{ amount: 0.4 }}>
				<h2>Next to the writing</h2>
				<p>
					A short stack for a refactor or an incident. Two graphs, some prose.
					Same components as the rest of the library.
				</p>
			</div>
			<div class="grid">
				{#each featuredRecipes as recipe, index (recipe.slug)}
					<article use:reveal={{ delay: stagger(index, 90), amount: 0.3 }}>
						<RecipeCard {recipe} titleLevel={3} showCode={false} />
					</article>
				{/each}
			</div>
			<p class="more">
				<a href="/docs/examples">More examples</a>
			</p>
		</div>
	</SiteContainer>
</section>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h2 {
		max-width: 35ch;
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		letter-spacing: -0.025em;
		text-wrap: balance;
	}

	.intro p {
		max-width: 48ch;
		margin: 0;
		color: var(--site-muted);
		text-wrap: pretty;
	}

	.grid {
		display: grid;
		gap: 4rem;
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.more {
		margin: 0;
	}

	.more a {
		color: var(--text-primary);
		text-decoration: underline;
		text-decoration-color: var(--border);
		text-underline-offset: 4px;
	}

	.more a:hover {
		text-decoration-color: var(--text-primary);
	}
</style>
