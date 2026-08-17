import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Initializes Lenis smooth scroll and keeps it running via rAF.
 * Returns the Lenis instance so consumers can programmatically scroll.
 *
 * NOTE: We do NOT re-dispatch native scroll events here because
 * Framer Motion's useScroll() hooks into window.scrollY directly via
 * a ResizeObserver / IntersectionObserver combination — it does not
 * need a native scroll event to update. Dispatching one caused an
 * infinite loop (Lenis → dispatch scroll → Lenis listens → dispatch...).
 */
export function useLenis() {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out feel
            orientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        let raf;
        function animate(time) {
            lenis.raf(time);
            raf = requestAnimationFrame(animate);
        }
        raf = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
        };
    }, []);

    return lenisRef;
}
