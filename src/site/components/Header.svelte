<script lang="ts">
	import { page } from '$app/state';
	import { onMount, tick } from 'svelte';
	import CopyCode from '$site/components/docs/copy-code.svelte';
	import { ModeToggle, presets, toggleMode } from 'fractalstyler2'
	import Sun from '$site/icons/sun.svelte'
	import Moon from '$site/icons/moon.svelte'
	import { ACCENT_EVENT, accents, currentAccentId, DEFAULT_ACCENT_ID, setAccent } from '$site/lib/accents';
	import { GITHUB_URL, NPM_URL, SITE_VERSION } from '$site/lib/site';
	import Logo from '$site/icons/markgraphy.svelte'

	const links = [
		{ label: 'docs', href: '/docs' },
		{ label: 'examples', href: '/docs/examples' },
		{ label: 'animations', href: '/docs/animations' },
		{ label: 'rules', href: '/docs/rules' },
		{ label: 'editor', href: '/docs/editor' }
	];

	const DOT_IDS = ['#ff3e00', '#2f9e44', '#1098ad', '#e67700', '#c92a2a'];
	const dots = DOT_IDS.map((id) => accents.find((a) => a.id === id)).filter((a) => a != null);
	let isDark = $state(false);
	const path = $derived(page.url.pathname);

	function applyMode() {
		toggleMode();
		isDark = document.documentElement.getAttribute('data-mode') === 'dark';
	}

	async function toggle() {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced || typeof document.startViewTransition !== 'function') {
			applyMode();
			return;
		}

		const transition = document.startViewTransition(async () => {
			applyMode();
			await tick();
		});

		try {
			await transition.ready;
		} catch {
			return;
		}

		// isDark is the mode we just swapped to. Going dark, the incoming
		// snapshot starts as a band at the top and grows down; going light, it
		// starts at the bottom and grows up.
		const from = isDark ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)';

		document.documentElement.animate(
			{ clipPath: [from, 'inset(0 0 0 0)'] },
			{
				duration: 520,
				easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
				pseudoElement: '::view-transition-new(root)'
			}
		);
	}

	function isCurrent(href: string) {
		if (href.startsWith('http')) return false;
		if (href === '/docs') return path === '/docs' || path.startsWith('/docs/graph-') || path.startsWith('/docs/installation') || path.startsWith('/docs/skill');
		return path === href || path.startsWith(href + '/');
	}

	let current = $state(DEFAULT_ACCENT_ID);
	const dark = $derived(presets.mode === 'dark');
	function sync() {
		current = currentAccentId();
	}

	$effect(() => {
		sync();
		window.addEventListener(ACCENT_EVENT, sync);
		return () => window.removeEventListener(ACCENT_EVENT, sync);
	});

	onMount(() => {
		isDark = document.documentElement.getAttribute('data-mode') === 'dark';
	});
</script>

<header class="site-wrapper row xbetween wfull">
	<a class="sitelogo" href="/">
		<Logo height={32} width={153}/>
	</a>
	<div class="hud-right grow row">
	<nav class="nav" aria-label="Primary">
		{#each links as link (link.href)}
			<a
				href={link.href}
				rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
				aria-current={isCurrent(link.href) ? 'page' : undefined}
			>
				<p><span class="kicker-hover">[ </span> {link.label} <span class="kicker-hover"> ]</span></p>
			</a>
		{/each}
	</nav>
		<div class="row gap-xs" role="radiogroup" aria-label="Accent">
			{#each dots as accent (accent.accent)}
				<button
					type="button"
					role="radio"
					class="accent-dot"
					style:--swatch={accent.accent}
					aria-checked={accent.accent === current}
					aria-label={accent.accent}
					onclick={() => setAccent(accent.accent)}
				></button>
			{/each}
		</div>
		<button class="button is-icon" onclick={toggle}>
			{#if dark}
				<Sun/>
			{:else}
				<Moon/>
			{/if}
		</button>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 40;
		height: 80px;
		align-items: center;
		padding: 0.7rem var(--pad);
		border-bottom: 1px dashed var(--border);
		background: var(--bg);
	}

	.sitelogo {
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
		min-width: 0;
	}

	.nav {
		display: flex;
		gap: 0.1rem;
	}

	.nav a {
		display: inline-flex;
		align-items: center;
		padding: 0.15rem 0.25rem;
		font-size: 0.9rem;
		text-transform: uppercase;
		text-decoration: none;
		white-space: nowrap;
	}

	.hud-right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 0.75rem;
		min-width: 0;
	}

	@media (max-width: 980px) {
		.nav {
			display: none;
		}
	}


</style>
