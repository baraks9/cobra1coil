'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface UrgencyBannerProps {
  urgency: 'critical' | 'high' | 'medium' | 'low';
  cityName: string;
  arrivalTime?: string;
  neighborhoods?: string[];
  customMessage?: string;
}

function UrgencyBannerContent({ urgency, cityName, arrivalTime, neighborhoods, customMessage }: UrgencyBannerProps) {
  const searchParams = useSearchParams();
  const isImmediate = searchParams.get('urgency') === 'immediate';
  
  if ((urgency === 'medium' || urgency === 'low') && !customMessage && !isImmediate) return null;

  const isCritical = urgency === 'critical' || isImmediate;
  
  // Get a random neighborhood if available
  const neighborhood = neighborhoods && neighborhoods.length > 0 
    ? neighborhoods[Math.floor(Math.random() * neighborhoods.length)]
    : null;

  return (
    <div className={`${isCritical ? 'bg-red-700' : 'bg-red-600'} text-white py-3 px-4 text-center font-bold animate-pulse`}>
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
        <span className="text-xl">🚀</span>
        <span className="text-sm md:text-base">
          {customMessage || (isImmediate 
            ? `שירות מעכשיו לעכשיו! מדביר בדרך: הגעה תוך ${arrivalTime || '30 דקות'} ל${neighborhood ? `שכונת ${neighborhood}` : cityName}`
            : (isCritical 
              ? `צוות תגובה מיידית ב${cityName}: הגעה משוערת תוך ${arrivalTime || '25 דקות'}` 
              : `זמינות גבוהה ב${cityName}: מדביר פנוי להגעה תוך ${arrivalTime || '40 דקות'}`))}
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
