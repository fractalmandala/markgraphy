<script lang="ts">
	import type { PropRow } from '$site/docs/catalog';

	let { rows }: { rows: PropRow[] } = $props();
</script>

<section class="props">
	<h2>Props</h2>
	<div class="scroll">
		<table>
			<thead>
				<tr>
					<th scope="col">Prop</th>
					<th scope="col">Type</th>
					<th scope="col">Default</th>
					<th scope="col">Description</th>
				</tr>
			</thead>
			<tbody>
				{#each rows as row (row.name)}
					<tr>
						<td class="name">{row.name}</td>
						<td class="type">{row.type}</td>
						<td class="default">{row.default ?? '—'}</td>
						<td class="desc">{row.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style>
	.props {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h2 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.025em;
	}

	.scroll {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	th {
		padding: 0.75rem;
		border-bottom: 1px dashed var(--site-rail);
		font-weight: 500;
		text-align: left;
		color: var(--site-fg);
		white-space: nowrap;
	}

	td {
		padding: 0.75rem;
		border-bottom: 1px dashed var(--site-rail);
		color: var(--site-muted);
		vertical-align: top;
	}

	tbody tr:last-child td {
		border-bottom: 0;
	}

	.name {
		color: var(--site-fg);
		white-space: nowrap;
	}

	.type,
	.default {
		white-space: nowrap;
	}

	.desc {
		min-width: 24rem;
		text-wrap: pretty;
	}
</style>
