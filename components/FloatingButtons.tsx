'use client';

import { motion } from 'framer-motion';
import { Bot, CalendarCheck2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/site';

function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16.04 3.2A12.7 12.7 0 0 0 5.1 22.36L3.6 28.8l6.58-1.54A12.7 12.7 0 1 0 16.04 3.2Zm0 2.35a10.34 10.34 0 0 1 8.76 15.84 10.33 10.33 0 0 1-13.77 3.45l-.47-.28-3.98.93.91-3.83-.31-.5A10.34 10.34 0 0 1 16.04 5.55Zm-4.4 5.22c-.25 0-.66.1-1 .47-.35.38-1.32 1.3-1.32 3.16 0 1.86 1.35 3.66 1.54 3.91.2.25 2.61 4.18 6.45 5.68 3.18 1.25 3.84 1 4.53.94.7-.06 2.24-.91 2.55-1.79.32-.88.32-1.63.22-1.79-.1-.16-.35-.25-.75-.44-.4-.19-2.24-1.1-2.6-1.23-.34-.13-.6-.19-.85.19-.25.38-.98 1.23-1.2 1.48-.22.25-.44.28-.82.1-.4-.2-1.66-.61-3.16-1.95-1.17-1.04-1.96-2.33-2.18-2.72-.22-.38-.02-.59.17-.78.17-.17.38-.44.56-.66.19-.22.25-.38.38-.63.13-.25.06-.47-.03-.66-.1-.19-.85-2.05-1.17-2.8-.3-.73-.62-.64-.85-.65h-.72Z" />
    </svg>
  );
}

export function FloatingButtons() {
  const pathname = usePathname();

  const scrollToAppointment = () => {
    if (pathname !== '/') {
      window.location.href = '/#appointment';
      return;
    }

    document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed bottom-4 right-3 z-[95] flex flex-col gap-2 sm:bottom-5 sm:right-4 sm:gap-3 md:right-6">
      <motion.a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Open WhatsApp bot chat"
        className="relative flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#071f15]/90 px-3 py-2.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(37,211,102,0.28)] backdrop-blur-xl transition dark:border-[#25D366]/50 dark:bg-[#062116]/95 sm:gap-3 sm:px-4 sm:py-3"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.03, y: -4 }}
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366]/35 animate-pulse-ring" />
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white sm:h-10 sm:w-10">
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#075E54] shadow-sm">
            <Bot className="h-3 w-3" />
          </span>
          <WhatsAppLogo className="h-5 w-5 sm:h-6 sm:w-6" />
        </span>
        <span className="hidden sm:flex sm:flex-col sm:leading-tight">
          <span>WhatsApp Bot</span>
          <span className="text-[11px] font-medium text-white/75">+91 99025 35254</span>
        </span>
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#25D366] shadow-[0_0_0_4px_rgba(37,211,102,0.18)] animate-ping" />
      </motion.a>

      <motion.button
        type="button"
        onClick={scrollToAppointment}
        className="button-primary gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95 }}
        whileHover={{ scale: 1.03, y: -4 }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 sm:h-10 sm:w-10">
          <CalendarCheck2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
        <span className="hidden sm:block">Book Appointment</span>
      </motion.button>
    </div>
  );
}
