import { animate, motion } from "framer-motion";
import { memo, useEffect, useRef } from "react";

interface CounterProps {
  from: number;
  to: number;
}

export const Counter = memo(({ from, to }: CounterProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    if (node) {
      const controls = animate(from, to, {
        duration: 1,
        onUpdate(value) {
          node.textContent = (+value.toFixed(0)).toLocaleString();
        },
      });

      return () => controls.stop();
    }
  }, [from, to]);

  return <motion.div ref={nodeRef} />;
});
