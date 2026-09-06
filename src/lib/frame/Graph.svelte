<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Caption drawn on the top edge as `[ TITLE ]`. Uppercase, 1–2 words. */
		title?: string;
		/** Character at each corner of the frame. Default "+". */
		corner?: string;
		/** Frame motion. 'march' animates the dashes; off under reduced motion. Default 'none'. */
		motion?: 'none' | 'march';
		class?: string;
		children?: Snippet;
	}

	let { title, corner = '+', motion = 'none', class: className = '', children }: Props = $props();

	const uid = $props.id();
</script>

<figure class="graph {className}" data-motion={motion} aria-labelledby={title ? uid : undefined}>
	{#if title}
		<figcaption id={uid} class="title"><span class="ink">[ {title} ]</span></figcaption>
	{/if}
	<span aria-hidden="true" class="corner tl">{corner}</span>
	<span aria-hidden="true" class="corner tr">{corner}</span>
	<span aria-hidden="true" class="corner bl">{corner}</span>
	<span aria-hidden="true" class="corner br">{corner}</span>
	{@render children?.()}
</figure>

<style>
	/*
	 * The frame is four repeating gradients, one per edge. The dash pattern is
	 * a token (--graph-framer) so a host can swap the rhythm without touching
	 * the component; it falls back to 4px on / 4px off in --graph-frame.
	 */
	.graph {
		--fg-dash: var(
			--graph-framer,
			var(--graph-frame, oklch(0.6 0 0 / 0.5)) 0 4px,
			transparent 4px 8px
		);
		position: relative;
		min-width: 0;
		margin: 0;
		font-family: var(--graph-font, ui-monospace, monospace);
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--graph-foreground, oklch(0.93 0 0));
		font-variant-numeric: tabular-nums;
		background-image:
			repeating-linear-gradient(to right, var(--fg-dash)),
			repeating-linear-gradient(to bottom, var(--fg-dash)),
			repeating-linear-gradient(to right, var(--fg-dash)),
			repeating-linear-gradient(to bottom, var(--fg-dash));
		background-repeat: repeat-x, repeat-y, repeat-x, repeat-y;
		background-position:
			0 0,
			100% 0,
			0 100%,
			0 0;
		background-size:
			100% 1px,
			1px 100%,
			100% 1px,
			1px 100%;
	}

	@media (prefers-reduced-motion: no-preference) {
		.graph[data-motion='march'] {
			animation: fg-march 0.7s linear infinite;
		}
	}

	@keyframes fg-march {
		to {
			background-position:
				8px 0,
				100% 8px,
				-8px 100%,
				0 -8px;
		}
	}

	.corner {
		position: absolute;
		z-index: 10;
		display: flex;
		width: 1rem;
		height: 1rem;
		align-items: center;
		justify-content: center;
		background: var(--graph-background, oklch(0.16 0.01 160));
		font-size: 0.875rem;
		line-height: 1;
		color: var(--graph-accent, oklch(0.78 0.17 155));
		user-select: none;
		pointer-events: none;
	}

	.tl {
		top: 0;
		left: 0;
		transform: translate(-50%, -50%);
	}

	.tr {
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
	}

	.bl {
		bottom: 0;
		left: 0;
		transform: translate(-50%, 50%);
	}

	.br {
		right: 0;
		bottom: 0;
		transform: translate(50%, 50%);
	}

	.title {
		position: absolute;
		top: 0;
		left: 50%;
		z-index: 10;
		transform: translate(-50%, -50%);
		background: var(--graph-background, oklch(0.16 0.01 160));
		padding: 0 0.625rem;
		letter-spacing: 0.05em;
		white-space: nowrap;
		text-transform: uppercase;
	}

	.ink {
		color: var(--graph-accent, oklch(0.78 0.17 155));
	}
</style>
