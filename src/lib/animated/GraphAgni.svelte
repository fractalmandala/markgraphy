<script module lang="ts">
	export interface GraphAgniProps {
		/** Caption drawn on the top edge as `[ TITLE ]`. Uppercase, 1–2 words. */
		title: string;
		/** Animate the burn. Default true. Reduced motion freezes a mid-burn frame. */
		animated?: boolean;
		/** Width of the scene in characters. Default 56. */
		cols?: number;
		/** Height of the scene in rows. Default 16. */
		rows?: number;
		/** Milliseconds per simulation step. Default 90. */
		speedMs?: number;
		/** Random decay strength; higher burns out sooner. Default 0.6. */
		cooling?: number;
		/** Seed for the reproducible burn. Default 3. */
		seedNum?: number;
		/** Short caption under the art; the art itself is decorative. */
		label?: string;
		class?: string;
	}

	/** Deterministic mulberry32 PRNG so a seed replays the same burn. */
	function mulberry32(seed: number): () => number {
		let a = seed >>> 0;

		return () => {
			a = (a + 0x6d2b79f5) | 0;
			let t = Math.imul(a ^ (a >>> 15), 1 | a);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	/** One-time reduced-motion check, for choosing the opening frame only. */
	function prefersReduced(): boolean {
		return (
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		);
	}

	interface Seg {
		text: string;
		cls?: string;
	}

	interface Spark {
		x: number;
		y: number;
		age: number;
	}

	const HOT = 0.75;
	const MID = 0.5;
	const LOW = 0.3;
	const EMBER = 0.12;

	/** Run-length encode one row of heat into classed segments, never per-cell spans. */
	function heatSegs(row: number[]): Seg[] {
		const segs: Seg[] = [];
		let buf = '';
		let cls: string | undefined;

		for (const heat of row) {
			let ch = ' ';
			let next: string | undefined;

			if (heat >= HOT) {
				ch = '█';
				next = 'hot';
			} else if (heat >= MID) {
				ch = '▓';
			} else if (heat >= LOW) {
				ch = '▒';
				next = 'mid';
			} else if (heat >= EMBER) {
				ch = '░';
				next = 'faint';
			}

			if (next === cls) {
				buf += ch;
			} else {
				if (buf.length > 0) {
					segs.push({ text: buf, cls });
				}

				cls = next;
				buf = ch;
			}
		}

		if (buf.length > 0) {
			segs.push({ text: buf, cls });
		}

		return segs;
	}
</script>

<script lang="ts">
	import Graph from '../frame/Graph.svelte';
	import GraphBody from '../frame/GraphBody.svelte';

	let {
		title,
		animated = true,
		cols = 56,
		rows = 16,
		speedMs = 90,
		cooling = 0.6,
		seedNum = 3,
		label = 'the carrier of offerings',
		class: className = ''
	}: GraphAgniProps = $props();

	// svelte-ignore state_referenced_locally
	const rand = mulberry32(seedNum);
	// svelte-ignore state_referenced_locally
	const width = Math.max(24, cols);
	// svelte-ignore state_referenced_locally
	const height = Math.max(10, rows);

	// The havan kund: a shallow pit at the bottom center. Fire rises from the
	// mouth between the slanted walls; everything above is flame column.
	const mouth = Math.max(7, Math.round(width * 0.24));
	const centerX = Math.floor(width / 2);
	const pitLeft = centerX - Math.floor(mouth / 2);
	const pitRight = pitLeft + mouth - 1;
	const pitRow = height - 2;

	// Flame column narrows toward the top so the burn reads as a tongue, not a wall.
	function coneMask(y: number, x: number): number {
		const flameRows = pitRow;
		const t = 1 - y / flameRows;
		const spread = mouth / 2;
		const allow = spread * (0.4 + 0.6 * (1 - t));
		const dx = Math.abs(x - centerX) / spread;

		if (dx > 1) {
			return 0;
		}

		return dx <= allow / spread ? 1 - 0.3 * dx : 0;
	}

	function initialGrid(): number[][] {
		const grid: number[][] = [];

		for (let y = 0; y < pitRow; y++) {
			grid.push(new Array<number>(width).fill(0));
		}

		for (let x = pitLeft; x <= pitRight; x++) {
			grid[pitRow - 1][x] = 1;
		}

		return grid;
	}

	// Heat climbs from the mouth, shaped by the cone, breathing on the cooling term.
	function stepFlame(grid: number[][], tick: number): number[][] {
		const next: number[][] = [];
		const breath = 1 + 0.3 * Math.sin(tick / 12);

		for (let y = 0; y < pitRow; y++) {
			next.push(new Array<number>(width).fill(0));
		}

		for (let y = 0; y < pitRow - 1; y++) {
			for (let x = pitLeft - 1; x <= pitRight + 1; x++) {
				const below =
					(grid[y + 1][x - 1] + grid[y + 1][x] + grid[y + 1][x + 1]) / 3;

				next[y][x] = Math.max(
					0,
					below * (1 - rand() * cooling * breath * 0.5) * coneMask(y, x)
				);
			}
		}

		for (let x = pitLeft; x <= pitRight; x++) {
			next[pitRow - 1][x] = 1;
		}

		return next;
	}

	function stepSparks(sparks: Spark[], grid: number[][]): Spark[] {
		const alive: Spark[] = [];

		for (const s of sparks) {
			const y = s.y - 1;
			const x = s.x + (rand() < 0.3 ? (rand() < 0.5 ? -1 : 1) : 0);
			const age = s.age + 1;

			if (y >= 0 && age < height + 2) {
				alive.push({ x, y, age });
			}
		}

		if (sparks.length < 7 && rand() < 0.22) {
			const x = pitLeft + Math.floor(rand() * mouth);
			const y = pitRow - 2;

			if (grid[pitRow - 1][x] >= 1) {
				alive.push({ x, y, age: 0 });
			}
		}

		return alive;
	}

	const moving = $derived(
		animated &&
			(typeof window === 'undefined' ||
				!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
	);

	let sim = initialGrid();
	let embers: Spark[] = [];

	// svelte-ignore state_referenced_locally
	const preTicks = animated && !prefersReduced() ? 16 : pitRow * 2 + 6;

	// Just lit when animated; a developed mid-burn when frozen.
	for (let i = 0; i < preTicks; i++) {
		sim = stepFlame(sim, i);
		embers = stepSparks(embers, sim);
	}

	// svelte-ignore state_referenced_locally
	let tick = $state(preTicks);
	// svelte-ignore state_referenced_locally
	let grid = $state<number[][]>(sim);
	// svelte-ignore state_referenced_locally
	let sparks = $state<Spark[]>(embers);

	$effect(() => {
		if (!moving) {
			return;
		}

		const timer = window.setInterval(() => {
			grid = stepFlame(grid, tick);
			sparks = stepSparks(sparks, grid);
			tick += 1;
		}, speedMs);

		return () => window.clearInterval(timer);
	});

	const view = $derived.by((): Seg[][] => {
		const out: Seg[][] = [];

		for (let y = 0; y < height; y++) {
			if (y === pitRow - 1 || y === pitRow) {
				// Flame rows: heat segments with the slanted pit walls overlaid.
				const segs: Seg[] = [];
				let buf = '';
				let cls: string | undefined;

				const flush = () => {
					if (buf.length > 0) {
						segs.push({ text: buf, cls });
					}

					buf = '';
				};

				for (let x = 0; x < width; x++) {
					let ch: string;
					let next: string | undefined;

					if (y === pitRow && (x === pitLeft - 1 || x === pitRight + 1)) {
						ch = x === pitLeft - 1 ? '╲' : '╱';
					} else if (x >= pitLeft && x <= pitRight) {
						const heat = y === pitRow ? 1 : grid[y]?.[x] ?? 0;
						const spark = sparks.find((s) => s.x === x && s.y === y);

						if (heat >= HOT) {
							ch = '█';
							next = spark ? 'faint' : 'hot';
						} else if (heat >= MID) {
							ch = '▓';
						} else if (heat >= LOW) {
							ch = '▒';
							next = 'mid';
						} else if (heat >= EMBER) {
							ch = '░';
							next = 'faint';
						} else {
							ch = ' ';
						}
					} else {
						ch = ' ';
					}

					if (next === cls) {
						buf += ch;
					} else {
						flush();
						cls = next;
						buf = ch;
					}
				}

				flush();
				out.push(segs);
			} else if (y === pitRow + 1) {
				// Pit floor line under the mouth.
				const pad = Math.max(0, pitLeft - 1);
				const line = '─'.repeat(Math.min(mouth + 2, width - pad));
				out.push([
					{ text: ' '.repeat(pad) },
					{ text: line, cls: 'pit' },
					{ text: ' '.repeat(Math.max(0, width - pad - line.length)) }
				]);
			} else {
				// Open flame rows, with sparks drifting above.
				const segs: Seg[] = [];
				let buf = '';
				let cls: string | undefined;

				const flush = () => {
					if (buf.length > 0) {
						segs.push({ text: buf, cls });
					}

					buf = '';
				};

				for (let x = 0; x < width; x++) {
					const spark = sparks.find((s) => s.x === x && s.y === y);
					const heat = grid[y]?.[x] ?? 0;
					let ch = ' ';
					let next: string | undefined;

					if (spark) {
						ch = '·';
						next = spark.age < 2 ? 'mid' : 'faint';
					} else if (heat >= HOT) {
						ch = '█';
						next = 'hot';
					} else if (heat >= MID) {
						ch = '▓';
					} else if (heat >= LOW) {
						ch = '▒';
						next = 'mid';
					} else if (heat >= EMBER) {
						ch = '░';
						next = 'faint';
					}

					if (next === cls) {
						buf += ch;
					} else {
						flush();
						cls = next;
						buf = ch;
					}
				}

				flush();
				out.push(segs);
			}
		}

		return out;
	});
</script>

<Graph {title} class={className}>
	<GraphBody>
		<div class="agni">
			<div class="viewport">
				<pre class="art" aria-hidden="true"><code>{#each view as line, i (i)}{#each line as seg, j (j)}{#if seg.cls}<span class={seg.cls}>{seg.text}</span>{:else}{seg.text}{/if}{/each}{#if i < view.length - 1}{'\n'}{/if}{/each}</code></pre>
			</div>
			{#if label}
				<p class="caption">{label}</p>
			{/if}
		</div>
	</GraphBody>
</Graph>

<style>
	.agni {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 0;
		font-size: 0.875rem;
	}

	.viewport {
		overflow-x: auto;
	}

	.art {
		margin: 0;
		font-size: 0.85rem;
		line-height: 1.15;
		color: var(--graph-foreground, oklch(0.93 0 0));
		white-space: pre;
	}

	.hot {
		color: var(--graph-accent, oklch(0.78 0.17 155));
		font-weight: 600;
	}

	.mid {
		color: var(--graph-muted, oklch(0.62 0 0));
	}

	.faint {
		color: var(--graph-faint, oklch(0.3 0 0));
	}

	.pit {
		color: var(--graph-muted, oklch(0.62 0 0));
	}

	.caption {
		margin: 0;
		font-size: 0.8rem;
		color: var(--graph-muted, oklch(0.62 0 0));
	}
</style>
