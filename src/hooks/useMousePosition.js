import { useState, useEffect } from "react";

/**
 * Tracks the mouse position across the entire document.
 * Returns { x, y } in pixels from the viewport top-left.
 */
export function useMousePosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const update = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", update);
        return () => window.removeEventListener("mousemove", update);
    }, []);

    return position;
}
