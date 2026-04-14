import { motion } from 'motion/react';

export default function PetalEffect() {
  const petals = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((_, i) => {
        const size = Math.random() * 6 + 6;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pink-200/70"
            style={{ width: size, height: size }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: window.innerHeight + 20,
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        );
      })}
    </div>
  );
}
