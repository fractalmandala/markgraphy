<script lang="ts">
	// Home page hero: one instrument at a time in the vitrine, its dossier
	// beside it, a filmstrip of the eight instruments beneath. j/k or arrows
	// move through the strip.
	import CopyCode from '$site/components/docs/copy-code.svelte';
	import { staticComponents, animatedComponents } from '$site/docs/catalog';
	import { instrumentPreview, instruments } from '$site/lib/instruments';
	import Logo from '$site/icons/markgraphy.svelte'
	import Markgraphy from '$site/icons/markgraphy.svelte';
	import Agni from '$lib/animated/GraphAgni.svelte'

	let { codeHtml }: { codeHtml: Record<string, string> } = $props();

	let current = $state(0);

	const instrument = $derived(instruments[current]);
	const preview = $derived(instrumentPreview(instrument));
	const index = $derived(String(current + 1).padStart(2, '0'));
	const total = $derived(String(instruments.length).padStart(2, '0'));

	const components = {
		static: staticComponents.filter((c) => c.slug.startsWith('graph-')).length,
		diagram: staticComponents.filter((c) => !c.slug.startsWith('graph-')).length,
		animated: animatedComponents.length
	};

	function mount(next: number) {
		current = (next + instruments.length) % instruments.length;
	}

	function onkeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement | null;
		if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
			return;
		}
		if (event.metaKey || event.ctrlKey || event.altKey) {
			return;
		}
		if (event.key === 'j' || event.key === 'ArrowRight') {
			event.preventDefault();
			mount(current + 1);
		} else if (event.key === 'k' || event.key === 'ArrowLeft') {
			event.preventDefault();
			mount(current - 1);
		}
	}
</script>

<svelte:window {onkeydown} />

<section class="observatory pad-top-xl" id="stage">
	<div class="box xleft ta-l">
		<div>
			<p class="text-muted text-sm">[ graphs | charts | svelte 5 | mdsvex ]</p>
			<h1 class="display">
				<Logo height={128} width={612}/>
			</h1>
			<p class="text-3xl weight-300">
				Graphs, charts and animated diagrams for a novel render and aesthetic to markdown notes.<br>
				Block glyphs, dashed frames, one accent, thousands of iconsets.
			</p>
			<p class="text-xl text-secondary lh15">
				{components.static} graphs, {components.animated} animations, {components.diagram} diagrams
				— same frame, same accent, same vocabulary.
				<button><span class="proof-pill">Svelte 5 only · 0 dependencies</span></button>
			</p>
			<div class="cta-row">
				<a class="cta primary" href="/docs">Read the docs →</a>
				<a class="cta ghost" href="/docs/installation">pnpm add markgraphy</a>
				<a class="cta ghost" href="/docs/editor">Open the editor</a>
			</div>
		</div> 
	</div>

	<div class="stage">
		<div class="vitrine">
			{#key current}
				<div class="live">
					<preview.Comp {...preview.props} />
				</div>
			{/key}
		</div>

		<aside class="dossier">
			<div class="meta-row">
				<span>Instrument <b>{index}</b> / {total}</span>
				<span>{instrument.kind}</span>
			</div>
			<dl class="spec-list">
				<div><dt>import</dt><dd>{instrument.component}</dd></div>
				<div><dt>draws</dt><dd>{instrument.draws}</dd></div>
				<div><dt>peer</dt><dd>Svelte 5 only</dd></div>
				<div><dt>engine</dt><dd>characters · no SVG</dd></div>
			</dl>
			<div class="import-box">
				<header>
					<span>usage</span>
					<CopyCode text={preview.code} label="copy code" />
				</header>
				<div class="code">{@html codeHtml[instrument.slug]}</div>
				<a class="docs-link" href={`/docs/${instrument.slug}`}>[ docs → {instrument.component} ]</a>
			</div>
		</aside>
	</div>

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
</section>

<style>
	.observatory {
		position: relative;
		z-index: 1;
		min-height: calc(100svh - 3.4rem);
		display: flex;
		flex-direction: column;
	}

	.stage-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 2rem;
		padding: 1.6rem 0 1.1rem;
		border-bottom: 1px dashed var(--border);
	}

	h1 {
		margin: 0;
		font-size: clamp(2.6rem, 7.2vw, 6.4rem);
	}

	.lede-wrap {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.9rem;
		max-width: 38ch;
		margin-left: auto;
	}

	.lede {
		margin: 0;
		color: var(--text-primary);
		font-size: 0.98rem;
		line-height: 1.45;
		text-align: right;
	}

	.lede strong {
		color: var(--graph-accent);
		font-weight: 500;
	}

	.proof {
		margin: 0;
		color: var(--site-muted);
		font-size: 0.76rem;
		line-height: 1.5;
		text-align: right;
	}

	.proof-pill {
		display: inline-block;
		margin-top: 0.35rem;
		padding: 0.18rem 0.5rem;
		border: 1px solid var(--border);
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.08em;
		color: var(--text-primary);
	}

	.cta-row {
		display: flex;
		gap: 0.55rem;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.cta {
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.06em;
		text-decoration: none;
		padding: 0.55rem 0.9rem;
		border: 1px solid var(--border);
		transition:
			border-color 0.18s ease,
			color 0.18s ease,
			background-color 0.18s ease;
	}

	.cta.primary {
		background: var(--graph-accent);
		color: var(--site-bg);
		border-color: var(--graph-accent);
	}

	.cta.primary:hover {
		background: transparent;
		color: var(--graph-accent);
	}

	.cta.ghost {
		background: transparent;
		color: var(--text-primary);
	}

	.cta.ghost:hover {
		border-color: var(--graph-accent);
		color: var(--graph-accent);
	}

	.stage {
		flex: 1;
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(18rem, 0.7fr);
		min-height: 0;
		border-left: 1px dashed var(--border);
		border-right: 1px dashed var(--border);
	}

	.vitrine {
		position: relative;
		min-width: 0;
		min-height: 420px;
		padding: 2.2rem 1.6rem 1.6rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.85rem;
	}

	.live {
		--graph-background: var(--bg-raised);
		min-width: 0;
		padding: 1.6rem 1rem 1.2rem;
		background: var(--bg-raised);
	}

	/* The active instrument marches its frame. Reduced motion leaves it still. */
	@media (prefers-reduced-motion: no-preference) {
		.live :global(.graph) {
			animation: march 0.7s linear infinite;
		}
	}

	@keyframes march {
		to {
			background-position:
				8px 0,
				100% 8px,
				-8px 100%,
				0 -8px;
		}
	}

	.dossier {
		min-width: 0;
		border-left: 1px dashed var(--border);
		padding: 1.6rem 1.3rem 1.4rem;
		display: flex;
		flex-direction: column;
		gap: 1.15rem;
		background: linear-gradient(180deg, #141414 0%, var(--site-bg) 100%);
	}

	.meta-row {
		display: flex;
		justify-content: space-between;
		color: var(--site-muted);
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.meta-row b {
		color: var(--text-primary);
		font-weight: 500;
	}

	.spec-list {
		display: grid;
		gap: 0.55rem;
		margin: 0;
		color: var(--site-muted);
		font-size: 0.8rem;
	}

	.spec-list div {
		display: grid;
		grid-template-columns: 9ch 1fr;
		gap: 0.8rem;
		border-bottom: 1px dotted #2a2a2a;
		padding-bottom: 0.45rem;
	}

	dt {
		color: var(--site-faint);
	}

	dd {
		margin: 0;
		color: var(--text-primary);
	}

	.import-box {
		margin-top: auto;
		border: 1px solid var(--border);
		background: #0c0c0c;
		padding: 0.85rem 0.9rem 0.95rem;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.import-box header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--site-muted);
		font-size: 0.62rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.code {
		min-width: 0;
		overflow-x: auto;
		font-size: 0.78rem;
		line-height: 1.55;
	}

	.code :global(pre) {
		margin: 0;
		background: transparent !important;
		white-space: pre;
	}

	.code :global(code) {
		font-family: var(--font-mono);
	}

	.docs-link {
		align-self: flex-start;
		color: var(--site-muted);
		font-size: 0.68rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		text-decoration: none;
	}

	.docs-link:hover {
		color: var(--graph-accent);
	}

	.film {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.8rem;
		align-items: stretch;
		padding-top: 0.9rem;
	}

	.film-label {
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		color: var(--site-muted);
		letter-spacing: 0.18em;
		font-size: 0.62rem;
		text-transform: uppercase;
		display: grid;
		place-items: center;
		padding: 0.4rem 0;
	}

	.clips {
		display: flex;
		gap: 0.65rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		padding: 0.55rem 0.15rem 0.75rem;
		scrollbar-width: thin;
		scrollbar-color: var(--border) transparent;
	}

	.clip {
		--dash: var(--border) 0 4px, transparent 4px 8px;
		position: relative;
		flex: 0 0 11.5rem;
		scroll-snap-align: start;
		text-align: left;
		border: 0;
		background-color: transparent;
		background-image:
			repeating-linear-gradient(to right, var(--dash)),
			repeating-linear-gradient(to bottom, var(--dash)),
			repeating-linear-gradient(to right, var(--dash)),
			repeating-linear-gradient(to bottom, var(--dash));
		background-repeat: repeat-x, repeat-y, repeat-x, repeat-y;
		background-position:
			0 0,
			100% 0,
			0 100%,
			0 0;
		background-size:
			100% 1px,
			1px 100%,
			100% 1px,
			1px 100%;
		padding: 0.85rem 0.7rem 0.7rem;
		min-height: 96px;
		color: var(--site-muted);
		font-family: var(--font-mono);
	}

	.clip:hover {
		color: var(--text-primary);
	}

	.clip.active {
		color: var(--graph-accent);
	}

	@media (prefers-reduced-motion: no-preference) {
		.clip.active {
			animation: march 0.7s linear infinite;
		}
	}

	.mini {
		height: 48px;
		margin: 0 0 0.55rem;
		overflow: hidden;
		font-size: 9px;
		line-height: 1.15;
		letter-spacing: 0.02em;
		white-space: pre;
		color: var(--site-muted);
	}

	.clip.active .mini {
		color: var(--graph-accent);
	}

	.name {
		letter-spacing: 0.14em;
		font-size: 0.62rem;
		text-transform: uppercase;
	}

	@media (max-width: 980px) {
		.stage {
			grid-template-columns: 1fr;
		}

		.stage-head {
			flex-direction: column;
			align-items: flex-start;
		}

		.lede-wrap {
			align-items: flex-start;
			max-width: none;
			margin-left: 0;
		}

		.lede,
		.proof {
			text-align: left;
		}

		.cta-row {
			justify-content: flex-start;
		}

		.dossier {
			border-left: 0;
			border-top: 1px dashed var(--border);
		}

		.vitrine {
			padding-inline: 1rem;
			min-height: 0;
		}
	}
</style>
