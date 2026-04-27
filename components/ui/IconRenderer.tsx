import {
  AlarmClock,
  BadgeDollarSign,
  Baby,
  CalendarCheck2,
  Crown,
  HeartPulse,
  MapPinned,
  MessagesSquare,
  PhoneCall,
  Scan,
  ShieldCheck,
  ShieldPlus,
  Smile,
  SmilePlus,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Zap,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

import type { IconKey } from '@/data/site';

const fallbackIcon = ShieldCheck;

const iconMap: Partial<Record<IconKey, LucideIcon>> = {
  AlarmClock,
  BadgeDollarSign,
  Baby,
  CalendarCheck2,
  Crown,
  HeartPulse,
  MapPinned,
  MessagesSquare,
  PhoneCall,
  Scan,
  ShieldCheck,
  ShieldPlus,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Tooth: SmilePlus,
  Zap,
};

export function IconRenderer({
  name,
  ...props
}: { name: IconKey } & LucideProps) {
  const Icon = iconMap[name] ?? fallbackIcon;

  if (!iconMap[name] && process.env.NODE_ENV !== 'production') {
    console.warn(`IconRenderer fallback used for icon: ${name}`);
  }

  return <Icon {...props} />;
}
