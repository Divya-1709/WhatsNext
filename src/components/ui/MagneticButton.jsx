import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticButton
 * Wraps any child element and applies a magnetic pull effect:
 * - The element moves toward the cursor within its bounding box
 * - Springs back on mouse leave
 *
 * Props:
 *   strength  — max pixel offset (default 30)
 *   children  — the button/element to make magnetic
 *   className — forwarded to the wrapper div
 */
const MagneticButton = ({ children, strength = 30, className = "" }) => {
    const ref = useRef(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.5 });
    const y = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.5 });

    const onMouseMove = useCallback((e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        rawX.set(dx * (strength / (rect.width / 2)));
        rawY.set(dy * (strength / (rect.height / 2)));
    }, [rawX, rawY, strength]);

    const onMouseLeave = useCallback(() => {
        rawX.set(0);
        rawY.set(0);
    }, [rawX, rawY]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ x, y, display: "inline-block" }}
            className={className}
            data-cursor="pointer"
        >
            {children}
        </motion.div>
    );
};

export default MagneticButton;
