<script lang="ts">
	import { page } from '$app/state';
	import CopyCode from '$site/components/docs/copy-code.svelte';
	import { ACCENT_EVENT, accents, currentAccentId, DEFAULT_ACCENT_ID, setAccent } from '$site/lib/accents';
	import { GITHUB_URL, NPM_URL, SITE_VERSION } from '$site/lib/site';
	import Logo from '$site/icons/markgraphy.svelte'

	const links = [
		{ label: 'docs', href: '/docs' },
		{ label: 'examples', href: '/docs/examples' },
		{ label: 'animations', href: '/docs/animations' },
		{ label: 'rules', href: '/docs/rules' },
		{ label: 'editor', href: '/docs/editor' },
		{ label: 'source', href: GITHUB_URL },
		{ label: 'npm', href: NPM_URL }
	];

	const DOT_IDS = ['#ff3e00', '#2f9e44', '#1098ad', '#e67700', '#c92a2a'];
	const dots = DOT_IDS.map((id) => accents.find((a) => a.id === id)).filter((a) => a != null);

	const path = $derived(page.url.pathname);

	function isCurrent(href: string) {
		if (href.startsWith('http')) return false;
		if (href === '/docs') return path === '/docs' || path.startsWith('/docs/graph-') || path.startsWith('/docs/installation') || path.startsWith('/docs/skill');
		return path === href || path.startsWith(href + '/');
	}

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

<header class="site-wrapper row xbetween wfull">
	<a class="sitelogo" href="/">
		<Logo/>
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
		border-bottom: 1px dashed var(--site-rail);
		background: var(--site-bg);
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
		font-size: 0.75rem;
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
