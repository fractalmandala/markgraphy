<script lang="ts">
	import { page } from '$app/state';
	import {
		animatedComponents,
		components,
		getStarted,
		staticComponents
	} from '$site/docs/catalog';
	import MonoLabel from './mono-label.svelte';
	import SiteCorners from '../SiteCorners.svelte';
	import SiteRule from '../SiteRule.svelte';

	/**
	 * rail   — vertical sidebar for ≥1024px (sticky, scrolls internally).
	 * mobile — horizontal scroll strip for small screens.
	 */
	let { variant = 'rail' }: { variant?: 'rail' | 'mobile' } = $props();

	const path = $derived(page.url.pathname);

	const stripLinks = $derived([
		...getStarted.map((item) => ({ href: item.href, label: item.label })),
		{ href: '/docs/animations', label: 'Animations' },
		...components.map((item) => ({ href: `/docs/${item.slug}`, label: item.title }))
	]);
</script>

{#if variant === 'rail'}
	<aside class="rail">
		<SiteRule orientation="y" placement="right" />
		<div class="scroll">
			<nav class="nav" aria-label="Docs">
				<div class="group">
					<div class="label">
						<MonoLabel>Get started</MonoLabel>
					</div>
					<ul role="list">
						{#each getStarted as item (item.href)}
							<li>
								<a
									class="item"
									class:active={path === item.href}
									aria-current={path === item.href ? 'page' : undefined}
									href={item.href}
								>
									<span class="trim">{item.label}</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
				<div class="group">
					<div class="label">
						<MonoLabel>Components</MonoLabel>
					</div>
					<ul role="list">
						{#each staticComponents as item (item.slug)}
							<li>
								<a
									class="item"
									class:active={path === `/docs/${item.slug}`}
									aria-current={path === `/docs/${item.slug}` ? 'page' : undefined}
									href={`/docs/${item.slug}`}
								>
									<span class="trim">{item.title}</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
				<div class="group">
					<div class="label">
						<MonoLabel>Animated</MonoLabel>
					</div>
					<ul role="list">
						{#each animatedComponents as item (item.slug)}
							<li>
								<a
									class="item"
									class:active={path === `/docs/${item.slug}`}
									aria-current={path === `/docs/${item.slug}` ? 'page' : undefined}
									href={`/docs/${item.slug}`}
								>
									<span class="trim">{item.title}</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</nav>
		</div>
	</aside>
{:else}
	<nav class="strip" aria-label="Docs">
		<SiteRule placement="bottom" />
		<SiteCorners corners={['bl', 'br']} />
		<div class="row">
			{#each stripLinks as item (item.href)}
				<a
					class="chip"
					class:active={path === item.href}
					aria-current={path === item.href ? 'page' : undefined}
					href={item.href}
				>
					{item.label}
				</a>
			{/each}
		</div>
	</nav>
{/if}

<style>
	/* --- Desktop sidebar --- */

	.rail {
		display: none;
	}

	@media (min-width: 1024px) {
		.rail {
			display: block;
			position: sticky;
			top: 4.5rem;
			align-self: flex-start;
			flex-shrink: 0;
			width: 15rem;
			max-height: calc(100dvh - 5.5rem);
		}
	}

	.scroll {
		max-height: calc(100dvh - 5.5rem);
		overflow-y: auto;
	}

	.nav {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding-block: 2.5rem;
		padding-right: 1.5rem;
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.label {
		padding: 0 0.75rem;
	}

	.group ul {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
		color: var(--site-muted);
		text-decoration: none;
	}

	.item:hover {
		background: var(--site-faint);
		color: var(--site-fg);
	}

	.item.active {
		background: var(--site-faint);
		color: var(--site-fg);
	}

	.trim {
		min-width: 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	/* --- Mobile strip --- */

	.strip {
		position: relative;
	}

	@media (min-width: 1024px) {
		.strip {
			display: none;
		}
	}

	.row {
		display: flex;
		gap: 0.25rem;
		padding-block: 0.75rem;
		overflow-x: auto;
		white-space: nowrap;
	}

	.chip {
		flex-shrink: 0;
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
		color: var(--site-muted);
		text-decoration: none;
	}

	.chip:hover {
		background: var(--site-faint);
		color: var(--site-fg);
	}

	.chip.active {
		background: var(--site-faint);
		color: var(--site-fg);
	}
</style>
