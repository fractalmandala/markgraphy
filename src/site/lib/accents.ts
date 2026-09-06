// Accent system for the docs site. A choice paints --graph-accent/-2/-3
// onto <html>; every graph picks it up through the CSS variable contract.
// accentColors is the single source of truth — the accents list, the
// picker, and the CSS all derive from it.

export const ACCENT_STORAGE_KEY = 'markgraphy-accent';
export const ACCENT_EVENT = 'markgraphy-accent';
export const DEFAULT_ACCENT_ID = '#ff3e00';

export interface Palette {
	accent: string;
}

export const accentColors: Palette[] = [
	{ accent: '#FF3E00' },
	{ accent: '#e67700' },
	{ accent: '#5c940d' },
	{ accent: '#2f9e44' },
	{ accent: '#087f5b' },
	{ accent: '#1098ad' },
	{ accent: '#1971c2' },
	{ accent: '#862e9c' },
	{ accent: '#c2255c' },
	{ accent: '#c92a2a' }
];

// Derived from accentColors — each hex is its own id.
export const accents = accentColors.map((p) => {
	const hex = p.accent.toLowerCase();
	return { id: hex, label: hex, accent: hex, duo: hex, tri: hex, swatch: hex };
});

const accentByColor = new Map(accentColors.map((p) => [p.accent.toLowerCase(), p]));

export function isAccentId(value: string | null): value is string {
	return Boolean(value && accentByColor.has(value.toLowerCase()));
}

export function currentAccentId(): string {
	if (typeof document === 'undefined') {
		return DEFAULT_ACCENT_ID;
	}
	return document.documentElement.getAttribute('data-accent') ?? DEFAULT_ACCENT_ID;
}

/** Paint the accent onto <html>, persist it, and announce it. */
export function setAccent(hex: string) {
	const normalized = hex.toLowerCase();
	if (!accentByColor.has(normalized)) {
		return;
	}

	const root = document.documentElement;
	if (root.getAttribute('data-accent') === normalized) {
		return;
	}

	const apply = () => {
		root.setAttribute('data-accent', normalized);
		try {
			localStorage.setItem(ACCENT_STORAGE_KEY, normalized);
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
