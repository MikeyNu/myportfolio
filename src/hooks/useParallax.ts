import { RefObject } from 'react';
import { useScroll, useTransform, type MotionValue } from 'motion/react';

/**
 * Returns a MotionValue<number> (pixels) that shifts the element relative to
 * its natural scroll position, creating depth without moving the layout box.
 *
 * outputRange[0] → when element enters the viewport (scrollYProgress = 0)
 * outputRange[1] → when element exits the viewport  (scrollYProgress = 1)
 *
 * Portrait (heavier, slower):  [-24, 24]  — lags behind scroll
 * Label rail (lighter, faster): [12, -12] — runs ahead of scroll
 */
export function useParallax(
  ref: RefObject<Element | null>,
  outputRange: [number, number],
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  return useTransform(scrollYProgress, [0, 1], outputRange);
}
