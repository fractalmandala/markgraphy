<script lang="ts">
	import Close from "$site/components/Close.svelte";
	import Observatory from "$site/components/Observatory.svelte";
	import Principles from "$site/components/Principles.svelte";
	import TheSet from "$site/components/TheSet.svelte";
	import GraphFlowPlayer from "$lib/animated/GraphFlowPlayer.svelte";
	import Graph from "$lib/frame/Graph.svelte";
	import FrameControls, {
		FRAME_DEFAULTS,
		type FrameSettings,
	} from "$site/components/FrameControls.svelte";
	import Heart from '$site/icons/heart.svelte'
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	// Live frame settings, driven by the panel under the player.
	let frame = $state<FrameSettings>({ ...FRAME_DEFAULTS });
</script>

<div class="site-wrapper">
	<Observatory codeHtml={data.codeHtml} />
	<Principles />
	<TheSet />
	<section class="border-top pad-top-xl gap-lg box">
		<div class="section-head ta-c box xcenter">
			<h2 class="weight-500 text-2xl">Frame Showcase</h2>
		</div>
		<Graph pad="lg" class="surface" ink="var(--text-primary)">
			<div class="box pad-xl gap-lg">
				<GraphFlowPlayer
					class="panel"
					title="IN THIS LIBRARY"
					autoPlay
					speedMs={1400}
					corner={frame.corner}
					frame={{
						dash: frame.dash,
						motion: frame.motion,
						speed: frame.speed,
						easing: frame.easing,
						pad: frame.pad,
						cornerBlink: frame.cornerBlink,
						pauseOnHover: frame.pauseOnHover,
					}}
					steps={[
						{
							label: "33 Graphs",
							detail: "tables, bars, stacks, plot, tree, timeline - composables for it all",
						},
						{
							label: "5 Diagram Templates",
							detail: "and an editor to build them your way.",
						},
						{
							label: "29 Animations",
							detail: "mostly just 29 ways of having fun with this library.",
						},
					]}
				/>
				<FrameControls bind:settings={frame} />
			</div>
		</Graph>
	</section>
	<div class="box pad-y-2xl xcenter ycenter gap-xs" style="height: 256px">
	<div class="row ycenter xcenter gap-sm">
		<a class="button primary" href="/docs">
			Install and Use <span class="mover">→</span>
		</a>
		<a class="button outline" href="/docs">
			Docs
		</a>
		<a class="button outline" href="/editor">
			Play
		</a>
	</div>
	<div class="text-lg row ycenter gap-2xs">Built with <Heart/> for Sveltekit.</div>
	</div>
</div>
