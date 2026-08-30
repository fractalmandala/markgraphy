<script lang="ts">
	import SiteContainer from './SiteContainer.svelte';

	const principles = [
		{
			title: 'Characters, not SVG',
			body: 'Borders are dashes and plus signs. Bars and cells are glyphs. To animate, change a color or swap a character.'
		},
		{
			title: 'One accent color',
			body: 'Default is one highlight. Everything else stays muted. Pass palette="duo" or "multi" when a second or third hue earns its keep.'
		},
		{
			title: 'Quick entrance animations',
			body: 'Bars grow in, cells fill, rows appear when the component scrolls into view. Nothing loops. Animations stay under 220ms.'
		}
	];
</script>

<section>
	<SiteContainer>
		<div class="stack">
			<h2>How they work</h2>
			<dl class="grid">
				{#each principles as item (item.title)}
					<div class="item">
						<dt>{item.title}</dt>
						<dd>{item.body}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</SiteContainer>
</section>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	h2 {
		max-width: 35ch;
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		letter-spacing: -0.025em;
		text-wrap: balance;
	}

	.grid {
		display: grid;
		gap: 2rem;
		margin: 0;
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.item {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	dt {
		font-weight: 500;
		color: var(--site-fg);
	}

	dd {
		max-width: 40ch;
		margin: 0;
		color: var(--site-muted);
	}
</style>
