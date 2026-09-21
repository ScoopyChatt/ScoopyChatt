// Drop-in replacement for the slice of framer-motion this site actually used.
//
// framer-motion was 119KB raw / 39KB gzip - 29% of the main bundle - and every
// page paid for it before React could render anything. The site only ever used
// fade/slide-in on mount or on scroll: 184 motion.div, no drag, no layoutId, no
// variants. That is a CSS transition and an IntersectionObserver.
//
// Supported: initial, animate, whileInView, viewport.once, transition.duration,
// transition.delay, and the x/y/opacity/scale/rotate properties those objects use.
// Ignored on purpose: exit (AnimatePresence is a pass-through, so elements
// disappear instantly instead of animating out), whileHover, whileTap.
import React, { useEffect, useRef, useState } from 'react';

// Anything framer-specific has to be stripped, or React warns about unknown DOM
// attributes and they end up serialized into the HTML.
const MOTION_ONLY = new Set([
  'initial', 'animate', 'exit', 'whileInView', 'whileHover', 'whileTap', 'whileFocus',
  'whileDrag', 'transition', 'viewport', 'variants', 'custom', 'layout', 'layoutId',
  'drag', 'dragConstraints', 'onAnimationComplete', 'onAnimationStart', 'transformTemplate',
]);

function toStyle(spec) {
  if (!spec) return {};
  const out = {};
  const transforms = [];
  if (spec.opacity !== undefined) out.opacity = spec.opacity;
  if (spec.x !== undefined) transforms.push(`translateX(${typeof spec.x === 'number' ? spec.x + 'px' : spec.x})`);
  if (spec.y !== undefined) transforms.push(`translateY(${typeof spec.y === 'number' ? spec.y + 'px' : spec.y})`);
  if (spec.scale !== undefined) transforms.push(`scale(${spec.scale})`);
  if (spec.rotate !== undefined) transforms.push(`rotate(${spec.rotate}deg)`);
  if (transforms.length) out.transform = transforms.join(' ');
  return out;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function createMotionComponent(tag) {
  const Motion = React.forwardRef(function Motion(props, forwardedRef) {
    const { initial, animate, whileInView, viewport, transition, style, ...rest } = props;
    const target = animate || whileInView;
    const localRef = useRef(null);

    // No animation described, or the visitor asked for reduced motion: render the
    // end state immediately rather than a transition to it.
    const skip = !target || prefersReducedMotion();
    const [atTarget, setAtTarget] = useState(skip);

    useEffect(() => {
      if (skip || atTarget) return undefined;
      if (!whileInView) {
        // Mount animation: next frame, so the browser paints the initial state first.
        const id = requestAnimationFrame(() => setAtTarget(true));
        return () => cancelAnimationFrame(id);
      }
      const el = localRef.current;
      // Without IntersectionObserver the element would sit at opacity 0 forever,
      // so fail open and just show it.
      if (!el || typeof IntersectionObserver === 'undefined') {
        setAtTarget(true);
        return undefined;
      }
      const once = !viewport || viewport.once !== false;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setAtTarget(true);
              if (once) io.disconnect();
            } else if (!once) {
              setAtTarget(false);
            }
          });
        },
        { rootMargin: '0px 0px -10% 0px' }
      );
      io.observe(el);
      return () => io.disconnect();
    }, [skip, atTarget, whileInView, viewport]);

    const duration = (transition && transition.duration) || 0.5;
    const delay = (transition && transition.delay) || 0;

    const domProps = {};
    for (const key in rest) if (!MOTION_ONLY.has(key)) domProps[key] = rest[key];

    const finalStyle = {
      ...style,
      ...toStyle(atTarget ? target : initial),
      ...(skip
        ? null
        : { transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s` }),
    };

    return React.createElement(tag, {
      ...domProps,
      ref: (node) => {
        localRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      style: finalStyle,
    });
  });
  Motion.displayName = `motion.${tag}`;
  return Motion;
}

const cache = new Map();
export const motion = new Proxy(
  {},
  {
    get(_target, tag) {
      if (typeof tag !== 'string') return undefined;
      if (!cache.has(tag)) cache.set(tag, createMotionComponent(tag));
      return cache.get(tag);
    },
  }
);

// Exit animations are not reproduced. Children still mount and unmount normally,
// which is all the two call sites (the quote form's zip confirmation and the chat
// widget) actually depend on.
export function AnimatePresence({ children }) {
  return React.createElement(React.Fragment, null, children);
}

// Imperative numeric tween, used by useAnimatedText for the chatbot's typewriter
// effect: animate(from, to, { duration, onUpdate }) -> { stop() }.
export function animate(from, to, options = {}) {
  const durationMs = (options.duration || 0.3) * 1000;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  let frame = null;
  let stopped = false;
  const start = performance.now();

  const tick = (now) => {
    if (stopped) return;
    const t = durationMs <= 0 ? 1 : Math.min((now - start) / durationMs, 1);
    const value = from + (to - from) * easeOut(t);
    if (options.onUpdate) options.onUpdate(value);
    if (t < 1) frame = requestAnimationFrame(tick);
    else if (options.onComplete) options.onComplete();
  };
  frame = requestAnimationFrame(tick);

  return {
    stop() {
      stopped = true;
      if (frame !== null) cancelAnimationFrame(frame);
    },
  };
}

export default motion;
