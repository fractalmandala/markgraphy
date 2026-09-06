<script lang="ts">
	// Home page hero: one instrument at a time in the vitrine, its dossier
	// beside it, a filmstrip of the eight instruments beneath. j/k or arrows
	// move through the strip.
	import { instrumentPreview, instruments } from '$site/lib/instruments';
	let current = $state(0);

	const instrument = $derived(instruments[current]);

	function mount(next: number) {
		current = (next + instruments.length) % instruments.length;
	}

</script>	

<div class="film">
		<div class="film-label">select instrument · j / k</div>
		<div class="clips" role="listbox" aria-label="Instruments">
			{#each instruments as item, i (item.slug)}
				<button
					type="button"
					role="option"
					class="clip"
					class:active={i === current}
					aria-selected={i === current}
					onclick={() => mount(i)}
				>
					<pre class="mini">{item.thumb}</pre>
					<div class="name">[ {item.title} ]</div>
				</button>
			{/each}
		</div>
	</div>