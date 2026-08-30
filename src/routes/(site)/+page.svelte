<script lang="ts">
	import {
		AmplifierDiagram,
		GraphActivity,
		GraphBullet,
		GraphCalendar,
		GraphHeatmap,
		GraphKpi,
		GraphPulse,
		GraphRank,
		GraphScope,
		GraphTicker,
		GraphTimer,
		GraphUptime,
		GraphWaterfall,
		PromptLoopDiagram
	} from '$lib';
	import AccentPicker from '$site/components/AccentPicker.svelte';
	import Hero from '$site/components/Hero.svelte';
	import Principles from '$site/components/Principles.svelte';
	import SiteContainer from '$site/components/SiteContainer.svelte';
	import Scenarios from '$site/components/Scenarios.svelte';
	import { SITE_NAME, SITE_DESCRIPTION } from '$site/lib/site';

	function activityDays(start: string, length: number) {
		const [year, month, day] = start.split('-').map(Number);
		const origin = Date.UTC(year, month - 1, day);
		return Array.from({ length }, (_, index) => {
			const time = origin + index * 86_400_000;
			const date = new Date(time).toISOString().slice(0, 10);
			const dow = new Date(time).getUTCDay();
			const week = Math.floor(index / 7);
			let count = 0;
			if (dow > 0 && dow < 6) {
				const pulse = (week + dow) % 9;
				count =
					pulse === 0
						? 12
						: pulse === 4
							? 7
							: pulse % 3 === 0
								? 3
								: index % 5 === 0
									? 1
									: 0;
			} else if (index % 13 === 0) {
				count = 2;
			}
			return { date, count };
		});
	}

	const commits = activityDays('2025-09-01', 371);

	const uptime = Array.from({ length: 90 }, (_, index) => {
		if (index === 41 || index === 42) {
			return 'down' as const;
		}
		if (index === 18 || index === 60 || index === 61) {
			return 'degraded' as const;
		}
		return 'ok' as const;
	});
</script>

<svelte:head>
	<title>{SITE_NAME} — Svelte graphs for markdown</title>
</svelte:head>

<Hero />

<section class="gallery">
	<SiteContainer>
		<div class="stack">
			<div class="intro">
				<h2>Every graph uses the same frame</h2>
				<p>
					Activity grids, calendars, and status strips included. Install one
					component or pull in the whole set.
				</p>
			</div>
			<AccentPicker />
			<div class="scroll">
				<GraphActivity days={commits} palette="multi" title="COMMITS" />
			</div>
			<div class="grid">
				<GraphWaterfall
					items={[
						{ label: 'Revenue', value: 48 },
						{ label: 'Refunds', value: -6 },
						{ label: 'Hosting', value: -4 },
						{ label: 'Profit', value: 38 }
					]}
					palette="duo"
					ticks={18}
					title="MARGIN"
				/>
				<GraphBullet
					items={[
						{ label: 'CPU', value: 72, target: 80, max: 100 },
						{ label: 'RAM', value: 34, target: 64, max: 100 },
						{ label: 'SSD', value: 91, target: 90, max: 100 }
					]}
					palette="duo"
					title="LOAD"
				/>
			</div>
			<div class="grid">
				<GraphCalendar marks={[12, 18]} month={8} palette="duo" today={27} year={2026} />
				<GraphUptime
					days={uptime}
					from="Jun 1"
					palette="duo"
					title="API"
					to="Aug 29"
				/>
			</div>
			<div class="grid">
				<GraphHeatmap
					columns={['0', '4', '8', '12', '16', '20']}
					palette="multi"
					rows={[
						{ label: 'Mon', values: [0, 1, 4, 8, 6, 1] },
						{ label: 'Tue', values: [0, 0, 5, 9, 4, 2] },
						{ label: 'Wed', values: [1, 0, 6, 12, 5, 1] },
						{ label: 'Thu', values: [0, 2, 4, 7, 8, 3] },
						{ label: 'Fri', values: [0, 1, 3, 5, 2, 0] }
					]}
					title="DEPLOYS"
				/>
				<GraphRank
					items={[
						{ label: '/docs', value: 12400 },
						{ label: '/install', value: 4100 },
						{ label: '/plot', value: 860 },
						{ label: '/rank', value: 420 }
					]}
					palette="duo"
					title="ROUTES"
				/>
			</div>
			<div class="grid">
				<GraphKpi
					data={[4, 5, 5, 6, 8, 7, 9, 8, 11, 10, 12, 14]}
					hint="+18%"
					label="this week"
					palette="duo"
					title="READS"
					value="12,400"
				/>
				<GraphTimer
					at="2026-08-01T00:00:00Z"
					caption="api"
					kind="elapsed"
					palette="duo"
					title="UPTIME"
				/>
			</div>
			<p class="more more-lead">Animated diagrams, same accent:</p>
			<div class="grid">
				<PromptLoopDiagram autoPlay speedMs={1400} />
				<AmplifierDiagram gain={3.5} />
			</div>
			<div class="scroll">
				<GraphTicker
					title="FLEET"
					items={[
						{ label: 'api', status: 'ok' },
						{ label: 'db-lag 2.1s', status: 'warn' },
						{ label: 'edge-eu', status: 'down' },
						{ label: 'cdn', status: 'ok' }
					]}
				/>
			</div>
			<div class="grid">
				<GraphScope
					title="RPM"
					mode="area"
					data={[12, 18, 31, 27, 44, 39, 52, 48, 61, 55, 40, 33, 25, 29, 37, 46, 58, 50, 42, 35]}
				/>
				<GraphPulse title="API" length={60} intervalMs={900} />
			</div>
			<p class="more">
				<a href="/docs">All components</a>
				<a href="/docs/editor">Diagram editor</a>
			</p>
		</div>
	</SiteContainer>
</section>

<Scenarios />

<Principles />

<style>
	.gallery .stack {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h2 {
		max-width: 35ch;
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		letter-spacing: -0.025em;
		text-wrap: balance;
	}

	.intro p {
		max-width: 48ch;
		margin: 0;
		color: var(--site-muted);
	}

	.scroll {
		overflow-x: auto;
	}

	.grid {
		display: grid;
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.more {
		margin: 0;
		display: flex;
		gap: 1.5rem;
	}

	.more-lead {
		color: var(--site-muted);
	}

	.more a {
		color: var(--site-fg);
		text-decoration: underline;
		text-decoration-color: var(--site-rail);
		text-underline-offset: 4px;
	}

	.more a:hover {
		text-decoration-color: var(--site-fg);
	}
</style>
