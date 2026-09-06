<script lang="ts">
	import Close from '$site/components/Close.svelte';
	import Observatory from '$site/components/Observatory.svelte';
	import Principles from '$site/components/Principles.svelte';
	import TheSet from '$site/components/TheSet.svelte';
	import { SITE_NAME } from '$site/lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>


<div class="site-wrapper">
	<Observatory codeHtml={data.codeHtml} />
<TheSet />
<Principles />
<Close />
</div>
