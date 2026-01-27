import { InternalLinkSection } from '@/lib/internalLinks';
import InternalLinksSection from './InternalLinksSection';

interface HeroSectionProps {
  serviceName: string;
  cityName?: string;
  conversionCount?: number;
  specificPainPoint?: string;
  isEmergency?: boolean;
  title?: string;
  subtitle?: string;
  breadcrumbs?: InternalLinkSection;
}

export default function HeroSection({
  serviceName,
  cityName,
  conversionCount = 1250,
  specificPainPoint,
  isEmergency = false,
  title,
  subtitle,
  breadcrumbs,
}: HeroSectionProps) {
  if (isEmergency) {
    return (
      <section className="bg-red-700 text-white py-20 px-4 text-center border-b-8 border-yellow-400 relative">
        {breadcrumbs && (
          <div className="absolute top-4 right-4 left-4 opacity-80">
            <InternalLinksSection section={breadcrumbs} className="text-white" />
          </div>
        )}
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-yellow-400 text-red-700 px-6 py-2 rounded-full font-black text-xl mb-6 animate-bounce">
            צוות חירום פעיל עכשיו
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            {title || (
              <>
                {serviceName} ב{cityName || 'פריסה ארצית'} - הגעה תוך 20 דקות!
              </>
            )}
          </h1>
          <p className="text-2xl mb-10 font-bold text-yellow-100">
            {subtitle || "אנחנו בדרך אליך. צוות כוננות זמין 24/7 לטיפול מיידי."}
          </p>
          <a 
            href={`tel:${process.env.NEXT_PUBLIC_PHONE?.replace(/-/g, '') || '0502138028'}`}
            className="inline-flex items-center gap-4 bg-yellow-400 text-red-700 font-black py-6 px-12 rounded-full text-3xl hover:bg-white transition-all shadow-[0_0_30px_rgba(250,204,21,0.5)] scale-110 hover:scale-115"
          >
            <span>📞</span>
            <span>חייגו עכשיו: {process.env.NEXT_PUBLIC_PHONE || '050-2138028'}</span>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-blue-600 text-white py-16 px-4 text-center relative">
      {breadcrumbs && (
        <div className="absolute top-4 right-4 left-4 opacity-80">
          <InternalLinksSection section={breadcrumbs} className="text-white" />
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {title || specificPainPoint || (
            <>
              {serviceName} {cityName ? `ב${cityName}` : ''} - הגעה תוך 30 דקות
            </>
          )}
        </h1>
        <p className="text-xl mb-8 opacity-90">
          {subtitle || `הצטרפו ל-${conversionCount.toLocaleString()}+ לקוחות מרוצים שקיבלו שירות מקצועי`}
        </p>
        <button className="bg-yellow-400 text-blue-900 font-bold py-4 px-8 rounded-full text-xl hover:bg-yellow-300 transition-colors shadow-lg">
          הזמינו {serviceName} עכשיו
        </button>
      </div>
    </section>
  );
}
