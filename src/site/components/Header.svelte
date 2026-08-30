<script lang="ts">
	import { GITHUB_URL, NPM_URL, SITE_NAME } from '$site/lib/site';
	import AccentPicker from './AccentPicker.svelte';
	import SiteCorners from './SiteCorners.svelte';
	import SiteRule from './SiteRule.svelte';
</script>

<header class="header">
	<SiteRule placement="bottom" />
	<div class="inner">
		<SiteRule orientation="y" placement="left" />
		<SiteRule orientation="y" placement="right" />
		<SiteCorners />
		<div class="row">
			<a class="logo" href="/">{SITE_NAME}</a>
			<nav class="nav" aria-label="Primary">
				<ul role="list">
					<li><a class="link" href="/docs">library</a></li>
					<li><a class="link" href="/docs/examples">examples</a></li>
					<li><a class="link" href="/docs/animations">animations</a></li>
				</ul>
			</nav>
			<div class="right">
				<div class="picker">
					<AccentPicker compact />
				</div>
				<a class="link" href={GITHUB_URL} rel="noreferrer">source</a>
				<a class="link" href={NPM_URL} rel="noreferrer">npm</a>
			</div>
		</div>
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 40;
		background: color-mix(in oklab, var(--site-bg) 40%, transparent);
		backdrop-filter: blur(4px);
	}

	.inner {
		position: relative;
		isolation: isolate;
		width: 100%;
		max-width: var(--site-max);
		margin-inline: auto;
		padding-inline: 1rem;
	}

	@media (min-width: 640px) {
		.inner {
			padding-inline: 1.5rem;
		}
	}

	@media (min-width: 1024px) {
		.inner {
			padding-inline: 2rem;
		}
	}

	.row {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding-block: 1rem;
	}

	.logo {
		flex-shrink: 0;
		color: var(--site-fg);
		text-decoration: none;
	}

	.nav ul {
		display: none;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (min-width: 480px) {
		.nav ul {
			display: flex;
			align-items: center;
			gap: 1.5rem;
		}
	}

	.right {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-left: auto;
	}

	.picker {
		display: none;
	}

	@media (min-width: 640px) {
		.picker {
			display: block;
		}
	}

	.link {
		color: var(--site-muted);
		text-decoration: none;
	}

	.link:hover {
		color: var(--site-fg);
	}
</style>
