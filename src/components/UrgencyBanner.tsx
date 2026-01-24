'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface UrgencyBannerProps {
  urgency: 'critical' | 'high' | 'medium' | 'low';
  cityName: string;
  customMessage?: string;
}

function UrgencyBannerContent({ urgency, cityName, customMessage }: UrgencyBannerProps) {
  const searchParams = useSearchParams();
  const isImmediate = searchParams.get('urgency') === 'immediate';
  
  if ((urgency === 'medium' || urgency === 'low') && !customMessage && !isImmediate) return null;

  const isCritical = urgency === 'critical' || isImmediate;

  return (
    <div className={`${isCritical ? 'bg-red-700' : 'bg-red-600'} text-white py-3 px-4 text-center font-bold animate-pulse`}>
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
        <span>⚠️</span>
        <span>
          {customMessage || (isImmediate 
            ? `שירות מעכשיו לעכשיו! צוות חירום זמין כעת באזור ${cityName}`
            : (isCritical 
              ? `צוות תגובה מיידית זמין כעת באזור ${cityName}` 
              : `סיכון גבוה! צוות תגובה מיידית זמין כעת באזור ${cityName}`))}
        </span>
      </div>
    </div>
  );
}

export default function UrgencyBanner(props: UrgencyBannerProps) {
  return (
    <Suspense fallback={null}>
      <UrgencyBannerContent {...props} />
    </Suspense>
  );
}
