<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Caption drawn on the top edge as `[ TITLE ]`. Uppercase, 1–2 words. */
		title?: string;
		/** Character at each corner of the frame. Default "+". */
		corner?: string;
		class?: string;
		children?: Snippet;
	}

	let { title, corner = '+', class: className = '', children }: Props = $props();

	const uid = $props.id();
</script>

<figure class="graph {className}" aria-labelledby={title ? uid : undefined}>
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
	.graph {
		position: relative;
		min-width: 0;
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--graph-foreground, oklch(0.93 0 0));
		font-variant-numeric: tabular-nums;
		background-image: repeating-linear-gradient(
				to right,
				var(--graph-frame, oklch(0.6 0 0 / 0.5)) 0 2px,
				transparent 2px 7px
			),
			repeating-linear-gradient(
				to bottom,
				var(--graph-frame, oklch(0.6 0 0 / 0.5)) 0 2px,
				transparent 2px 7px
			),
			repeating-linear-gradient(
				to right,
				var(--graph-frame, oklch(0.6 0 0 / 0.5)) 0 2px,
				transparent 2px 7px
			),
			repeating-linear-gradient(
				to bottom,
				var(--graph-frame, oklch(0.6 0 0 / 0.5)) 0 2px,
				transparent 2px 7px
			);
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
		color: var(--graph-frame, oklch(0.6 0 0 / 0.5));
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
