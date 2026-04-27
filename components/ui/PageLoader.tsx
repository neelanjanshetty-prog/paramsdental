'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(false), 1500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950 text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }}
        >
          <div className="relative flex flex-col items-center gap-6">
            <div className="absolute h-32 w-32 rounded-full bg-[#D99A20]/25 blur-3xl" />
            <motion.div
              className="relative h-32 w-64"
              animate={{ scale: [0.96, 1.02, 0.96], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity }}
            >
              <Image
                src="/images/params-dental-logo-nav.png"
                alt="Param's Dental"
                fill
                className="object-contain"
                sizes="256px"
                priority
              />
            </motion.div>
            <div className="h-1.5 w-56 overflow-hidden rounded-full bg-[#4A3008]/45">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,#8A5A08,#F6D46B,#D99A20,#8A5A08)] bg-[length:200%_100%]"
                animate={{ width: ['0%', '45%', '100%'], backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                transition={{ duration: 1.25, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
