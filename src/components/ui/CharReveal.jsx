import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * CharReveal — splits text into individual characters and animates
 * each one in with a staggered clip + translate reveal.
 *
 * Props:
 *   text       — string to animate
 *   className  — applied to the outer span
 *   delay      — initial delay before first char animates (seconds)
 *   stagger    — delay between each char (seconds, default 0.025)
 *   once       — only trigger once (default true)
 *   as         — element tag ('h1', 'h2', 'span', 'p', etc.)
 */
const CharReveal = ({
    text,
    className = "",
    delay = 0,
    stagger = 0.025,
    once = true,
    as: Tag = "span",
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-10% 0px" });

    // Split by words first to preserve word-breaks, then chars
    const words = text.split(" ");

    return (
        <Tag ref={ref} className={`inline-block overflow-hidden ${className}`} aria-label={text}>
            {words.map((word, wi) => (
                <span key={wi} className="inline-block" aria-hidden="true">
                    {word.split("").map((char, ci) => {
                        const i = words.slice(0, wi).reduce((acc, w) => acc + w.length, 0) + ci;
                        return (
                            <motion.span
                                key={ci}
                                className="inline-block"
                                initial={{ y: "110%", opacity: 0 }}
                                animate={isInView ? { y: "0%", opacity: 1 } : {}}
                                transition={{
                                    duration: 0.6,
                                    delay: delay + i * stagger,
                                    ease: [0.22, 1, 0.36, 1], // expo.out
                                }}
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                    {/* space between words */}
                    {wi < words.length - 1 && (
                        <span className="inline-block" style={{ width: "0.28em" }} />
                    )}
                </span>
            ))}
        </Tag>
    );
};

export default CharReveal;
