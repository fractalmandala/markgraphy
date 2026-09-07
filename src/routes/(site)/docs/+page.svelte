<script lang="ts">
	// The set: a cabinet of specimens. Hover or arrow through the index; the
	// plate shows the live component, the import box its snippet.
	import CopyCode from '$site/components/docs/copy-code.svelte';
	import PageHeader from '$site/components/docs/page-header.svelte';
	import { animatedComponents, components, staticComponents } from '$site/docs/catalog';
	import { previews } from '$site/docs/previews';
	import { SITE_NAME } from '$site/lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type Family = 'all' | 'graphs' | 'animated' | 'diagrams';
	const families: Family[] = ['all', 'graphs', 'animated', 'diagrams'];

	const animatedSlugs = new Set(animatedComponents.map((c) => c.slug));

	function familyOf(slug: string): Exclude<Family, 'all'> {
		if (animatedSlugs.has(slug)) return 'animated';
		if (slug.startsWith('graph-')) return 'graphs';
		return 'diagrams';
	}

	const specimens = components
		.filter((c) => previews[c.slug]?.length)
		.map((c) => ({ ...c, fam: familyOf(c.slug), entry: previews[c.slug][0] }));

	let fam = $state<Family>('all');
	let query = $state('');
	let selected = $state(specimens[0].slug);

	const visible = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return specimens.filter(
			(s) =>
				(fam === 'all' || s.fam === fam) &&
				(!q || (s.title + s.name + s.description).toLowerCase().includes(q))
		);
	});

	const active = $derived(
		visible.find((s) => s.slug === selected) ?? visible[0] ?? specimens[0]
	);

	const graphs = staticComponents.filter((c) => c.slug.startsWith('graph-')).length;
	const diagrams = staticComponents.length - graphs;

	function step(delta: number) {
		if (!visible.length) return;
		const i = visible.findIndex((s) => s.slug === active.slug);
		selected = visible[(i + delta + visible.length) % visible.length].slug;
	}

	function onkeydown(event: KeyboardEvent) {
		const t = event.target as HTMLElement | null;
		if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
		if (event.metaKey || event.ctrlKey || event.altKey) return;
		if (event.key === 'j' || event.key === 'ArrowDown') {
			event.preventDefault();
			step(1);
		} else if (event.key === 'k' || event.key === 'ArrowUp') {
			event.preventDefault();
			step(-1);
		}
	}
</script>

<svelte:window {onkeydown} />

<svelte:head>
	<title>The set — {SITE_NAME}</title>
	<meta
		name="description"
		content="Every graph, animation and diagram in the library, one plate at a time."
	/>
</svelte:head>

<div class="site-wrapper">
	<PageHeader
		title="A cabinet of instruments."
		kicker="the set"
		lead="{graphs} graphs, {animatedComponents.length} animations, {diagrams} diagrams. Hover a name or press j / k. The plate is the specimen. Open page for props and every example."
	/>

	<div class="cabinet">
		<aside class="index">
			<div class="tools">
				<input
					class="find"
					type="search"
					placeholder="find a graph…"
					aria-label="Find a graph"
					bind:value={query}
				/>
				<div class="tabs" role="group" aria-label="Family">
					{#each families as f (f)}
						<button
							type="button"
							class="tab"
							aria-pressed={fam === f}
							onclick={() => {
								fam = f;
								query = '';
							}}
						>
							[ {f} ]
						</button>
					{/each}
				</div>
			</div>
			<div class="list" role="listbox" aria-label="Specimens">
				{#if visible.length === 0}
					<p class="none">No match.</p>
				{/if}
				{#each visible as s (s.slug)}
					<button
						type="button"
						role="option"
						class="spec"
						aria-selected={s.slug === active.slug}
						onmouseenter={() => (selected = s.slug)}
						onclick={() => (selected = s.slug)}
						onfocus={() => (selected = s.slug)}
					>
						<span class="trim">{s.title.toLowerCase()}</span>
						<span class="fam">{s.fam}</span>
					</button>
				{/each}
			</div>
		</aside>

		<div class="plate-wrap">
			<div class="plate">
				{#key active.slug}
					<div class="art">
						<active.entry.Comp {...active.entry.props} />
					</div>
				{/key}
			</div>
			<div class="import-box">
				<header>
					<span>{active.fam} · {active.name}</span>
					<span class="actions">
						<CopyCode text={active.entry.code} label="copy" />
						<a class="ghost" href={`/docs/${active.slug}`}>Open page</a>
					</span>
				</header>
				<div class="code">{@html data.codeHtml[active.slug]}</div>
			</div>
		</div>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.cabinet {
		display: grid;
		grid-template-columns: 17rem minmax(0, 1fr);
		min-height: 0;
	}

	.index {
		border-right: 1px dashed var(--border);
		padding: 0.9rem 0.85rem 1.2rem 0;
		overflow: auto;
		max-height: calc(100svh - 14rem);
		scrollbar-width: thin;
		scrollbar-color: var(--border) transparent;
	}

	.tools {
		display: grid;
		gap: 0.7rem;
		margin-bottom: 0.9rem;
	}

	.find {
		width: 100%;
		min-height: 44px;
		padding: 0.55rem 0;
		background: transparent;
		border: 0;
		border-bottom: 1px dashed var(--border);
		color: var(--text-primary);
		font: inherit;
	}

	.find::placeholder {
		color: var(--site-faint);
	}

	.find:focus-visible {
		outline: none;
		border-bottom-color: var(--graph-accent);
	}

	.tabs {
		display: flex;
		gap: 0.25rem;
		flex-wrap: wrap;
	}

	.tab {
		min-height: 32px;
		padding: 0 0.6rem;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--site-muted);
		font: inherit;
		font-size: 0.62rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.tab:hover {
		color: var(--text-primary);
		border-color: var(--text-primary);
	}

	.tab[aria-pressed='true'] {
		color: var(--site-bg);
		background: var(--text-primary);
		border-color: var(--text-primary);
	}

	.list {
		display: grid;
	}

	.none {
		margin: 0;
		padding: 0.6rem 0.35rem;
		color: var(--site-muted);
	}

	.spec {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.6rem;
		width: 100%;
		min-height: 36px;
		align-items: center;
		padding: 0.42rem 0.35rem;
		border: 0;
		border-bottom: 1px dotted #2a2a2a;
		background: transparent;
		color: var(--site-muted);
		font: inherit;
		text-align: left;
	}

	.spec:hover {
		color: var(--text-primary);
	}

	.spec[aria-selected='true'] {
		color: var(--graph-accent);
	}

	.trim {
		min-width: 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.fam {
		color: var(--site-faint);
		font-size: 0.62rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.plate-wrap {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 0;
		padding: 1.6rem 0 1.3rem 1.3rem;
	}

	.plate {
		--graph-background: var(--bg-raised);
		min-height: 320px;
		padding: 1.8rem 1.3rem 1.2rem;
		background: var(--bg-raised);
		display: grid;
		align-items: center;
	}

	.art {
		min-width: 0;
		width: min(100%, 52rem);
		margin: 0 auto;
		overflow-x: auto;
	}

	.import-box {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		min-width: 0;
		padding: 0.85rem 0.9rem 0.95rem;
		border: 1px solid var(--border);
		background: #0c0c0c;
	}

	.import-box header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		color: var(--site-muted);
		font-size: 0.62rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.actions {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.actions .ghost {
		height: 32px;
		min-width: 0;
		padding: 0 0.85rem;
		font-size: 0.62rem;
	}

	.code {
		min-width: 0;
		overflow-x: auto;
	}

	.code :global(pre) {
		margin: 0;
		background: transparent !important;
		font-size: 0.8rem;
		line-height: 1.55;
		color: var(--site-muted);
		white-space: pre;
	}

	@media (max-width: 1024px) {
		.cabinet {
			grid-template-columns: 1fr;
		}

		.index {
			max-height: 14rem;
			padding: 0.7rem 0.75rem 0.9rem 0;
			border-right: 0;
			border-bottom: 1px dashed var(--border);
		}

		.plate-wrap {
			padding: 1.1rem 0 1rem;
			gap: 0.8rem;
		}

		.plate {
			min-height: 240px;
			padding: 1.2rem 0.9rem 1rem;
		}
	}
</style>
