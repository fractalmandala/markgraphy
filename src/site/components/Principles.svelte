<script lang="ts">
	const principles = [
		{
			idx: '01',
			title: 'Glyphs do the drawing.',
			body: '█ ▓ ▒ ░ · = + | ├ └ — the chart is the text. Anything monospace will host it. Markdown, mdsvex, a terminal, a README.'
		},
		{
			idx: '02',
			title: 'The frame is the brand.',
			body: 'Every graph sits in a dashed edge with a [ TITLE ] and + corners. Swap the corner mark. Keep the discipline.'
		},
		{
			idx: '03',
			title: 'One accent, on purpose.',
			body: 'Unused rows recede. Color is a decision, not a palette dump. palette="duo" and "multi" when a second series earns it.'
		}
	];
</script>

<section class="section" id="rules">
	<div class="section-head">
		<h2 class="display">Three rules.</h2>
		<p>The library is a taste system disguised as a chart kit.</p>
	</div>
	<div class="principles">
		{#each principles as item (item.idx)}
			<article class="principle">
				<p class="idx">[ {item.idx} ]</p>
				<h3>{item.title}</h3>
				<p class="body">{item.body}</p>
			</article>
		{/each}
	</div>
</section>

<style>
	.section {
		position: relative;
		z-index: 1;
		padding: 3.2rem var(--pad) 4rem;
		border-top: 1px dashed var(--site-rail);
	}

	.section-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		max-width: var(--site-max);
		margin: 0 auto 1.6rem;
	}

	h2 {
		margin: 0;
		font-size: clamp(1.6rem, 3vw, 2.4rem);
	}

	.section-head p {
		max-width: 42ch;
		margin: 0;
		color: var(--site-muted);
		font-size: 0.85rem;
	}

	.principles {
		max-width: var(--site-max);
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border: 1px dashed var(--site-rail);
	}

	.principle {
		padding: 1.6rem 1.3rem 1.5rem;
		border-right: 1px dashed var(--site-rail);
	}

	.principle:last-child {
		border-right: 0;
	}

	.idx {
		margin: 0 0 0.8rem;
		color: var(--graph-accent);
		letter-spacing: 0.16em;
		font-size: 0.66rem;
	}

	h3 {
		margin: 0 0 0.55rem;
		font-family: var(--font-sans);
		font-size: 1.35rem;
		font-weight: 600;
		letter-spacing: -0.03em;
	}

	.body {
		max-width: 34ch;
		margin: 0;
		color: var(--site-muted);
		font-size: 0.85rem;
	}

	@media (max-width: 980px) {
		.section-head {
			flex-direction: column;
		}

		.principles {
			grid-template-columns: 1fr;
		}

		.principle {
			border-right: 0;
			border-bottom: 1px dashed var(--site-rail);
		}

		.principle:last-child {
			border-bottom: 0;
		}
	}
</style>
