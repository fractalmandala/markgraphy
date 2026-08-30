<script module lang="ts">
	import type { Glyphs } from '../frame/glyphs';
	import type { GraphPalette } from '../frame/tone';

	/** GitHub-style contribution grid: weeks across the frame, days down. */
	export interface ActivityDay {
		date: string;
		count: number;
	}

	export interface GraphActivityProps {
		title: string;
		days: ActivityDay[];
		weekStartsOn?: 0 | 1;
		max?: number;
		legend?: boolean;
		caption?: string | false;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	}
</script>

<script lang="ts">
	import Graph from '../frame/Graph.svelte';
	import GraphBody from '../frame/GraphBody.svelte';
	import { intensityGlyph, intensityLevel, resolveGlyphs } from '../frame/glyphs';
	import { intensityRole } from '../frame/tone';
	import type { ToneRole } from '../frame/tone';
	import { reveal, stagger } from '../frame/motion';

	const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const DAY_MS = 86_400_000;

	let {
		title,
		days,
		weekStartsOn = 0,
		max,
		legend = true,
		caption,
		glyphs,
		palette,
		corner,
		class: className = ''
	}: GraphActivityProps = $props();

	type Cell = { date: string; count: number; inRange: boolean };

	function parseUTC(iso: string) {
		const [year, month, day] = iso.split('-').map(Number);
		return Date.UTC(year, month - 1, day);
	}

	function toISO(utc: number) {
		return new Date(utc).toISOString().slice(0, 10);
	}

	function buildWeeks(list: ActivityDay[], start: 0 | 1) {
		if (list.length === 0) {
			return [] as Cell[][];
		}

		const counts = new Map<string, number>();
		let min = Number.POSITIVE_INFINITY;
		let maxTime = Number.NEGATIVE_INFINITY;

		for (const day of list) {
			const time = parseUTC(day.date);
			counts.set(day.date, day.count);
			if (time < min) min = time;
			if (time > maxTime) maxTime = time;
		}

		const lead = (new Date(min).getUTCDay() - start + 7) % 7;
		const trail = (start + 6 - new Date(maxTime).getUTCDay() + 7) % 7;
		const first = min - lead * DAY_MS;
		const last = maxTime + trail * DAY_MS;
		const weeks: Cell[][] = [];
		let week: Cell[] = [];

		for (let time = first; time <= last; time += DAY_MS) {
			const date = toISO(time);
			const inRange = time >= min && time <= maxTime;
			week.push({
				date,
				count: inRange ? (counts.get(date) ?? 0) : 0,
				inRange
			});
			if (week.length === 7) {
				weeks.push(week);
				week = [];
			}
		}

		return weeks;
	}

	function monthLabels(weeks: Cell[][]) {
		return weeks.map((week) => {
			const start = week.find((cell) => {
				if (!cell.inRange) {
					return false;
				}

				return new Date(parseUTC(cell.date)).getUTCDate() === 1;
			});

			if (!start) {
				return '';
			}

			return MONTHS[new Date(parseUTC(start.date)).getUTCMonth()] ?? '';
		});
	}

	function dayLabels(start: 0 | 1) {
		return start === 1 ? ['M', '', 'W', '', 'F', '', ''] : ['', 'M', '', 'W', '', 'F', ''];
	}

	const set = $derived(resolveGlyphs(glyphs));
	const weeks = $derived(buildWeeks(days, weekStartsOn));
	const months = $derived(monthLabels(weeks));
	const labels = $derived(dayLabels(weekStartsOn));
	const peak = $derived(max ?? Math.max(0, ...days.map((day) => day.count), 0));
	const total = $derived(days.reduce((sum, day) => sum + day.count, 0));
	const summary = $derived(`${total.toLocaleString('en-US')} contributions`);
	const quiet = $derived(set[0] ?? '·');

	const scale = $derived(
		set.map((glyph, index) => ({
			glyph,
			key: `${glyph}-${index}`,
			role: intensityRole(Math.round((index / Math.max(set.length - 1, 1)) * 4), palette)
		}))
	);

	const view = $derived(
		weeks.map((week) => ({
			key: week[0]?.date ?? '',
			cells: week.map((cell) => {
				const level = cell.inRange ? intensityLevel(cell.count, peak) : 0;
				return {
					date: cell.date,
					glyph: cell.inRange ? intensityGlyph(level, set) : quiet,
					role: (cell.inRange ? intensityRole(level, palette) : 'ghost') as ToneRole | 'ghost'
				};
			})
		}))
	);
</script>

<Graph {title} {corner} class={className}>
	<GraphBody>
		<div class="act">
			<div class="wrap">
				<div class="months">
					<span class="gutter"></span>
					{#each months as month, index (`m-${index}`)}
						<span class="mslot">
							{#if month}
								<span class="mlabel muted">{month}</span>
							{/if}
						</span>
					{/each}
				</div>
				<div class="body-row">
					<div class="days">
						{#each labels as label, index (`d-${index}`)}
							<span class="dlabel muted">{label}</span>
						{/each}
					</div>
					<div class="grid">
						{#each view as week, weekIndex (week.key || weekIndex)}
							<div
								class="wcol"
								use:reveal={{ delay: stagger(weekIndex, 10), amount: 0.2 }}
							>
								{#each week.cells as cell (cell.date)}
									<span
										class="dcell"
										class:ghost={cell.role === 'ghost'}
										class:c-frame={cell.role === 'empty'}
										class:c-muted={cell.role === 'muted'}
										class:c-fg={cell.role === 'foreground'}
										class:c-accent={cell.role === 'accent'}
										class:c-accent2={cell.role === 'accent2'}
										class:c-accent3={cell.role === 'accent3'}
									>
										{cell.glyph}
									</span>
								{/each}
							</div>
						{/each}
					</div>
				</div>
			</div>
			{#if caption !== false || legend}
				<div class="foot" class:end={caption === false}>
					{#if caption !== false}
						<p class="muted">{caption ?? summary}</p>
					{/if}
					{#if legend}
						<p class="legend">
							<span>Less</span>
							<span class="scale" aria-hidden="true">
								{#each scale as entry (entry.key)}
									<span
										class="sglyph"
										class:c-frame={entry.role === 'empty'}
										class:c-muted={entry.role === 'muted'}
										class:c-fg={entry.role === 'foreground'}
										class:c-accent={entry.role === 'accent'}
										class:c-accent2={entry.role === 'accent2'}
										class:c-accent3={entry.role === 'accent3'}
									>
										{entry.glyph}
									</span>
								{/each}
							</span>
							<span>More</span>
						</p>
					{/if}
				</div>
			{/if}
			<span class="sr-only">
				{total} contributions across {days.length} days{caption ? `. ${caption}` : ''}
			</span>
		</div>
	</GraphBody>
</Graph>

<style>
	.act {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.wrap {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 0.25rem;
	}

	.months {
		display: flex;
		width: 100%;
		height: 1.25em;
	}

	.gutter {
		width: 2ch;
		flex-shrink: 0;
	}

	.mslot {
		position: relative;
		min-width: 1ch;
		flex: 1;
	}

	.mlabel {
		position: absolute;
		bottom: 0;
		left: 0;
		white-space: nowrap;
	}

	.body-row {
		display: flex;
		width: 100%;
	}

	.days {
		display: flex;
		width: 2ch;
		flex-shrink: 0;
		flex-direction: column;
	}

	.dlabel {
		display: flex;
		height: 1.15em;
		align-items: center;
	}

	.grid {
		display: flex;
		min-width: 0;
		flex: 1;
	}

	.wcol {
		display: flex;
		min-width: 1ch;
		flex: 1;
		flex-direction: column;
	}

	.dcell {
		display: flex;
		width: 100%;
		height: 1.15em;
		align-items: center;
		justify-content: center;
		line-height: 1;
		user-select: none;
	}

	.foot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.foot.end {
		justify-content: flex-end;
	}

	.legend {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--graph-muted, oklch(0.62 0 0));
	}

	.scale {
		display: flex;
		user-select: none;
	}

	.sglyph {
		width: 1ch;
		text-align: center;
	}

	.muted {
		margin: 0;
		color: var(--graph-muted, oklch(0.62 0 0));
	}

	.ghost {
		color: transparent;
	}

	.c-accent {
		color: var(--graph-accent, oklch(0.78 0.17 155));
	}

	.c-accent2 {
		color: var(--graph-accent-2, oklch(0.78 0.12 70));
	}

	.c-accent3 {
		color: var(--graph-accent-3, oklch(0.75 0.1 200));
	}

	.c-frame {
		color: var(--graph-frame, oklch(0.6 0 0 / 0.5));
	}

	.c-fg {
		color: var(--graph-foreground, oklch(0.93 0 0));
	}

	.c-muted {
		color: var(--graph-muted, oklch(0.62 0 0));
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border-width: 0;
	}
</style>
