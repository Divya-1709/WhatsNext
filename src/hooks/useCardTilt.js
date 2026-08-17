import { useRef, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * Returns a ref to attach to a card element and motion values for
 * rotateX, rotateY, and a glare position — all spring-smoothed.
 *
 * Usage:
 *   const { ref, rotateX, rotateY, glareX, glareY } = useCardTilt();
 *   <motion.div ref={ref} style={{ rotateX, rotateY, transformPerspective: 800 }} />
 */
export function useCardTilt({ maxTilt = 12, speed = 0.08 } = {}) {
    const ref = useRef(null);

    const rawRotateX = useMotionValue(0);
    const rawRotateY = useMotionValue(0);
    const rawGlareX = useMotionValue(50);
    const rawGlareY = useMotionValue(50);

    const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 30, mass: 0.5 });
    const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 30, mass: 0.5 });
    const glareX = useSpring(rawGlareX, { stiffness: 400, damping: 40 });
    const glareY = useSpring(rawGlareY, { stiffness: 400, damping: 40 });

    const onMouseMove = useCallback((e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;  // 0→1
        const y = (e.clientY - rect.top) / rect.height;  // 0→1
        rawRotateX.set((0.5 - y) * maxTilt * 2);
        rawRotateY.set((x - 0.5) * maxTilt * 2);
        rawGlareX.set(x * 100);
        rawGlareY.set(y * 100);
    }, [maxTilt, rawRotateX, rawRotateY, rawGlareX, rawGlareY]);

    const onMouseLeave = useCallback(() => {
        rawRotateX.set(0);
        rawRotateY.set(0);
        rawGlareX.set(50);
        rawGlareY.set(50);
    }, [rawRotateX, rawRotateY, rawGlareX, rawGlareY]);

    return { ref, rotateX, rotateY, glareX, glareY, onMouseMove, onMouseLeave };
}
