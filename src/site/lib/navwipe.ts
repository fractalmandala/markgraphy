import { onNavigate } from '$app/navigation';

/** Milliseconds for one page wipe. The mode swipe runs 520; navigation is snappier. */
const DURATION = 420;

/** Same curve as the dark/light swipe, so the two read as one gesture. */
const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

type ViewTransitionDocument = Document & {
	startViewTransition?: (update: () => Promise<void> | void) => {
		ready: Promise<void>;
		finished: Promise<void>;
	};
};

/**
 * Wipe each navigation in from the bottom edge upwards.
 *
 * The global `::view-transition-*(root)` rules kill the default cross-fade, so
 * the incoming snapshot is animated here — the same clip-path reveal the mode
 * toggle uses, pinned to one direction.
 *
 * Call once, during layout initialisation.
 */
export function enableNavWipe(): void {
	onNavigate((navigation) => {
		const doc = document as ViewTransitionDocument;

		if (typeof doc.startViewTransition !== 'function') {
			return;
		}

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		// Hash links and replaceState land on the same page: nothing to wipe.
		if (navigation.to?.url.pathname === navigation.from?.url.pathname) {
			return;
		}

		return new Promise((resolve) => {
			const transition = doc.startViewTransition!(async () => {
				resolve();
				await navigation.complete;
			});

			transition.ready
				.then(() => {
					document.documentElement.animate(
						{ clipPath: ['inset(100% 0 0 0)', 'inset(0 0 0 0)'] },
						{
							duration: DURATION,
							easing: EASING,
							pseudoElement: '::view-transition-new(root)'
						}
					);
				})
				// Aborted transitions (a second nav mid-wipe) reject — nothing to clean up.
				.catch(() => {});
		});
	});
}
