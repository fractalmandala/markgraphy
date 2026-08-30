// Accent system for the docs site. A choice paints --graph-accent/-2/-3
// onto <html>; every graph picks it up through the CSS variable contract.
// Values are the site's dark set — the site renders dark-first.

export const ACCENT_STORAGE_KEY = 'fractalgraphy-accent';
export const ACCENT_EVENT = 'fractalgraphy-accent';
export const DEFAULT_ACCENT_ID = 'fractal';

export type AccentKind = 'solid' | 'gradient';

export interface Accent {
	id: string;
	label: string;
	kind: AccentKind;
	accent: string;
	duo: string;
	tri: string;
	swatch: string;
}

function gradientSwatch(angle: number, a: string, b: string, c: string, mid: number) {
	return `linear-gradient(${angle}deg, ${a} 0%, ${b} ${mid}%, ${c} 100%)`;
}

export const accents: Accent[] = [
	{
		id: 'fractal',
		label: 'Fractal',
		kind: 'solid',
		accent: 'oklch(0.78 0.17 155)',
		duo: 'oklch(0.78 0.12 70)',
		tri: 'oklch(0.75 0.1 200)',
		swatch: 'oklch(0.78 0.17 155)'
	},
	{
		id: 'mono',
		label: 'Mono',
		kind: 'solid',
		accent: 'oklch(0.92 0 0)',
		duo: 'oklch(0.72 0 0)',
		tri: 'oklch(0.55 0 0)',
		swatch: 'oklch(0.92 0 0)'
	},
	{
		id: 'mint',
		label: 'Mint',
		kind: 'solid',
		accent: 'oklch(0.77 0.15 163)',
		duo: 'oklch(0.68 0.1 163)',
		tri: 'oklch(0.58 0.08 163)',
		swatch: 'oklch(0.77 0.15 163)'
	},
	{
		id: 'orange',
		label: 'Orange',
		kind: 'solid',
		accent: 'oklch(0.76 0.14 55)',
		duo: 'oklch(0.66 0.12 55)',
		tri: 'oklch(0.55 0.08 55)',
		swatch: 'oklch(0.76 0.14 55)'
	},
	{
		id: 'green',
		label: 'Green',
		kind: 'solid',
		accent: 'oklch(0.74 0.14 145)',
		duo: 'oklch(0.64 0.1 145)',
		tri: 'oklch(0.55 0.08 145)',
		swatch: 'oklch(0.74 0.14 145)'
	},
	{
		id: 'cyan',
		label: 'Cyan',
		kind: 'solid',
		accent: 'oklch(0.76 0.1 210)',
		duo: 'oklch(0.66 0.08 210)',
		tri: 'oklch(0.55 0.06 210)',
		swatch: 'oklch(0.76 0.1 210)'
	},
	{
		id: 'blue',
		label: 'Blue',
		kind: 'solid',
		accent: 'oklch(0.7 0.12 255)',
		duo: 'oklch(0.62 0.1 255)',
		tri: 'oklch(0.52 0.08 255)',
		swatch: 'oklch(0.7 0.12 255)'
	},
	{
		id: 'purple',
		label: 'Purple',
		kind: 'solid',
		accent: 'oklch(0.72 0.12 300)',
		duo: 'oklch(0.62 0.1 300)',
		tri: 'oklch(0.55 0.08 300)',
		swatch: 'oklch(0.72 0.12 300)'
	},
	{
		id: 'pink',
		label: 'Pink',
		kind: 'solid',
		accent: 'oklch(0.74 0.14 8)',
		duo: 'oklch(0.64 0.1 8)',
		tri: 'oklch(0.55 0.08 8)',
		swatch: 'oklch(0.74 0.14 8)'
	},
	{
		id: 'sunset',
		label: 'Sunset',
		kind: 'gradient',
		accent: 'oklch(0.7 0.19 19)',
		duo: 'oklch(0.86 0.12 74)',
		tri: 'oklch(0.92 0.1 89)',
		swatch: gradientSwatch(
			135,
			'oklch(0.7 0.19 19)',
			'oklch(0.86 0.12 74)',
			'oklch(0.92 0.1 89)',
			52
		)
	},
	{
		id: 'ocean',
		label: 'Ocean',
		kind: 'gradient',
		accent: 'oklch(0.77 0.15 228)',
		duo: 'oklch(0.68 0.18 259)',
		tri: 'oklch(0.72 0.15 248)',
		swatch: gradientSwatch(
			140,
			'oklch(0.77 0.15 228)',
			'oklch(0.59 0.23 259)',
			'oklch(0.72 0.15 248)',
			48
		)
	},
	{
		id: 'neon',
		label: 'Neon',
		kind: 'gradient',
		accent: 'oklch(0.92 0.23 129)',
		duo: 'oklch(0.89 0.18 162)',
		tri: 'oklch(0.8 0.15 220)',
		swatch: gradientSwatch(
			145,
			'oklch(0.92 0.23 129)',
			'oklch(0.89 0.18 162)',
			'oklch(0.8 0.15 220)',
			46
		)
	},
	{
		id: 'aurora',
		label: 'Aurora',
		kind: 'gradient',
		accent: 'oklch(0.68 0.25 351)',
		duo: 'oklch(0.7 0.14 307)',
		tri: 'oklch(0.7 0.13 244)',
		swatch: gradientSwatch(
			145,
			'oklch(0.68 0.25 351)',
			'oklch(0.5 0.14 307)',
			'oklch(0.6 0.13 244)',
			45
		)
	},
	{
		id: 'fire',
		label: 'Fire',
		kind: 'gradient',
		accent: 'oklch(0.67 0.22 33)',
		duo: 'oklch(0.68 0.2 1)',
		tri: 'oklch(0.82 0.15 72)',
		swatch: gradientSwatch(
			145,
			'oklch(0.67 0.22 33)',
			'oklch(0.59 0.22 1)',
			'oklch(0.82 0.15 72)',
			45
		)
	},
	{
		id: 'prism',
		label: 'Prism',
		kind: 'gradient',
		accent: 'oklch(0.75 0.14 220)',
		duo: 'oklch(0.69 0.19 313)',
		tri: 'oklch(0.66 0.2 21)',
		swatch: gradientSwatch(
			145,
			'oklch(0.75 0.14 220)',
			'oklch(0.69 0.19 313)',
			'oklch(0.66 0.2 21)',
			45
		)
	}
];

const accentById = new Map(accents.map((accent) => [accent.id, accent]));

export function isAccentId(value: string | null): value is string {
	return Boolean(value && accentById.has(value));
}

export function currentAccentId(): string {
	if (typeof document === 'undefined') {
		return DEFAULT_ACCENT_ID;
	}
	return document.documentElement.getAttribute('data-accent') ?? DEFAULT_ACCENT_ID;
}

/** Paint the accent onto <html>, persist it, and announce it. */
export function setAccent(id: string) {
	const accent = accentById.get(id);
	if (!accent) {
		return;
	}

	const root = document.documentElement;
	if (root.getAttribute('data-accent') === accent.id) {
		return;
	}

	const apply = () => {
		root.setAttribute('data-accent', accent.id);
		root.setAttribute('data-accent-kind', accent.kind);
		try {
			localStorage.setItem(ACCENT_STORAGE_KEY, accent.id);
		} catch {
			/* private mode — accent just won't persist */
		}
		window.dispatchEvent(new Event(ACCENT_EVENT));
	};

	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const doc = document as Document & {
		startViewTransition?: (update: () => void) => { finished: Promise<void> };
	};

	if (!reduce && typeof doc.startViewTransition === 'function') {
		root.classList.add('accent-wiping');
		const transition = doc.startViewTransition(apply);
		// Aborted transitions (tab hidden mid-wipe) reject — swallow after cleanup.
		transition.finished
			.finally(() => root.classList.remove('accent-wiping'))
			.catch(() => {});
		return;
	}

	apply();

	if (!reduce) {
		root.classList.remove('accent-shimmer');
		void root.offsetWidth;
		root.classList.add('accent-shimmer');
		window.setTimeout(() => root.classList.remove('accent-shimmer'), 420);
	}
}
