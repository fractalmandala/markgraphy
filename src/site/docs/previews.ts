// Docs previews: live component + props and the copyable usage snippet for
// every catalog entry that has one. Data + component refs only — no markup.
// The [slug] page renders the live side; its +page.server.ts highlights the
// `code` strings with shiki and returns the HTML alongside.
// Frame (graph-frame) is assembled in the page; its snippet is FRAME_CODE.

import type { Component } from 'svelte';
import {
	GraphActivity,
	GraphBars,
	GraphBullet,
	GraphCalendar,
	GraphCells,
	GraphCompare,
	GraphCountdown,
	GraphDiff,
	GraphFlow,
	GraphFunnel,
	GraphGantt,
	GraphHeatmap,
	GraphInvoice,
	GraphKpi,
	GraphMeter,
	GraphPlot,
	GraphRank,
	GraphSlope,
	GraphSpark,
	GraphSpec,
	GraphStack,
	GraphStat,
	GraphTable,
	GraphTimeline,
	GraphTimer,
	GraphTree,
	GraphUptime,
	GraphWaffle,
	GraphWaterfall,
	AmplifierDiagram,
	AsciiDiagram,
	DiagramEditor,
	GraphFire,
	GraphFlowPlayer,
	GraphLife,
	GraphMandel,
	GraphPulse,
	GraphRain,
	GraphScope,
	GraphSpinners,
	GraphStream,
	GraphTicker,
	GraphTypewriter,
	MetricsTableDiagram,
	NestedRadiiDiagram,
	PromptLoopDiagram
} from '$lib';

export type PreviewEntry = {
	// Component with heterogeneous props — validated against the map below.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Comp: Component<any>;
	props: Record<string, unknown>;
	code: string;
};

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
				pulse === 0 ? 12 : pulse === 4 ? 7 : pulse % 3 === 0 ? 3 : index % 5 === 0 ? 1 : 0;
		} else if (index % 13 === 0) {
			count = 2;
		}
		return { date, count };
	});
}

const yearActivity = activityDays('2025-09-01', 371);
const quarterActivity = activityDays('2026-06-01', 91);

const uptimeDays = Array.from({ length: 90 }, (_, index) =>
	index === 41 || index === 42
		? 'down'
		: index === 18 || index === 60 || index === 61
			? 'degraded'
			: 'ok'
);

export const FRAME_CODE = `import { Graph, GraphBody, GraphRule } from 'fractalgraphy';

<Graph title="USAGE">
  <GraphBody>
    <p>Content goes inside the frame.</p>
    <GraphRule />
  </GraphBody>
</Graph>`;

export const previews: Record<string, PreviewEntry[]> = {
	'graph-table': [
		{
			Comp: GraphTable,
			props: {
				title: 'WHAT THE RESEARCH COST',
				headers: ['Agent', 'Tokens', 'Tool calls', 'Time'],
				align: ['left', 'right', 'right', 'right'],
				rows: [
					['Inks and paper', '115,207', '120', '16m'],
					['Overprint and drift', '135,218', '164', '16m'],
					['Naming the patterns', '186,716', '112', '18m']
				],
				footer: ['Total', '437,141', '396', '~50m']
			},
			code: `import { GraphTable } from 'fractalgraphy';

<GraphTable
  title="WHAT THE RESEARCH COST"
  headers={['Agent', 'Tokens', 'Tool calls', 'Time']}
  align={['left', 'right', 'right', 'right']}
  rows={[
    ['Inks and paper', '115,207', '120', '16m'],
    ['Overprint and drift', '135,218', '164', '16m'],
    ['Naming the patterns', '186,716', '112', '18m']
  ]}
  footer={['Total', '437,141', '396', '~50m']}
/>`
		},
		{
			Comp: GraphTable,
			props: {
				title: 'TASTE, EXPLAINED',
				headers: ['Decision', 'Reason'],
				align: ['left', 'left'],
				rows: [
					['ease-out on enter', 'feels snappier'],
					['180ms, not 400ms', 'feels faster, more responsive'],
					['springs for gestures', 'they carry your momentum'],
					['scale 0.97 on press', 'it makes the UI feel alive'],
					['no animation at all', 'you open it hundreds of times']
				]
			},
			code: `import { GraphTable } from 'fractalgraphy';

<GraphTable
  title="TASTE, EXPLAINED"
  headers={['Decision', 'Reason']}
  rows={[
    ['ease-out on enter', 'feels snappier'],
    ['180ms, not 400ms', 'feels faster, more responsive'],
    ['springs for gestures', 'they carry your momentum'],
    ['scale 0.97 on press', 'it makes the UI feel alive'],
    ['no animation at all', 'you open it hundreds of times']
  ]}
/>`
		}
	],
	'graph-flow': [
		{
			Comp: GraphFlow,
			props: {
				title: 'OPTIMISTIC UI',
				rows: [
					{ nodes: [{ label: 'tap' }, { label: 'server' }, { label: 'update' }] },
					{
						nodes: [
							{ label: 'tap' },
							{ label: 'update', tone: 'accent' },
							{ label: 'server syncs', stretch: true, tone: 'muted' }
						]
					}
				]
			},
			code: `import { GraphFlow, type FlowRow } from 'fractalgraphy';

const rows: FlowRow[] = [
  { nodes: [{ label: 'tap' }, { label: 'server' }, { label: 'update' }] },
  {
    nodes: [
      { label: 'tap' },
      { label: 'update', tone: 'accent' },
      { label: 'server syncs', stretch: true, tone: 'muted' }
    ]
  }
];

<GraphFlow title="OPTIMISTIC UI" {rows} />`
		}
	],
	'graph-bars': [
		{
			Comp: GraphBars,
			props: {
				title: 'DRAFT TO SHIPPED',
				from: { label: 'draft', values: [1, 2, 2, 3, 1] },
				processor: 'edit',
				to: { label: 'shipped', size: 'lg', values: [3, 5, 4, 6, 5] }
			},
			code: `import { GraphBars, type BarSeries } from 'fractalgraphy';

const from: BarSeries = { label: 'draft', values: [1, 2, 2, 3, 1] };
const to: BarSeries = { label: 'shipped', size: 'lg', values: [3, 5, 4, 6, 5] };

<GraphBars title="DRAFT TO SHIPPED" processor="edit" {from} {to} />`
		}
	],
	'graph-rank': [
		{
			Comp: GraphRank,
			props: {
				title: 'ROUTES',
				items: [
					{ label: '/docs', value: 12400 },
					{ label: '/install', value: 4100 },
					{ label: '/plot', value: 860 },
					{ label: '/rank', value: 420 }
				]
			},
			code: `import { GraphRank } from 'fractalgraphy';

<GraphRank
  title="ROUTES"
  items={[
    { label: '/docs', value: 12400 },
    { label: '/install', value: 4100 },
    { label: '/plot', value: 860 },
    { label: '/rank', value: 420 }
  ]}
/>`
		}
	],
	'graph-cells': [
		{
			Comp: GraphCells,
			props: {
				title: 'TWO WAYS TO LEARN',
				items: [
					{
						label: 'fragments',
						cells: [
							[1, 0, 1, 0, 0],
							[0, 1, 0, 1, 0],
							[1, 0, 0, 0, 1]
						]
					},
					{
						label: 'a system',
						cells: [
							[1, 1, 1, 1, 1],
							[1, 1, 1, 1, 1],
							[1, 1, 1, 1, 1]
						]
					}
				]
			},
			code: `import { GraphCells } from 'fractalgraphy';

<GraphCells
  title="TWO WAYS TO LEARN"
  items={[
    {
      label: 'fragments',
      cells: [
        [1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
      ]
    },
    {
      label: 'a system',
      cells: [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
      ]
    }
  ]}
/>`
		}
	],
	'graph-meter': [
		{
			Comp: GraphMeter,
			props: { title: 'SHIPPED', value: 0.67, caption: 'characters, not a progress bar' },
			code: `import { GraphMeter } from 'fractalgraphy';

<GraphMeter title="SHIPPED" value={0.67} caption="characters, not a progress bar" />`
		}
	],
	'graph-spark': [
		{
			Comp: GraphSpark,
			props: {
				title: 'LATENCY',
				data: [2, 3, 4, 3, 6, 5, 8, 7, 9, 6, 10, 8],
				caption: 'last point is the accent'
			},
			code: `import { GraphSpark } from 'fractalgraphy';

<GraphSpark
  title="LATENCY"
  data={[2, 3, 4, 3, 6, 5, 8, 7, 9, 6, 10, 8]}
  caption="last point is the accent"
/>`
		}
	],
	'graph-tree': [
		{
			Comp: GraphTree,
			props: {
				title: 'REGISTRY',
				nodes: [
					{
						label: 'src/lib',
						children: [
							{
								label: 'graphs',
								children: [
									{ label: 'GraphStat.svelte', meta: 'graph' },
									{ label: 'GraphTable.svelte', meta: 'graph' }
								]
							},
							{
								label: 'frame',
								children: [{ label: 'Graph.svelte', meta: 'frame', accent: true }]
							}
						]
					}
				]
			},
			code: `import { GraphTree } from 'fractalgraphy';

<GraphTree
  title="REGISTRY"
  nodes={[
    {
      label: 'src/lib',
      children: [
        {
          label: 'graphs',
          children: [
            { label: 'GraphStat.svelte', meta: 'graph' },
            { label: 'GraphTable.svelte', meta: 'graph' }
          ]
        },
        {
          label: 'frame',
          children: [{ label: 'Graph.svelte', meta: 'frame', accent: true }]
        }
      ]
    }
  ]}
/>`
		}
	],
	'graph-timeline': [
		{
			Comp: GraphTimeline,
			props: {
				title: 'SHIPPED',
				events: [
					{ date: 'Mar 12', label: 'npm publish' },
					{ date: 'Mar 18', label: 'docs, live previews', state: 'now' },
					{ date: 'Apr 02', label: '1.0', state: 'next' }
				]
			},
			code: `import { GraphTimeline } from 'fractalgraphy';

<GraphTimeline
  title="SHIPPED"
  events={[
    { date: 'Mar 12', label: 'npm publish' },
    { date: 'Mar 18', label: 'docs, live previews', state: 'now' },
    { date: 'Apr 02', label: '1.0', state: 'next' }
  ]}
/>`
		}
	],
	'graph-stack': [
		{
			Comp: GraphStack,
			props: {
				title: 'BUNDLE',
				palette: 'multi',
				rows: [
					{
						label: 'marketing',
						segments: [
							{ label: 'js', value: 48 },
							{ label: 'css', value: 22 },
							{ label: 'images', value: 30 }
						]
					},
					{
						label: 'docs',
						segments: [
							{ label: 'js', value: 28 },
							{ label: 'css', value: 18 },
							{ label: 'images', value: 54 }
						]
					}
				]
			},
			code: `import { GraphStack } from 'fractalgraphy';

<GraphStack
  title="BUNDLE"
  palette="multi"
  rows={[
    {
      label: 'marketing',
      segments: [
        { label: 'js', value: 48 },
        { label: 'css', value: 22 },
        { label: 'images', value: 30 }
      ]
    },
    {
      label: 'docs',
      segments: [
        { label: 'js', value: 28 },
        { label: 'css', value: 18 },
        { label: 'images', value: 54 }
      ]
    }
  ]}
/>`
		}
	],
	'graph-funnel': [
		{
			Comp: GraphFunnel,
			props: {
				title: 'INSTALL',
				stage: 'ship',
				steps: [
					{ label: 'docs', value: 12400, display: '12,400' },
					{ label: 'copy', value: 4100, display: '4,100' },
					{ label: 'ship', value: 860, display: '860' }
				]
			},
			code: `import { GraphFunnel } from 'fractalgraphy';

<GraphFunnel
  title="INSTALL"
  stage="ship"
  steps={[
    { label: 'docs', value: 12400, display: '12,400' },
    { label: 'copy', value: 4100, display: '4,100' },
    { label: 'ship', value: 860, display: '860' }
  ]}
/>`
		}
	],
	'graph-gantt': [
		{
			Comp: GraphGantt,
			props: {
				title: 'LAUNCH',
				stage: 'build',
				progress: 0.58,
				ticks: ['q1', 'q2', 'q3', 'q4'],
				items: [
					{ label: 'design', start: 0, end: 0.35, complete: 1 },
					{ label: 'build', start: 0.2, end: 0.75, complete: 0.55 },
					{ label: 'docs', start: 0.55, end: 0.9, complete: 0.2 },
					{ label: 'ship', start: 0.85, end: 1, complete: 0 }
				]
			},
			code: `import { GraphGantt } from 'fractalgraphy';

<GraphGantt
  title="LAUNCH"
  stage="build"
  progress={0.58}
  ticks={['q1', 'q2', 'q3', 'q4']}
  items={[
    { label: 'design', start: 0, end: 0.35, complete: 1 },
    { label: 'build', start: 0.2, end: 0.75, complete: 0.55 },
    { label: 'docs', start: 0.55, end: 0.9, complete: 0.2 },
    { label: 'ship', start: 0.85, end: 1, complete: 0 }
  ]}
/>`
		}
	],
	'graph-plot': [
		{
			Comp: GraphPlot,
			props: {
				title: 'P95',
				data: [2, 3, 3, 5, 4, 7, 6, 8, 5, 9, 7, 6],
				labels: ['jan', 'dec']
			},
			code: `import { GraphPlot } from 'fractalgraphy';

<GraphPlot
  title="P95"
  data={[2, 3, 3, 5, 4, 7, 6, 8, 5, 9, 7, 6]}
  labels={['jan', 'dec']}
/>`
		},
		{
			Comp: GraphPlot,
			props: {
				title: 'ERRORS',
				variant: 'line',
				height: 5,
				progress: 0.7,
				data: [1, 1, 4, 2, 8, 3, 2, 1, 5, 2],
				labels: ['mon', 'fri']
			},
			code: `import { GraphPlot } from 'fractalgraphy';

<GraphPlot
  title="ERRORS"
  variant="line"
  height={5}
  progress={0.7}
  data={[1, 1, 4, 2, 8, 3, 2, 1, 5, 2]}
  labels={['mon', 'fri']}
/>`
		}
	],
	'graph-waffle': [
		{
			Comp: GraphWaffle,
			props: { title: 'COVERAGE', value: 0.73, caption: '73 of 100 tests green' },
			code: `import { GraphWaffle } from 'fractalgraphy';

<GraphWaffle title="COVERAGE" value={0.73} caption="73 of 100 tests green" />`
		}
	],
	'graph-diff': [
		{
			Comp: GraphDiff,
			props: {
				title: 'BUNDLE',
				palette: 'duo',
				rows: [
					{ label: 'vendor', value: '84 kb' },
					{ label: 'app', value: '31 kb', sign: 'add' },
					{ label: 'sourcemaps', value: '12 kb', sign: 'remove' }
				],
				footer: { label: 'shipped', value: '103 kb' }
			},
			code: `import { GraphDiff } from 'fractalgraphy';

<GraphDiff
  title="BUNDLE"
  palette="duo"
  rows={[
    { label: 'vendor', value: '84 kb' },
    { label: 'app', value: '31 kb', sign: 'add' },
    { label: 'sourcemaps', value: '12 kb', sign: 'remove' }
  ]}
  footer={{ label: 'shipped', value: '103 kb' }}
/>`
		}
	],
	'graph-invoice': [
		{
			Comp: GraphInvoice,
			props: {
				title: 'INVOICE 0041',
				from: { name: 'fractalgraphy', lines: ['hello@fractalgraphy.dev'] },
				to: { name: 'Acme Studio', lines: ['14 Market Street', 'San Francisco, CA'] },
				meta: [
					{ label: 'No.', value: '0041' },
					{ label: 'Issued', value: 'Mar 12, 2026' },
					{ label: 'Due', value: 'Apr 11, 2026' }
				],
				items: [
					{ description: 'Design system', qty: '1', rate: '4,200', amount: '4,200' },
					{ description: 'Motion pass', qty: '1', rate: '1,800', amount: '1,800' },
					{ description: 'Docs rewrite', qty: '8h', rate: '180', amount: '1,440' }
				],
				totals: [
					{ label: 'Subtotal', value: '7,440' },
					{ label: 'Tax', value: '0' },
					{ label: 'Amount due', value: '7,440', accent: true }
				],
				note: 'Net 30. Wire to the account on file.'
			},
			code: `import { GraphInvoice, type InvoiceItem } from 'fractalgraphy';

const items: InvoiceItem[] = [
  { description: 'Design system', qty: '1', rate: '4,200', amount: '4,200' },
  { description: 'Motion pass', qty: '1', rate: '1,800', amount: '1,800' },
  { description: 'Docs rewrite', qty: '8h', rate: '180', amount: '1,440' }
];

<GraphInvoice
  title="INVOICE 0041"
  from={{ name: 'fractalgraphy', lines: ['hello@fractalgraphy.dev'] }}
  to={{ name: 'Acme Studio', lines: ['14 Market Street', 'San Francisco, CA'] }}
  meta={[
    { label: 'No.', value: '0041' },
    { label: 'Issued', value: 'Mar 12, 2026' },
    { label: 'Due', value: 'Apr 11, 2026' }
  ]}
  {items}
  totals={[
    { label: 'Subtotal', value: '7,440' },
    { label: 'Tax', value: '0' },
    { label: 'Amount due', value: '7,440', accent: true }
  ]}
  note="Net 30. Wire to the account on file."
/>`
		}
	],
	'graph-compare': [
		{
			Comp: GraphCompare,
			props: {
				title: 'PLANS',
				columns: ['Solo', 'Studio'],
				accent: 'Studio',
				rows: [
					{ label: 'Registry', values: [true, true] },
					{ label: 'Accent picker', values: [true, true] },
					{ label: 'Private source', values: [false, true] },
					{ label: 'Price', values: ['$0', '$24'] }
				]
			},
			code: `import { GraphCompare } from 'fractalgraphy';

<GraphCompare
  title="PLANS"
  columns={['Solo', 'Studio']}
  accent="Studio"
  rows={[
    { label: 'Registry', values: [true, true] },
    { label: 'Accent picker', values: [true, true] },
    { label: 'Private source', values: [false, true] },
    { label: 'Price', values: ['$0', '$24'] }
  ]}
/>`
		}
	],
	'graph-stat': [
		{
			Comp: GraphStat,
			props: {
				title: 'THIS WEEK',
				items: [
					{ value: '12,400', label: 'docs' },
					{ value: '4,100', label: 'copies' },
					{ value: '860', label: 'shipped', accent: true }
				]
			},
			code: `import { GraphStat } from 'fractalgraphy';

<GraphStat
  title="THIS WEEK"
  items={[
    { value: '12,400', label: 'docs' },
    { value: '4,100', label: 'copies' },
    { value: '860', label: 'shipped', accent: true }
  ]}
/>`
		}
	],
	'graph-kpi': [
		{
			Comp: GraphKpi,
			props: {
				title: 'READS',
				value: '12,400',
				label: 'this week',
				hint: '+18%',
				data: [4, 5, 5, 6, 8, 7, 9, 8, 11, 10, 12, 14]
			},
			code: `import { GraphKpi } from 'fractalgraphy';

<GraphKpi
  title="READS"
  value="12,400"
  label="this week"
  hint="+18%"
  data={[4, 5, 5, 6, 8, 7, 9, 8, 11, 10, 12, 14]}
/>`
		}
	],
	'graph-spec': [
		{
			Comp: GraphSpec,
			props: {
				title: 'TYPE',
				rows: [
					{ label: 'Family', value: 'Geist Mono' },
					{ label: 'Size', value: '14 / 21' },
					{ label: 'Tracking', value: '+0.02em' },
					{ label: 'Figures', value: 'tabular' },
					{ label: 'Accent', value: '--graph-accent', accent: true },
					{ label: 'Duo', value: '--graph-accent-2' },
					{ label: 'Tri', value: '--graph-accent-3' }
				]
			},
			code: `import { GraphSpec } from 'fractalgraphy';

<GraphSpec
  title="TYPE"
  rows={[
    { label: 'Family', value: 'Geist Mono' },
    { label: 'Size', value: '14 / 21' },
    { label: 'Tracking', value: '+0.02em' },
    { label: 'Figures', value: 'tabular' },
    { label: 'Accent', value: '--graph-accent', accent: true },
    { label: 'Duo', value: '--graph-accent-2' },
    { label: 'Tri', value: '--graph-accent-3' }
  ]}
/>`
		}
	],
	'graph-activity': [
		{
			Comp: GraphActivity,
			props: { title: 'COMMITS', palette: 'multi', days: yearActivity },
			code: `import { GraphActivity } from 'fractalgraphy';

// Pass dated counts; weeks, months, and intensity are derived.
<GraphActivity
  title="COMMITS"
  palette="multi"
  days={[
    { date: '2025-09-01', count: 3 },
    { date: '2025-09-02', count: 12 }
    // ...one per day, gaps fill as empty
  ]}
/>`
		},
		{
			Comp: GraphActivity,
			props: {
				title: 'SHIPPED',
				weekStartsOn: 1,
				glyphs: 'ascii',
				days: quarterActivity,
				caption: 'Jun – Aug'
			},
			code: `import { GraphActivity } from 'fractalgraphy';

<GraphActivity
  title="SHIPPED"
  weekStartsOn={1}
  glyphs="ascii"
  days={activityDays('2026-06-01', 91)}
  caption="Jun – Aug"
/>`
		}
	],
	'graph-heatmap': [
		{
			Comp: GraphHeatmap,
			props: {
				title: 'DEPLOYS',
				palette: 'duo',
				columns: ['0', '4', '8', '12', '16', '20'],
				rows: [
					{ label: 'Mon', values: [0, 1, 4, 8, 6, 1] },
					{ label: 'Tue', values: [0, 0, 5, 9, 4, 2] },
					{ label: 'Wed', values: [1, 0, 6, 12, 5, 1] },
					{ label: 'Thu', values: [0, 2, 4, 7, 8, 3] },
					{ label: 'Fri', values: [0, 1, 3, 5, 2, 0] }
				]
			},
			code: `import { GraphHeatmap } from 'fractalgraphy';

<GraphHeatmap
  title="DEPLOYS"
  palette="duo"
  columns={['0', '4', '8', '12', '16', '20']}
  rows={[
    { label: 'Mon', values: [0, 1, 4, 8, 6, 1] },
    { label: 'Tue', values: [0, 0, 5, 9, 4, 2] },
    { label: 'Wed', values: [1, 0, 6, 12, 5, 1] },
    { label: 'Thu', values: [0, 2, 4, 7, 8, 3] },
    { label: 'Fri', values: [0, 1, 3, 5, 2, 0] }
  ]}
/>`
		}
	],
	'graph-calendar': [
		{
			Comp: GraphCalendar,
			props: { year: 2026, month: 8, today: 27, marks: [12, 18, 27] },
			code: `import { GraphCalendar } from 'fractalgraphy';

<GraphCalendar year={2026} month={8} today={27} marks={[12, 18, 27]} />`
		}
	],
	'graph-waterfall': [
		{
			Comp: GraphWaterfall,
			props: {
				title: 'MARGIN',
				palette: 'duo',
				ticks: 18,
				items: [
					{ label: 'Revenue', value: 48 },
					{ label: 'Refunds', value: -6 },
					{ label: 'Hosting', value: -4 },
					{ label: 'Profit', value: 38 }
				]
			},
			code: `import { GraphWaterfall } from 'fractalgraphy';

<GraphWaterfall
  title="MARGIN"
  palette="duo"
  ticks={18}
  items={[
    { label: 'Revenue', value: 48 },
    { label: 'Refunds', value: -6 },
    { label: 'Hosting', value: -4 },
    { label: 'Profit', value: 38 }
  ]}
/>`
		}
	],
	'graph-uptime': [
		{
			Comp: GraphUptime,
			props: { title: 'API', from: 'Jun 1', to: 'Aug 29', days: uptimeDays },
			code: `import { GraphUptime } from 'fractalgraphy';

<GraphUptime
  title="API"
  from="Jun 1"
  to="Aug 29"
  days={Array.from({ length: 90 }, (_, i) =>
    i === 41 || i === 42 ? 'down' : i === 18 || i === 60 ? 'degraded' : 'ok'
  )}
/>`
		}
	],
	'graph-slope': [
		{
			Comp: GraphSlope,
			props: {
				title: 'TRAFFIC',
				palette: 'duo',
				fromLabel: '2025',
				toLabel: '2026',
				items: [
					{ label: 'docs', from: 8200, to: 12400 },
					{ label: 'copy', from: 5100, to: 4100 },
					{ label: 'ship', from: 640, to: 860 }
				]
			},
			code: `import { GraphSlope } from 'fractalgraphy';

<GraphSlope
  title="TRAFFIC"
  palette="duo"
  fromLabel="2025"
  toLabel="2026"
  items={[
    { label: 'docs', from: 8200, to: 12400 },
    { label: 'copy', from: 5100, to: 4100 },
    { label: 'ship', from: 640, to: 860 }
  ]}
/>`
		}
	],
	'graph-bullet': [
		{
			Comp: GraphBullet,
			props: {
				title: 'LOAD',
				palette: 'duo',
				items: [
					{ label: 'CPU', value: 72, target: 80, max: 100 },
					{ label: 'RAM', value: 34, target: 64, max: 100 },
					{ label: 'SSD', value: 91, target: 90, max: 100 }
				]
			},
			code: `import { GraphBullet } from 'fractalgraphy';

<GraphBullet
  title="LOAD"
  palette="duo"
  items={[
    { label: 'CPU', value: 72, target: 80, max: 100 },
    { label: 'RAM', value: 34, target: 64, max: 100 },
    { label: 'SSD', value: 91, target: 90, max: 100 }
  ]}
/>`
		}
	],
	'graph-timer': [
		{
			Comp: GraphTimer,
			props: { title: 'UPTIME', kind: 'elapsed', at: '2026-08-01T00:00:00Z', caption: 'api' },
			code: `import { GraphTimer } from 'fractalgraphy';

<GraphTimer title="UPTIME" kind="elapsed" at="2026-08-01T00:00:00Z" caption="api" />`
		}
	],
	'graph-countdown': [
		{
			Comp: GraphCountdown,
			props: {
				title: 'FREEZE',
				to: '2027-01-01T00:00:00Z',
				done: 'open',
				caption: 'until launch'
			},
			code: `import { GraphCountdown } from 'fractalgraphy';

<GraphCountdown
  title="FREEZE"
  to="2027-01-01T00:00:00Z"
  done="open"
  caption="until launch"
/>`
		}
	],
	'ascii-diagram': [
		{
			Comp: AsciiDiagram,
			props: {
				title: 'Signal path',
				content: `+ - - - - - - [ SIGNAL PATH ] - - - - - - +
|                                         |
|   source ──> filter ──> gain ──> out    |
|                    ^                    |
|                    └─── feedback        |
|                                         |
+ - - - - - - - - - - - - - - - - - - - - +`
			},
			code: `import { AsciiDiagram } from 'fractalgraphy';

<AsciiDiagram title="Signal path">
  {\`
+ - - - - - - [ SIGNAL PATH ] - - - - - - +
|                                         |
|   source ──> filter ──> gain ──> out    |
|                    ^                    |
|                    └─── feedback        |
|                                         |
+ - - - - - - - - - - - - - - - - - - - - +
  \`}
</AsciiDiagram>`
		}
	],
	'diagram-editor': [
		{
			Comp: DiagramEditor,
			props: {},
			code: `import { DiagramEditor } from 'fractalgraphy';

<DiagramEditor />`
		}
	],
	'amplifier-diagram': [
		{
			Comp: AmplifierDiagram,
			props: { gain: 3.5 },
			code: `import { AmplifierDiagram } from 'fractalgraphy';

<AmplifierDiagram gain={3.5} />`
		}
	],
	'nested-radii-diagram': [
		{
			Comp: NestedRadiiDiagram,
			props: { initialOuter: 16, initialInset: 4 },
			code: `import { NestedRadiiDiagram } from 'fractalgraphy';

<NestedRadiiDiagram initialOuter={16} initialInset={4} />`
		}
	],
	'prompt-loop-diagram': [
		{
			Comp: PromptLoopDiagram,
			props: { autoPlay: true, speedMs: 1200 },
			code: `import { PromptLoopDiagram } from 'fractalgraphy';

<PromptLoopDiagram autoPlay speedMs={1200} />`
		}
	],
	'metrics-table-diagram': [
		{
			Comp: MetricsTableDiagram,
			props: {
				title: 'COST',
				rows: [
					{ label: 'AST parse', calls: 120, time: '16m' },
					{ label: 'MDsveX compile', calls: 164, time: '16m' },
					{ label: 'Rune optimization', calls: 112, time: '18m' }
				],
				totalCalls: 396,
				totalTime: '~50m'
			},
			code: `import { MetricsTableDiagram } from 'fractalgraphy';

<MetricsTableDiagram
  title="COST"
  rows={[
    { label: 'AST parse', calls: 120, time: '16m' },
    { label: 'MDsveX compile', calls: 164, time: '16m' },
    { label: 'Rune optimization', calls: 112, time: '18m' }
  ]}
  totalCalls={396}
  totalTime="~50m"
/>`
		}
	],
	'graph-fire': [
		{
			Comp: GraphFire,
			props: { title: 'FURNACE', cols: 48, rows: 10, cooling: 0.55 },
			code: `import { GraphFire } from 'fractalgraphy';

<GraphFire title="FURNACE" cols={48} rows={10} />`
		}
	],
	'graph-flow-player': [
		{
			Comp: GraphFlowPlayer,
			props: {
				title: 'PIPELINE',
				autoPlay: true,
				speedMs: 1400,
				steps: [
					{ label: 'scaffold the parser', detail: 'reads the grammar file' },
					{ label: 'emit tokens', detail: 'one pass, no backtracking' },
					{ label: 'render frames', detail: 'dashed borders, four corners' },
					{ label: 'publish', detail: 'npm and done' }
				]
			},
			code: `import { GraphFlowPlayer } from 'fractalgraphy';

<GraphFlowPlayer
  title="PIPELINE"
  autoPlay
  speedMs={1400}
  steps={[
    { label: 'scaffold the parser', detail: 'reads the grammar file' },
    { label: 'emit tokens', detail: 'one pass, no backtracking' },
    { label: 'render frames' },
    { label: 'publish' }
  ]}
/>`
		}
	],
	'graph-life': [
		{
			Comp: GraphLife,
			props: { title: 'LIFE' },
			code: `import { GraphLife } from 'fractalgraphy';

<GraphLife title="LIFE" />`
		}
	],
	'graph-mandel': [
		{
			Comp: GraphMandel,
			props: { title: 'SEAHORSE' },
			code: `import { GraphMandel } from 'fractalgraphy';

<GraphMandel title="SEAHORSE" />`
		}
	],
	'graph-pulse': [
		{
			Comp: GraphPulse,
			props: { title: 'API', length: 60, intervalMs: 900 },
			code: `import { GraphPulse } from 'fractalgraphy';

<GraphPulse title="API" length={60} intervalMs={900} />`
		}
	],
	'graph-rain': [
		{
			Comp: GraphRain,
			props: { title: 'RAIN', cols: 48, rows: 12 },
			code: `import { GraphRain } from 'fractalgraphy';

<GraphRain title="RAIN" cols={48} rows={12} />`
		}
	],
	'graph-scope': [
		{
			Comp: GraphScope,
			props: {
				title: 'RPM',
				mode: 'area',
				data: [12, 18, 31, 27, 44, 39, 52, 48, 61, 55, 40, 33, 25, 29, 37, 46, 58, 50, 42, 35]
			},
			code: `import { GraphScope } from 'fractalgraphy';

<GraphScope
  title="RPM"
  mode="area"
  data={[12, 18, 31, 27, 44, 39, 52, 48, 61, 55, 40, 33, 25, 29, 37]}
/>`
		}
	],
	'graph-spinners': [
		{
			Comp: GraphSpinners,
			props: { title: 'FETCH', kind: 'bounce', label: 'loading tiles', speedMs: 90 },
			code: `import { GraphSpinners } from 'fractalgraphy';

<GraphSpinners title="FETCH" kind="bounce" label="loading tiles" speedMs={90} />`
		}
	],
	'graph-stream': [
		{
			Comp: GraphStream,
			props: { title: 'THROUGHPUT', unit: 'req/s', length: 44, intervalMs: 750 },
			code: `import { GraphStream } from 'fractalgraphy';

<GraphStream title="THROUGHPUT" unit="req/s" length={44} intervalMs={750} />`
		}
	],
	'graph-ticker': [
		{
			Comp: GraphTicker,
			props: {
				title: 'FLEET',
				items: [
					{ label: 'api', status: 'ok' },
					{ label: 'db-lag 2.1s', status: 'warn' },
					{ label: 'edge-eu', status: 'down' },
					{ label: 'cdn', status: 'ok' }
				]
			},
			code: `import { GraphTicker } from 'fractalgraphy';

<GraphTicker
  title="FLEET"
  items={[
    { label: 'api', status: 'ok' },
    { label: 'db-lag 2.1s', status: 'warn' },
    { label: 'edge-eu', status: 'down' }
  ]}
/>`
		}
	],
	'graph-typewriter': [
		{
			Comp: GraphTypewriter,
			props: {
				title: 'BOOT',
				speedMs: 45,
				lines: ['> boot fractalgraphy', '> mounting frames... ok', '> ready']
			},
			code: `import { GraphTypewriter } from 'fractalgraphy';

<GraphTypewriter
  title="BOOT"
  speedMs={45}
  lines={['> boot fractalgraphy', '> mounting frames... ok', '> ready']}
/>`
		}
	]
};
