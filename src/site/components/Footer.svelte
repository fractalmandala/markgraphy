<script lang="ts">
	import { GITHUB_URL, NPM_URL, SITE_NAME } from '$site/lib/site';
	import SiteContainer from './SiteContainer.svelte';

	const links = [
		{ label: 'Docs', href: '/docs' },
		{ label: 'Examples', href: '/docs/examples' },
		{ label: 'Animations', href: '/docs/animations' },
		{ label: 'Installation', href: '/docs/installation' },
		{ label: 'Skill', href: '/docs/skill' },
		{ label: 'llms.txt', href: '/llms.txt' },
		{ label: 'npm', href: NPM_URL },
		{ label: 'Source', href: GITHUB_URL }
	];
</script>

<footer>
	<SiteContainer corners={['tl', 'tr', 'bl', 'br']}>
		<div class="stack">
			<div class="row">
				<a class="logo" href="/">{SITE_NAME}</a>
				<nav aria-label="Footer">
					<ul class="links" role="list">
						{#each links as link (link.label)}
							<li>
								<a class="link" href={link.href} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
			<p class="note">
				MIT licensed. Install from npm, import into any SvelteKit app — the
				graphs sit next to your prose.
			</p>
		</div>
	</SiteContainer>
</footer>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.row {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	@media (min-width: 640px) {
		.row {
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;
		}
	}

	.logo {
		color: var(--site-fg);
		text-decoration: none;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.link {
		color: var(--site-muted);
		text-decoration: none;
	}

	.link:hover {
		color: var(--site-fg);
	}

	.note {
		max-width: 56ch;
		margin: 0;
		color: var(--site-muted);
	}
</style>
