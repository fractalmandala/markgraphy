// Docs catalog: metadata for every graph in the library plus the frame.
// Data only — no component imports. Live examples live in the [slug] page,
// which maps slugs to components and sample props.

export type NavLink = {
	href: string;
	label: string;
};

export type PropRow = {
	name: string;
	type: string;
	default?: string;
	description: string;
};

export type ComponentDoc = {
	slug: string;
	title: string;
	/** Exported component name, e.g. GraphStat. */
	name: string;
	description: string;
	props: PropRow[];
};

export const getStarted: NavLink[] = [
	{ href: '/docs', label: 'Introduction' },
	{ href: '/docs/installation', label: 'Installation' },
	{ href: '/docs/examples', label: 'Examples' },
	{ href: '/docs/editor', label: 'Editor' },
	{ href: '/docs/skill', label: 'Skill' }
];

const TITLE: PropRow = {
	name: 'title',
	type: 'string',
	description: 'Caption drawn on the top edge of the frame.'
};

const CORNER: PropRow = {
	name: 'corner',
	type: 'string',
	default: '"+"',
	description: 'Character at each corner of the frame.'
};

const CLASS: PropRow = {
	name: 'class',
	type: 'string',
	description: 'Passed to the outer frame.'
};

const GLYPHS: PropRow = {
	name: 'glyphs',
	type: '"shade" | "ascii" | "hash" | "bar" | string[]',
	default: '"shade"',
	description:
		'Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.'
};

const SPARK_GLYPHS: PropRow = {
	name: 'glyphs',
	type: '"shade" | "ascii" | "hash" | "bar" | string[]',
	default: '▁▂▃▄▅▆▇█',
	description:
		'Defaults to spark bars. Pass shade, ascii, hash, bar, or your own characters.'
};

const STACK_GLYPHS: PropRow = {
	name: 'glyphs',
	type: '"shade" | "ascii" | "hash" | "bar" | string[]',
	description: 'One character per segment, or a preset. Defaults to █▓▒░#=+-.'
};

const PALETTE: PropRow = {
	name: 'palette',
	type: '"mono" | "duo" | "multi"',
	default: '"mono"',
	description:
		'mono is one accent plus muted. duo paints the second series with --graph-accent-2. multi cycles three accents.'
};

const catalog: ComponentDoc[] = [
	{
		slug: 'graph-table',
		title: 'Table',
		name: 'GraphTable',
		description: 'Framed data table with an optional footer row for totals.',
		props: [
			TITLE,
			{ name: 'headers', type: 'string[]', description: 'Column headings. Sentence case.' },
			{
				name: 'rows',
				type: '(string | number | Snippet)[][]',
				description:
					'Body cells, one array per row. Strings and numbers, or a snippet for custom cells.'
			},
			{
				name: 'footer',
				type: '(string | number | Snippet)[]',
				description: 'Optional totals row under a rule.'
			},
			{
				name: 'align',
				type: "('left' | 'right')[]",
				default: 'left, then right',
				description: 'Per-column alignment. Defaults to left on the first column.'
			},
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-flow',
		title: 'Flow',
		name: 'GraphFlow',
		description:
			'Process diagram with nodes on a dashed arrow. Accent a node to highlight a path.',
		props: [
			TITLE,
			{
				name: 'rows',
				type: 'FlowRow[]',
				description:
					'Each row is a sequence of nodes. Nodes take label, tone: accent or muted, and stretch.'
			},
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-bars',
		title: 'Bars',
		name: 'GraphBars',
		description:
			'Two bar groups side by side, drawn with glyphs. The right group is usually the larger one.',
		props: [
			TITLE,
			{
				name: 'from',
				type: 'BarSeries',
				description: 'Left series. values is an array of relative heights.'
			},
			{
				name: 'to',
				type: 'BarSeries',
				description: 'Right series. Set size to lg for the larger group.'
			},
			{ name: 'processor', type: 'string', description: 'Optional label between the two groups.' },
			GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-rank',
		title: 'Rank',
		name: 'GraphRank',
		description: 'A list of labels with a bar of characters and a number on the right.',
		props: [
			TITLE,
			{
				name: 'items',
				type: 'RankItem[]',
				description:
					'Each row is a label, a value, and an optional display string for the right column.'
			},
			{ name: 'max', type: 'number', description: 'Scale for the bars. Defaults to the largest value.' },
			{ name: 'ticks', type: 'number', default: '20', description: 'How many character slots each bar uses.' },
			GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-cells',
		title: 'Cells',
		name: 'GraphCells',
		description:
			'Grid of filled and empty cells, drawn with glyphs. Useful for density or comparing two sets.',
		props: [
			TITLE,
			{ name: 'items', type: 'CellGrid[]', description: 'Each item is a labeled 0/1 matrix.' },
			GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-meter',
		title: 'Meter',
		name: 'GraphMeter',
		description: 'Progress bar drawn with = characters. Empty slots stay as dashes.',
		props: [
			TITLE,
			{ name: 'value', type: 'number', description: '0 to 1.' },
			{ name: 'ticks', type: 'number', default: '14', description: 'Number of character slots.' },
			{ name: 'caption', type: 'string', description: 'Muted line under the meter.' },
			GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-spark',
		title: 'Spark',
		name: 'GraphSpark',
		description: 'Sparkline from block characters. Values scale to the highest point.',
		props: [
			TITLE,
			{ name: 'data', type: 'number[]', description: 'Relative values. Scaled to the max.' },
			{ name: 'caption', type: 'string', description: 'Muted line under the sparkline.' },
			SPARK_GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-tree',
		title: 'Tree',
		name: 'GraphTree',
		description: 'Nested tree with branch glyphs. Accent a node to highlight it.',
		props: [
			TITLE,
			{
				name: 'nodes',
				type: 'TreeNode[]',
				description: 'Nested nodes. Each may have label, meta, accent, and children.'
			},
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-timeline',
		title: 'Timeline',
		name: 'GraphTimeline',
		description: 'Vertical list of dates. Mark one row as current with the accent color.',
		props: [
			TITLE,
			{
				name: 'events',
				type: 'TimelineEvent[]',
				description: 'date, label, and optional state: done, now, or next.'
			},
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-stack',
		title: 'Stack',
		name: 'GraphStack',
		description:
			'Stacked bar for parts of a whole. Different glyphs per segment instead of colors.',
		props: [
			TITLE,
			{
				name: 'rows',
				type: 'StackRow[]',
				description: 'Each row has a label and labeled numeric segments.'
			},
			{
				name: 'accent',
				type: 'string',
				description: 'Segment label to paint with the accent. Defaults to the first.'
			},
			{ name: 'ticks', type: 'number', default: '24', description: 'Bar width in characters.' },
			STACK_GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-funnel',
		title: 'Funnel',
		name: 'GraphFunnel',
		description: 'Steps get narrower as values drop. Percentages compare to the first step.',
		props: [
			TITLE,
			{
				name: 'steps',
				type: 'FunnelStep[]',
				description: 'label, value, and optional display string for the count.'
			},
			{
				name: 'ticks',
				type: 'number',
				default: '20',
				description: 'Width of the first bar, in characters.'
			},
			{ name: 'stage', type: 'string', description: 'Step label to focus. Other rows recede.' },
			GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-gantt',
		title: 'Gantt',
		name: 'GraphGantt',
		description: 'Schedule chart. start and end are fractions from 0 to 1 along the track.',
		props: [
			TITLE,
			{
				name: 'items',
				type: 'GanttItem[]',
				description:
					'label, start, end, optional complete (0–1 fill inside the bar), and optional accent.'
			},
			{
				name: 'ticks',
				type: 'string[]',
				description: 'Labels under the track, spaced at the ends.'
			},
			{ name: 'columns', type: 'number', default: '24', description: 'Track width in characters.' },
			{ name: 'stage', type: 'string', description: 'Row label to focus. Other rows recede.' },
			{ name: 'progress', type: 'number', description: '0–1 playhead. Draws ▾ on the track.' },
			GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-plot',
		title: 'Plot',
		name: 'GraphPlot',
		description: 'Line or area chart built from columns of block characters.',
		props: [
			TITLE,
			{ name: 'data', type: 'number[]', description: 'One value per column, left to right.' },
			{ name: 'labels', type: 'string[]', description: 'First and last labels under the axis.' },
			{ name: 'height', type: 'number', default: '7', description: 'Rows in the plot.' },
			{
				name: 'variant',
				type: '"line" | "area"',
				default: '"area"',
				description: 'Area fills down from the cap with ░.'
			},
			{
				name: 'progress',
				type: 'number',
				default: '1',
				description: '0–1. How many columns are revealed.'
			},
			GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-waffle',
		title: 'Waffle',
		name: 'GraphWaffle',
		description: 'Grid of 100 cells. The value sets how many are filled in.',
		props: [
			TITLE,
			{ name: 'value', type: 'number', description: 'Share from 0 to 1.' },
			{ name: 'cells', type: 'number', default: '100', description: 'Total cells in the grid.' },
			{ name: 'columns', type: 'number', default: '10', description: 'Cells per row.' },
			{ name: 'caption', type: 'string', description: 'Muted line under the percent.' },
			GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-diff',
		title: 'Diff',
		name: 'GraphDiff',
		description:
			'List with add, remove, and unchanged rows. Works for changelogs or bundle sizes.',
		props: [
			TITLE,
			{
				name: 'rows',
				type: 'DiffRow[]',
				description: 'label, value, and optional sign: add, remove, or keep.'
			},
			{ name: 'footer', type: 'DiffRow', description: 'Total row under a rule.' },
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-invoice',
		title: 'Invoice',
		name: 'GraphInvoice',
		description:
			'Document table for invoices and quotes. From, bill-to, line items, and a totals block.',
		props: [
			TITLE,
			{
				name: 'from',
				type: 'InvoiceParty',
				description: 'Issuer name and optional address lines.'
			},
			{ name: 'to', type: 'InvoiceParty', description: 'Recipient name and optional address lines.' },
			{ name: 'meta', type: 'InvoiceMeta[]', description: 'Fields like number, issued, due.' },
			{
				name: 'items',
				type: 'InvoiceItem[]',
				description: 'Line items. qty and rate are optional; columns hide when unused.'
			},
			{
				name: 'totals',
				type: 'InvoiceTotal[]',
				description: 'Rows under the items. Set accent on the amount due.'
			},
			{ name: 'note', type: 'string', description: 'Muted line under the totals. Payment terms, etc.' },
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-compare',
		title: 'Compare',
		name: 'GraphCompare',
		description: 'Feature matrix. Cells are text or true/false, drawn as ✓ and –.',
		props: [
			TITLE,
			{ name: 'columns', type: 'string[]', description: 'Option names across the top.' },
			{
				name: 'rows',
				type: 'CompareRow[]',
				description: 'label plus one value per column. Booleans become ✓ or –.'
			},
			{
				name: 'accent',
				type: 'string',
				description: 'Column name to highlight. Other columns recede.'
			},
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-stat',
		title: 'Stat',
		name: 'GraphStat',
		description: 'A row of large numbers with labels.',
		props: [
			TITLE,
			{
				name: 'items',
				type: 'StatItem[]',
				description: 'value, label, optional hint, optional accent.'
			},
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-kpi',
		title: 'KPI',
		name: 'GraphKpi',
		description: 'One large number with a sparkline under it.',
		props: [
			TITLE,
			{ name: 'value', type: 'string', description: 'The large number, already formatted.' },
			{ name: 'label', type: 'string', description: 'Line under the number.' },
			{
				name: 'hint',
				type: 'string',
				description: 'Optional extra next to the label, like a delta.'
			},
			{ name: 'data', type: 'number[]', description: 'Sparkline values. Scaled to the highest point.' },
			SPARK_GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-spec',
		title: 'Spec',
		name: 'GraphSpec',
		description: 'Aligned label and value rows. Spec sheets, shipping labels, type samples.',
		props: [
			TITLE,
			{ name: 'rows', type: 'SpecRow[]', description: 'label, value, and optional accent.' },
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-activity',
		title: 'Activity',
		name: 'GraphActivity',
		description:
			'GitHub-style contribution grid. Pass dated counts; weeks, months, and intensity are derived.',
		props: [
			TITLE,
			{ name: 'days', type: 'ActivityDay[]', description: 'ISO date plus count. Gaps fill as empty days.' },
			{
				name: 'weekStartsOn',
				type: '0 | 1',
				default: '0',
				description: '0 is Sunday, like GitHub. 1 is Monday.'
			},
			{ name: 'max', type: 'number', description: 'Lock the intensity scale. Defaults to the highest count.' },
			{ name: 'legend', type: 'boolean', default: 'true', description: 'Less / more glyph key under the grid.' },
			{
				name: 'caption',
				type: 'string | false',
				description: 'Replaces the computed contribution total. Pass false to hide it.'
			},
			GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-heatmap',
		title: 'Heatmap',
		name: 'GraphHeatmap',
		description:
			'Labeled rows and columns with the same intensity glyphs as activity. Punchcards, hours, anything 2d.',
		props: [
			TITLE,
			{ name: 'columns', type: 'string[]', description: 'Column headers, left to right.' },
			{ name: 'rows', type: 'HeatRow[]', description: 'label plus a value per column.' },
			{ name: 'max', type: 'number', description: 'Lock the intensity scale across charts.' },
			{ name: 'legend', type: 'boolean', default: 'true', description: 'Less / more glyph key.' },
			{ name: 'caption', type: 'string', description: 'Optional note under the matrix.' },
			GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-calendar',
		title: 'Calendar',
		name: 'GraphCalendar',
		description:
			'One month as a seven-column grid. Marked days use the accent. today is wrapped in brackets.',
		props: [
			{ ...TITLE, description: 'Caption. Defaults to the month name.' },
			{ name: 'year', type: 'number', description: 'Full year.' },
			{ name: 'month', type: 'number', description: '1–12.' },
			{
				name: 'weekStartsOn',
				type: '0 | 1',
				default: '1',
				description: '0 is Sunday. 1 is Monday.'
			},
			{
				name: 'marks',
				type: 'number[] | CalendarMark[]',
				description: 'Days to accent. Pass numbers, or { day, accent }.'
			},
			{
				name: 'today',
				type: 'number',
				description: 'Day of the month to wrap in brackets. Pass it in.'
			},
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-waterfall',
		title: 'Waterfall',
		name: 'GraphWaterfall',
		description:
			'Running total as floating bars. First row is the start, last is the end, signed values in between.',
		props: [
			TITLE,
			{
				name: 'items',
				type: 'WaterfallItem[]',
				description:
					'label, value, optional display, and optional kind: start, in, out, or end. Kind is inferred if omitted.'
			},
			{ name: 'ticks', type: 'number', default: '24', description: 'Bar width in characters.' },
			GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-uptime',
		title: 'Uptime',
		name: 'GraphUptime',
		description: 'One glyph per day. ok, degraded, down, or empty. Wraps every 30 days.',
		props: [
			TITLE,
			{
				name: 'days',
				type: 'UptimeStatus[]',
				description: "'ok' | 'degraded' | 'down' | 'empty' — one per day."
			},
			{ name: 'from', type: 'string', description: 'Label at the start of the range.' },
			{ name: 'to', type: 'string', description: 'Label at the end of the range.' },
			{
				name: 'columns',
				type: 'number',
				default: '30',
				description: 'Days per row. Short series are not padded to this width.'
			},
			GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-slope',
		title: 'Slope',
		name: 'GraphSlope',
		description: 'Two figures per row with an arrow between. Up uses the accent, down recedes.',
		props: [
			TITLE,
			{ name: 'fromLabel', type: 'string', description: 'Header over the first column.' },
			{ name: 'toLabel', type: 'string', description: 'Header over the second column.' },
			{ name: 'items', type: 'SlopeItem[]', description: 'label, from, and to.' },
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-bullet',
		title: 'Bullet',
		name: 'GraphBullet',
		description: 'Actual versus target on a shared track. The marker is the target.',
		props: [
			TITLE,
			{
				name: 'items',
				type: 'BulletItem[]',
				description: 'label, value, optional target, max, and display.'
			},
			{
				name: 'ticks',
				type: 'number',
				default: '20',
				description: 'Track width in characters, not counting the brackets.'
			},
			GLYPHS,
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-timer',
		title: 'Timer',
		name: 'GraphTimer',
		description:
			'Elapsed time, how long ago, or the time of day. The numbers update every second.',
		props: [
			TITLE,
			{
				name: 'kind',
				type: '"elapsed" | "ago" | "clock"',
				default: '"elapsed"',
				description: 'elapsed counts up from at. ago is relative. clock is the time of day.'
			},
			{
				name: 'at',
				type: 'Date | number | string',
				description: 'Start time for elapsed and ago. A date, timestamp, or ISO string.'
			},
			{ name: 'caption', type: 'string', description: 'Line under the number.' },
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-countdown',
		title: 'Countdown',
		name: 'GraphCountdown',
		description: 'Time left until a date. After that it shows a short label you pass in.',
		props: [
			TITLE,
			{
				name: 'to',
				type: 'Date | number | string',
				description: 'The deadline. A date, timestamp, or ISO string.'
			},
			{ name: 'done', type: 'string', default: '"done"', description: 'What to show after the deadline.' },
			{ name: 'caption', type: 'string', description: 'Line under the number.' },
			PALETTE,
			CORNER,
			CLASS
		]
	},
	{
		slug: 'graph-frame',
		title: 'Frame',
		name: 'Graph',
		description:
			'Dashed frame wrapper used by every graph. Compose with GraphBody, GraphRule, GraphTrack, and GraphTick. corner picks the character at each corner.',
		props: [
			{ ...TITLE, description: 'Optional caption. Renders as [ TITLE ] on the top edge.' },
			{ ...CORNER, description: 'Character at each corner. Default +.' },
			{ ...CLASS, description: 'Passed to the figure.' },
			{ name: 'children', type: 'Snippet', description: 'Usually GraphBody.' }
		]
	},
	{
		slug: 'ascii-diagram',
		title: 'Ascii Diagram',
		name: 'AsciiDiagram',
		description:
			'Renders raw ASCII or Unicode diagrams with live tokens: titles, arrows, corners, and glyph blocks pick up the accent automatically.',
		props: [
			{
				name: 'content',
				type: 'string',
				description: 'The raw diagram text. It is HTML-escaped before tokenizing.'
			},
			{
				name: 'title',
				type: 'string',
				description: 'Optional label above the diagram.'
			},
			{
				name: 'showCopy',
				type: 'boolean',
				default: 'true',
				description: 'Show a copy-to-clipboard button for the raw text.'
			},
			{
				name: 'bordered',
				type: 'boolean',
				default: 'true',
				description: 'Dashed border around the diagram.'
			},
			{
				name: 'glow',
				type: 'boolean',
				default: 'false',
				description: 'Phosphor glow on accent tokens.'
			},
			{
				name: 'fontSize',
				type: 'string',
				default: '"0.85rem"',
				description: 'Font size of the diagram text.'
			},
			{
				name: 'lineHeight',
				type: 'string',
				default: '"1.35"',
				description: 'Line height of the diagram text.'
			},
			{
				name: 'align',
				type: '"left" | "center"',
				default: '"left"',
				description: 'Text alignment inside the viewport.'
			},
			{
				name: 'children',
				type: 'Snippet',
				description: 'Custom content instead of text.'
			},
			CLASS
		]
	},
	{
		slug: 'diagram-editor',
		title: 'Diagram Editor',
		name: 'DiagramEditor',
		description:
			'An embeddable playground: presets, a glyph palette, auto-align, and copy-as-Svelte or .svx. Takes no props.',
		props: []
	},
	{
		slug: 'amplifier-diagram',
		title: 'Amplifier',
		name: 'AmplifierDiagram',
		description:
			'A small taste wave runs through an AI stage and comes out amplified. The gain slider scales the output wave live.',
		props: [
			{
				name: 'gain',
				type: 'number',
				default: '3.5',
				description: 'Starting gain multiplier, 1 to 5.'
			},
			{
				name: 'interactive',
				type: 'boolean',
				default: 'true',
				description: 'Show the gain slider and dB readout.'
			},
			{
				name: 'animated',
				type: 'boolean',
				default: 'true',
				description: 'Animate the waves. Reduced motion freezes them.'
			},
			CLASS
		]
	},
	{
		slug: 'nested-radii-diagram',
		title: 'Nested Radii',
		name: 'NestedRadiiDiagram',
		description:
			'Interactive explainer for nested border radius: two sliders update the ASCII art, the formula, and a real CSS preview together.',
		props: [
			{
				name: 'initialOuter',
				type: 'number',
				default: '16',
				description: 'Starting outer radius in px.'
			},
			{
				name: 'initialInset',
				type: 'number',
				default: '4',
				description: 'Starting inset in px.'
			},
			{
				name: 'interactive',
				type: 'boolean',
				default: 'true',
				description: 'Show the sliders and the live CSS preview.'
			},
			CLASS
		]
	},
	{
		slug: 'prompt-loop-diagram',
		title: 'Prompt Loop',
		name: 'PromptLoopDiagram',
		description:
			'The prompt-and-iterate loop as a six-step player. Steps light up in turn, with play, pause, seek dots, and a speed slider.',
		props: [
			{
				name: 'autoPlay',
				type: 'boolean',
				default: 'true',
				description: 'Start playing on mount.'
			},
			{
				name: 'speedMs',
				type: 'number',
				default: '1200',
				description: 'Milliseconds per step.'
			},
			{
				name: 'showControls',
				type: 'boolean',
				default: 'true',
				description: 'Show the playback controls.'
			},
			CLASS
		]
	},
	{
		slug: 'metrics-table-diagram',
		title: 'Metrics Table',
		name: 'MetricsTableDiagram',
		description:
			'A cost ledger as ASCII: label, tool calls, and time per row, with a total row. Static by design.',
		props: [
			{
				name: 'title',
				type: 'string',
				default: '"COST"',
				description: 'Caption on the top edge, uppercased.'
			},
			{
				name: 'rows',
				type: 'MetricRow[]',
				description: 'label, calls, and time per row.'
			},
			{
				name: 'totalCalls',
				type: 'number | string',
				description: 'Total for the calls column.'
			},
			{
				name: 'totalTime',
				type: 'string',
				description: 'Total for the time column.'
			},
			{
				name: 'showTotal',
				type: 'boolean',
				default: 'true',
				description: 'Show the total row.'
			},
			CLASS
		]
	},
	{
		slug: 'graph-fire',
		title: 'Fire',
		name: 'GraphFire',
		description:
			'Demoscene fire in shade glyphs: heat rises from a hot base and cools as it climbs. Decorative, and frozen under reduced motion.',
		props: [
			{
				name: 'cols',
				type: 'number',
				default: '60',
				description: 'Fire width in characters.'
			},
			{
				name: 'rows',
				type: 'number',
				default: '14',
				description: 'Fire height in rows.'
			},
			{
				name: 'cooling',
				type: 'number',
				default: '0.6',
				description: 'Random decay strength; higher burns out sooner.'
			},
			CLASS
		]
	},
	{
		slug: 'graph-flow-player',
		title: 'Flow Player',
		name: 'GraphFlowPlayer',
		description:
			'A play/pause step-player for ordered process steps. The active step lights up and its detail unfolds beneath it.',
		props: [
			{
				name: 'steps',
				type: 'FlowStep[]',
				description: 'Ordered steps; detail is revealed under the active one.'
			},
			{
				name: 'autoPlay',
				type: 'boolean',
				default: 'false',
				description: 'Start playing on mount; never under reduced motion.'
			},
			{
				name: 'speedMs',
				type: 'number',
				default: '1600',
				description: 'Milliseconds per step; loops after the last.'
			},
			{
				name: 'showControls',
				type: 'boolean',
				default: 'true',
				description: 'Prev, play/pause, next, seek dots, speed slider.'
			},
			CLASS
		]
	},
	{
		slug: 'graph-life',
		title: 'Life',
		name: 'GraphLife',
		description:
			"Conway's Game of Life in block glyphs with faint death trails, toroidal edges, and a gen/pop readout. Play, step, or reset.",
		props: [
			{
				name: 'cols',
				type: 'number',
				default: '44',
				description: 'Board width in cells.'
			},
			{
				name: 'rows',
				type: 'number',
				default: '14',
				description: 'Board height in cells.'
			},
			{
				name: 'speedMs',
				type: 'number',
				default: '220',
				description: 'Milliseconds per generation.'
			},
			{
				name: 'seedNum',
				type: 'number',
				default: '7',
				description: 'PRNG seed; same value, same board, every reset.'
			},
			CLASS
		]
	},
	{
		slug: 'graph-mandel',
		title: 'Mandelbrot',
		name: 'GraphMandel',
		description:
			'A slowly zooming ASCII Mandelbrot drifting into seahorse valley, its dense core tinted accent. The brand piece.',
		props: [
			{
				name: 'cols',
				type: 'number',
				default: '66',
				description: 'Grid width in cells.'
			},
			{
				name: 'rows',
				type: 'number',
				default: '20',
				description: 'Grid height in cells.'
			},
			{
				name: 'zoomPerTick',
				type: 'number',
				default: '1.06',
				description: 'Window shrink factor per tick.'
			},
			{
				name: 'maxIter',
				type: 'number',
				default: '90',
				description: 'Starting iteration budget; grows while zooming.'
			},
			CLASS
		]
	},
	{
		slug: 'graph-pulse',
		title: 'Pulse',
		name: 'GraphPulse',
		description:
			'A live uptime strip that appends one blip per tick, with a legend, percent-up, and a last-check caption.',
		props: [
			{
				name: 'length',
				type: 'number',
				default: '60',
				description: 'Window size in blips.'
			},
			{
				name: 'intervalMs',
				type: 'number',
				default: '1000',
				description: 'Milliseconds between appends.'
			},
			{
				name: 'okRate',
				type: 'number',
				default: '0.94',
				description: 'Probability an appended blip is ok.'
			},
			{
				name: 'feed',
				type: 'function',
				description: 'Custom status generator: ok, degraded, or down.'
			},
			CLASS
		]
	},
	{
		slug: 'graph-rain',
		title: 'Rain',
		name: 'GraphRain',
		description:
			'Matrix-style glyph rain: columns fall at their own speeds behind a bright head, trails fading to faint. Decorative.',
		props: [
			{
				name: 'cols',
				type: 'number',
				default: '56',
				description: 'Width in character columns.'
			},
			{
				name: 'rows',
				type: 'number',
				default: '16',
				description: 'Height in rows.'
			},
			{
				name: 'speedMs',
				type: 'number',
				default: '110',
				description: 'Milliseconds per tick.'
			},
			{
				name: 'trail',
				type: 'number',
				default: '8',
				description: 'Trail length behind each head.'
			},
			CLASS
		]
	},
	{
		slug: 'graph-scope',
		title: 'Scope',
		name: 'GraphScope',
		description:
			'A scrolling oscilloscope window over any number series, drawn in block glyphs; the newest column glows accent.',
		props: [
			{
				name: 'data',
				type: 'number[]',
				description: 'Series to scroll through; the window loops over it.'
			},
			{
				name: 'window',
				type: 'number',
				default: '44',
				description: 'Visible columns.'
			},
			{
				name: 'rows',
				type: 'number',
				default: '6',
				description: 'Grid height in rows.'
			},
			{
				name: 'mode',
				type: '"line" | "area"',
				default: '"line"',
				description: 'Line trace or filled area under it.'
			},
			CLASS
		]
	},
	{
		slug: 'graph-spinners',
		title: 'Spinners',
		name: 'GraphSpinners',
		description:
			'A family of glyph spinners — slash, dots, bounce, bar — with a muted label. Holds frame one under reduced motion.',
		props: [
			{
				name: 'kind',
				type: 'SpinnerKind',
				default: '"dots"',
				description: 'Which built-in frame set to show.'
			},
			{
				name: 'label',
				type: 'string',
				default: '"loading"',
				description: 'Muted text after the spinner glyphs.'
			},
			{
				name: 'speedMs',
				type: 'number',
				default: '120',
				description: 'Milliseconds per frame.'
			},
			{
				name: 'frames',
				type: 'string[]',
				description: 'Custom frame set; overrides kind.'
			},
			CLASS
		]
	},
	{
		slug: 'graph-stream',
		title: 'Stream',
		name: 'GraphStream',
		description:
			'A live terminal KPI: big current value, a one-row glyph sparkline that appends, and an updated-Ns-ago caption.',
		props: [
			{
				name: 'length',
				type: 'number',
				default: '40',
				description: 'Points kept in the rolling history.'
			},
			{
				name: 'intervalMs',
				type: 'number',
				default: '900',
				description: 'Milliseconds between appends.'
			},
			{
				name: 'generate',
				type: 'function',
				description: 'Next-value generator; defaults to a random walk.'
			},
			{
				name: 'unit',
				type: 'string',
				default: '""',
				description: 'Suffix after the value, rendered muted.'
			},
			CLASS
		]
	},
	{
		slug: 'graph-ticker',
		title: 'Ticker',
		name: 'GraphTicker',
		description:
			'A one-row status marquee that rotates whole [ OK ] / [ WARN ] / [ DOWN ] tokens, colors staying attached.',
		props: [
			{
				name: 'items',
				type: 'TickerItem[]',
				description: 'Tokens rotated through the row.'
			},
			{
				name: 'speedMs',
				type: 'number',
				default: '140',
				description: 'Milliseconds per rotation step.'
			},
			CLASS
		]
	},
	{
		slug: 'graph-typewriter',
		title: 'Typewriter',
		name: 'GraphTypewriter',
		description:
			'Text that types itself with a blinking block cursor, holds, and loops. Reduced motion shows the full text.',
		props: [
			{
				name: 'lines',
				type: 'string[]',
				description: 'Lines typed one character at a time, in order.'
			},
			{
				name: 'speedMs',
				type: 'number',
				default: '55',
				description: 'Milliseconds per character.'
			},
			{
				name: 'holdMs',
				type: 'number',
				default: '1400',
				description: 'Pause after full text before restarting.'
			},
			{
				name: 'loop',
				type: 'boolean',
				default: 'true',
				description: 'Retype after the hold; false leaves the text and a solid cursor.'
			},
			CLASS
		]
	}
];

export const components: ComponentDoc[] = catalog;

// Categories. `components` stays the flat union for existing callers;
// the docs surfaces group with these instead.
const ANIMATED_SLUGS = new Set([
	'graph-typewriter',
	'graph-ticker',
	'graph-scope',
	'graph-stream',
	'graph-flow-player',
	'graph-life',
	'graph-mandel',
	'graph-pulse',
	'graph-spinners',
	'graph-fire',
	'graph-rain'
]);

export const staticComponents: ComponentDoc[] = components.filter(
	(item) => !ANIMATED_SLUGS.has(item.slug)
);

export const animatedComponents: ComponentDoc[] = components.filter((item) =>
	ANIMATED_SLUGS.has(item.slug)
);

export function getComponent(slug: string): ComponentDoc | undefined {
	return components.find((item) => item.slug === slug);
}
