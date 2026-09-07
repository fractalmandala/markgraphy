<script lang="ts">
	// Rooms chrome for the four-room site: skip link, hud (brand, primary nav,
	// accent dots, install chip), grid backdrop, footer. Shared type classes
	// (h1, .page-head, .lede, .import-box, .tok, .dim) are styled here under
	// `.room :global(...)` so each room ships only its own layout styles.
	// Drop-in route home: src/routes/(rooms)/ — see docs/specs/specs-markgraphy-pages.md.
	import { page } from '$app/state';
	import CopyCode from '$site/components/docs/copy-code.svelte';
	import {
		ACCENT_EVENT,
		accents,
		currentAccentId,
		DEFAULT_ACCENT_ID,
		setAccent
	} from '$site/lib/accents';
	import { SITE_VERSION } from '$site/lib/site';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const rooms = [
		{ id: 'stage', href: '/stage' },
		{ id: 'set', href: '/set' },
		{ id: 'rules', href: '/rules' },
		{ id: 'install', href: '/install' }
	];

	const dots = ['#ff3e00', '#2f9e44', '#1098ad', '#e67700']
		.map((hex) => accents.find((accent) => accent.id === hex))
		.filter((accent) => accent != null);

	const path = $derived(page.url.pathname);

	let current = $state(DEFAULT_ACCENT_ID);

	function sync() {
		current = currentAccentId();
	}

	$effect(() => {
		sync();
		window.addEventListener(ACCENT_EVENT, sync);
		return () => window.removeEventListener(ACCENT_EVENT, sync);
	});
</script>

<a class="skip" href="#rooms">Skip to content</a>

<div class="shell widefull">
	<header class="hud">
		<div class="brand">
			<a class="brand-mark" href="/stage">mark<em>graphy</em></a>
			<span class="brand-ver">v{SITE_VERSION} · mit</span>
		</div>
		<nav class="nav" aria-label="Primary">
			{#each rooms as room (room.id)}
				<a href={room.href} aria-current={path === room.href ? 'page' : undefined}>
					[ {room.id} ]
				</a>
			{/each}
		</nav>
		<div class="hud-right">
			<div class="accents" role="group" aria-label="Accent">
				{#each dots as accent (accent.id)}
					<button
						type="button"
						class="accent-dot"
						style:--swatch={accent.accent}
						aria-pressed={accent.accent === current}
						aria-label={accent.label}
						onclick={() => setAccent(accent.accent)}
					></button>
				{/each}
			</div>
			<div class="install-chip">
				<code>pnpm add markgraphy</code>
				<CopyCode text="pnpm add markgraphy" label="copy" />
			</div>
		</div>
	</header>

	<div class="room" id="rooms">
	<div>
		{@render children()}
	</div>

	<footer>
		<span>markgraphy · glyphs, not geometry</span>
		<span>open source / mit</span>
	</footer>
</div>
</div>

<style>
	.skip {
		position: absolute;
		left: 1rem;
		top: -4rem;
		z-index: 80;
		padding: 0.5rem 0.75rem;
		background: var(--graph-accent);
		color: #140800;
		text-decoration: none;
	}

	.skip:focus-visible {
		top: 1rem;
	}

	.shell {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}

	.hud {
		position: sticky;
		top: 0;
		z-index: 40;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 1rem;
		padding: 0.7rem var(--pad);
		background: color-mix(in oklab, var(--site-bg) 88%, transparent);
		backdrop-filter: blur(14px);
		border-bottom: 1px dashed var(--border);
	}

	.brand {
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
		min-width: 0;
	}

	.brand-mark {
		font-family: var(--font-sans);
		font-weight: 600;
		font-size: 1.05rem;
		letter-spacing: -0.04em;
		color: var(--text-primary);
		text-decoration: none;
	}

	.brand-mark em {
		font-style: normal;
		color: var(--graph-accent);
	}

	.brand-ver {
		color: var(--site-muted);
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.nav {
		display: flex;
		gap: 0.15rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.nav a {
		display: inline-flex;
		align-items: center;
		min-height: 36px;
		padding: 0.35rem 0.65rem;
		color: var(--site-muted);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		text-decoration: none;
	}

	.nav a:hover {
		color: var(--text-primary);
	}

	.nav a[aria-current='page'] {
		color: var(--graph-accent);
	}

	.hud-right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 0.75rem;
		min-width: 0;
	}

	.accents {
		display: flex;
		gap: 0.35rem;
		align-items: center;
	}

	.accent-dot {
		width: 16px;
		height: 16px;
		padding: 0;
		border-radius: 99px;
		border: 1px solid color-mix(in oklab, var(--text-primary) 20%, transparent);
		background: var(--swatch);
	}

	.accent-dot[aria-pressed='true'] {
		outline: 1px solid var(--text-primary);
		outline-offset: 2px;
	}

	.install-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		min-height: 36px;
		padding: 0.28rem 0.35rem 0.28rem 0.8rem;
		border: 1px solid var(--border);
		background: var(--site-surface);
	}

	.install-chip code {
		font-size: 0.78rem;
		white-space: nowrap;
	}

	.room {
		position: relative;
		z-index: 1;
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
		padding: 0 var(--pad);
		cursor: crosshair;
	}

	/* The survey grid behind every room. Fixed to the viewport, masked to a
	   soft ellipse near the top, and ignored by pointer events. */
	.room::before {
		content: '';
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		opacity: 0.045;
		background-image:
			repeating-linear-gradient(to right, transparent 0 47px, #fff 47px 48px),
			repeating-linear-gradient(to bottom, transparent 0 47px, #fff 47px 48px);
		-webkit-mask-image: radial-gradient(ellipse at 50% 18%, #000 18%, transparent 72%);
		mask-image: radial-gradient(ellipse at 50% 18%, #000 18%, transparent 72%);
	}

	.room > :global(*) {
		position: relative;
		z-index: 1;
	}

	footer {
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.35rem 0.75rem;
		padding: 1rem var(--pad) 1.4rem;
		border-top: 1px dashed var(--border);
		color: var(--site-muted);
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	/* Shared room vocabulary: page heads, type, usage boxes, buttons row. */
	.room :global(h1) {
		margin: 0;
		font-family: var(--font-sans);
		font-weight: 600;
		font-size: clamp(2.4rem, 6.4vw, 5.8rem);
		letter-spacing: -0.07em;
		line-height: 0.88;
		text-wrap: balance;
	}

	.room :global(.page-head) {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 2rem;
		padding: 1.5rem 0 1.1rem;
		border-bottom: 1px dashed var(--border);
	}

	.room :global(.page-head .lede) {
		text-align: right;
		margin-left: auto;
	}

	.room :global(.lede) {
		max-width: 42ch;
		margin: 0;
		color: var(--site-muted);
		font-size: 0.92rem;
	}

	.room :global(.lede strong) {
		color: var(--text-primary);
		font-weight: 500;
	}

	.room :global(.kicker) {
		margin: 0 0 0.55rem;
	}

	.room :global(.tok) {
		color: var(--graph-accent);
	}

	.room :global(.dim) {
		color: var(--site-muted);
	}

	.room :global(.rule) {
		border: 0;
		border-top: 1px dotted var(--border);
		margin: 0.7rem 0;
	}

	.room :global(.caption) {
		margin: 0.85rem 0 0;
		color: var(--site-muted);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		text-align: center;
	}

	.room :global(.import-box) {
		border: 1px solid var(--border);
		background: #0c0c0c;
		padding: 0.85rem 0.9rem 0.95rem;
	}

	.room :global(.import-box header) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.65rem;
		color: var(--site-muted);
		font-size: 0.62rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.room :global(.import-box pre) {
		margin: 0;
		white-space: pre-wrap;
		word-break: break-word;
		font-size: 0.78rem;
		line-height: 1.55;
		color: var(--text-primary);
	}

	.room :global(.cta-row) {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	.room :global(.right) {
		text-align: right;
	}

	@media (max-width: 1024px) {
		.hud {
			grid-template-columns: 1fr auto;
			gap: 0.4rem 0.75rem;
			padding: 0.55rem var(--pad);
		}

		.nav {
			grid-column: 1 / -1;
			grid-row: 2;
			justify-content: flex-start;
			flex-wrap: nowrap;
			overflow-x: auto;
			scrollbar-width: none;
			margin: 0 -0.65rem;
		}

		.nav::-webkit-scrollbar {
			display: none;
		}

		.nav a {
			min-height: 32px;
			padding: 0.25rem 0.65rem;
		}

		.hud-right {
			gap: 0.5rem;
		}

		.install-chip {
			gap: 0.45rem;
			min-height: 32px;
			padding: 0.24rem 0.3rem 0.24rem 0.6rem;
		}

		.install-chip code {
			font-size: 0.7rem;
		}

		.room :global(h1) {
			font-size: clamp(2rem, 8vw, 3.4rem);
		}

		.room :global(.page-head) {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.9rem;
			padding: 1.1rem 0 0.9rem;
		}

		.room :global(.page-head .lede) {
			text-align: left;
			margin-left: 0;
		}
	}

	@media (max-width: 560px) {
		.brand-ver {
			display: none;
		}

		.hud-right .accents {
			display: none;
		}

		.nav a {
			padding: 0.25rem 0.5rem;
		}
	}
</style>
