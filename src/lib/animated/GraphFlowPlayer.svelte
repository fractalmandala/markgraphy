<script module lang="ts">
	/** One ordered step of a process. */
	export interface FlowStep {
		/** Short name shown beside the marker. */
		label: string;
		/** Extra line revealed while the step is active. */
		detail?: string;
	}

	export interface GraphFlowPlayerProps {
		/** Caption drawn on the frame's top edge as `[ TITLE ]`. */
		title: string;
		/** Steps in playback order. */
		steps: FlowStep[];
		/** Start playing on mount. Default false. Never autoplays under reduced motion. */
		autoPlay?: boolean;
		/** Milliseconds per step. Default 1600. */
		speedMs?: number;
		/** Show the playback controls. Default true. */
		showControls?: boolean;
		/** Animate transitions and the active marker pulse. Default true. */
		animated?: boolean;
		/** Character at each corner of the frame. Default '+'. */
		corner?: string;
		class?: string;
	}
</script>

<script lang="ts">
	import Graph from '../frame/Graph.svelte';
	import GraphBody from '../frame/GraphBody.svelte';

	let {
		title,
		steps,
		autoPlay = false,
		speedMs = 1600,
		showControls = true,
		animated = true,
		corner,
		class: className = ''
	}: GraphFlowPlayerProps = $props();

	const uid = $props.id();

	interface Seg {
		text: string;
		cls?: string;
	}

	let step = $state(0);
	let playing = $state(false);
	// svelte-ignore state_referenced_locally
	let intervalTime = $state(speedMs);

	const count = $derived(steps.length);
	const active = $derived(count === 0 ? 0 : Math.min(step, count - 1));
	const digits = $derived(Math.max(1, String(count).length));

	const motionAllowed = $derived(
		animated &&
			(typeof window === 'undefined' ||
				!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
	);

	// Autoplay only when motion is allowed; the controls can always start playback.
	$effect(() => {
		if (autoPlay && motionAllowed) {
			playing = true;
		}
	});

	$effect(() => {
		if (!playing || count === 0) {
			return;
		}

		const timer = window.setInterval(() => {
			step = (active + 1) % count;
		}, Math.max(100, intervalTime));

		return () => window.clearInterval(timer);
	});

	function handleTogglePlay() {
		if (count === 0) {
			return;
		}

		playing = !playing;
	}

	function handleNext() {
		if (count === 0) {
			return;
		}

		step = (active + 1) % count;
	}

	function handlePrev() {
		if (count === 0) {
			return;
		}

		step = (active - 1 + count) % count;
	}

	/** Column of the `│` spine, under the digit of a `[ 1 ]` marker. */
	const SPINE_COL = 2;

	const art = $derived.by((): Seg[][] => {
		if (count === 0) {
			return [[{ text: '( no steps )', cls: 'detail' }]];
		}

		const lines: Seg[][] = [];
		const labelCol = digits + 5;

		steps.forEach((s, i) => {
			if (i > 0) {
				lines.push([
					{
						text: ' '.repeat(SPINE_COL) + '│',
						cls: i <= active ? 'spine done' : 'spine'
					}
				]);
			}

			const isActive = i === active;
			const isDone = i < active;
			const num = String(i + 1).padStart(digits, ' ');

			lines.push([
				{
					text: `[ ${num} ]`,
					cls: isActive ? 'marker active' : isDone ? 'marker done' : 'marker'
				},
				{ text: ` ${s.label}`, cls: isActive ? 'label active' : isDone ? 'label done' : 'label' }
			]);

			if (isActive && s.detail) {
				lines.push([{ text: ' '.repeat(labelCol) }, { text: s.detail, cls: 'detail' }]);
			}
		});

		return lines;
	});
</script>

<Graph {title} {corner} class={className}>
	<GraphBody>
		<div class="player" class:anim={animated} class:playing>
			<div class="viewport">
				<pre class="art"><code>{#each art as line, i (i)}{#each line as seg, j (j)}{#if seg.cls}<span class={seg.cls}>{seg.text}</span>{:else}{seg.text}{/if}{/each}{#if i < art.length - 1}{'\n'}{/if}{/each}</code></pre>
			</div>

			{#if showControls}
				<div class="controls">
					<div class="buttons">
						<button class="ctrl" type="button" onclick={handlePrev} aria-label="Previous step">◀</button>
						<button class="ctrl primary" type="button" onclick={handleTogglePlay}>
							{playing ? '❚❚ pause' : '▶ play'}
						</button>
						<button class="ctrl" type="button" onclick={handleNext} aria-label="Next step">▶</button>
					</div>

					<div class="dots">
						{#each steps as _step, i (i)}
							<button
								class="dot"
								class:on={active === i}
								type="button"
								onclick={() => {
									step = i;
									playing = false;
								}}
								aria-label="Step {i + 1}"
							></button>
						{/each}
					</div>

					<label class="speed" for="{uid}-speed">
						Speed {(intervalTime / 1000).toFixed(1)}s
						<input id="{uid}-speed" type="range" min="400" max="2500" step="100" bind:value={intervalTime} />
					</label>
				</div>
			{/if}
		</div>
	</GraphBody>
</Graph>

<style>
	.player {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 0;
	}

	.viewport {
		overflow-x: auto;
	}

	.art {
		margin: 0;
		font-size: 0.85rem;
		line-height: 1.35;
		color: var(--graph-muted, oklch(0.62 0 0));
		white-space: pre;
	}

	.marker {
		color: var(--graph-muted, oklch(0.62 0 0));
	}

	.marker.active {
		color: var(--graph-foreground, oklch(0.93 0 0));
		font-weight: 600;
	}

	.marker.done {
		color: var(--graph-accent, oklch(0.78 0.17 155));
	}

	.label {
		color: var(--graph-muted, oklch(0.62 0 0));
	}

	.label.active {
		color: var(--graph-foreground, oklch(0.93 0 0));
		font-weight: 600;
	}

	.label.done {
		color: var(--graph-accent, oklch(0.78 0.17 155));
	}

	.detail {
		color: var(--graph-faint, oklch(0.3 0 0));
	}

	.spine {
		color: var(--graph-faint, oklch(0.3 0 0));
	}

	.spine.done {
		color: var(--graph-accent, oklch(0.78 0.17 155));
	}

	@media (prefers-reduced-motion: no-preference) {
		.anim .marker,
		.anim .label,
		.anim .detail,
		.anim .spine {
			transition: color 0.25s ease;
		}

		.anim.playing .marker.active {
			animation: pulse 1s infinite alternate;
		}

		@keyframes pulse {
			from {
				opacity: 0.7;
			}

			to {
				opacity: 1;
			}
		}
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
		padding-top: 0.875rem;
		border-top: 1px dashed var(--graph-frame, oklch(0.6 0 0 / 0.5));
	}

	.buttons {
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.ctrl {
		padding: 0.25rem 0.6rem;
		font-size: 0.75rem;
		color: var(--graph-muted, oklch(0.62 0 0));
		background: none;
		border: 1px dashed var(--graph-frame, oklch(0.6 0 0 / 0.5));
		border-radius: 0;
		cursor: pointer;
	}

	.ctrl:hover {
		color: var(--graph-foreground, oklch(0.93 0 0));
		border-color: var(--graph-muted, oklch(0.62 0 0));
	}

	.primary {
		color: var(--graph-accent, oklch(0.78 0.17 155));
		border-color: var(--graph-accent, oklch(0.78 0.17 155));
		font-weight: 600;
	}

	.dots {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.dot {
		width: 8px;
		height: 8px;
		padding: 0;
		background: var(--graph-faint, oklch(0.3 0 0));
		border: none;
		border-radius: 50%;
		cursor: pointer;
	}

	.dot.on {
		background: var(--graph-accent, oklch(0.78 0.17 155));
	}

	.speed {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: var(--graph-muted, oklch(0.62 0 0));
		white-space: nowrap;
	}

	.speed input {
		width: 80px;
		height: 4px;
		accent-color: var(--graph-accent, oklch(0.78 0.17 155));
		cursor: pointer;
	}
</style>
