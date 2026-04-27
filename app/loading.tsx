import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="text-center">
        <div className="relative mx-auto h-28 w-56">
          <Image
            src="/images/params-dental-logo-nav.png"
            alt="Param's Dental"
            fill
            className="object-contain"
            sizes="224px"
            priority
          />
        </div>
        <div className="mx-auto mt-6 h-1.5 w-44 overflow-hidden rounded-full bg-[#F2E3BE]">
          <div className="h-full animate-shine rounded-full bg-[linear-gradient(90deg,#8A5A08,#F6D46B,#D99A20,#8A5A08)] bg-[length:200%_100%]" />
        </div>
      </div>
    </div>
  );
}
