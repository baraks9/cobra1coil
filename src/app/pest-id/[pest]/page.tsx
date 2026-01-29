import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import JsonLdManager from '@/components/JsonLdManager';
import { getPestBySlug, getPests, getServiceById, getRandomSuffix, Pest, Service } from '@/lib/data';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import InternalLinksSection from '@/components/InternalLinksSection';
import { createComprehensiveInternalLinks } from '@/lib/internalLinks';
import ReviewsSection from '@/components/ReviewsSection';

interface PageProps {
  params: Promise<{
    pest: string;
  }>;
}

export async function generateStaticParams() {
  const pests = getPests();
  return pests.map((pest) => ({
    pest: pest.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pest: slug } = await params;
  const pest = getPestBySlug(slug);

  if (!pest) return {};

  return {
    title: `איך מזהים ${pest.name}? מדריך זיהוי, תמונות וסימנים נפוצים`,
    description: `מדריך מקצועי לזיהוי ${pest.name} (${pest.scientificName}). איך הם נראים? מהם סימני הזיהוי בבית? ומה ההבדל בינם לבין מזיקים דומים?`,
    alternates: {
      canonical: `/pest-id/${slug}`,
    },
  };
}

export default async function PestPage({ params }: PageProps) {
  const { pest: slug } = await params;
  const pest = getPestBySlug(slug) as Pest | undefined;

  if (!pest) {
    notFound();
  }

  const relatedService = getServiceById(pest.relatedServiceId) as Service | undefined;
  const internalLinks = createComprehensiveInternalLinks('pest', undefined, undefined, pest);
  const breadcrumbs = internalLinks.find(s => s.variant === 'breadcrumbs');

  // Tone determination based on urgency
  const isAlarmist = pest.urgency === 'critical';
  const toneClass = isAlarmist ? 'text-red-700' : 'text-blue-900';

  // Schema Markup
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `זיהוי ${pest.name}`,
    description: pest.description,
    image: pest.imageUrl,
    author: {
      '@type': 'Organization',
      name: 'הדברה מקצועית',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourdomain.com/pest-id/${pest.slug}`,
    },
    about: {
      '@type': 'Thing',
      name: pest.scientificName,
      alternateName: pest.name,
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-24 md:pb-12" dir="rtl">
      <JsonLdManager 
        type="pest" 
        pest={pest} 
        service={relatedService} 
        breadcrumbs={breadcrumbs?.links} 
      />
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            מגדיר מזיקים: {pest.category}
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${toneClass}`}>
            מגדיר המזיקים: זיהוי ומידע על {pest.name}
          </h1>
          <p className="text-xl text-gray-500 italic mb-6">
            {pest.scientificName}
          </p>
          <div className="flex justify-center gap-4">
            <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              רמת ביטחון בזיהוי: גבוהה
            </span>
            {pest.dangerLevel && (
              <span className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                pest.dangerLevel >= 4 ? 'bg-red-50 text-red-700 border-red-100' : 'bg-orange-50 text-orange-700 border-orange-100'
              }`}>
                <span className="font-bold">רמת סיכון: {pest.dangerLevel}/5</span>
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Visual Identification Block */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-200 border shadow-inner">
              <Image
                src={pest.imageUrl || '/placeholders/pest-generic.jpg'}
                alt={pest.name}
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 50vw"
              />
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-900 flex items-center gap-2">
                🔍 איך מזהים {pest.name}?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {pest.identificationSigns}
              </p>
            </div>

            {pest.preventionTips && pest.preventionTips.length > 0 && (
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <h3 className="text-xl font-bold mb-4 text-green-900 flex items-center gap-2">
                  🛡️ איך למנוע את חזרת המזיק?
                </h3>
                <ul className="space-y-3">
                  {pest.preventionTips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-green-800">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="font-medium">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Educational Content */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">מידע כללי על {pest.name}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {pest.description}
              </p>
              {pest.seasonality && (
                <p className="mt-4 text-sm text-gray-500">
                  <span className="font-bold">עונתיות:</span> {pest.seasonality.join(', ')}
                </p>
              )}
            </section>

            {/* Urgency Alert */}
            {pest.urgency === 'critical' && (
              <div className="bg-red-50 border-r-4 border-red-500 p-6 rounded-l-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="text-lg font-bold text-red-800">זיהיתם {pest.name}?</h3>
                </div>
                <p className="text-red-700">
                  מזיק זה מוגדר כבעל דחיפות קריטית. זיהוי נכון הוא הצעד הראשון למניעת נזק משמעותי. מומלץ לא להמתין ולהזמין טיפול מקצועי באופן מיידי.
                </p>
              </div>
            )}

            {/* The Pivot (CTA) - Informational Intent with Commercial CTA */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg border-2 border-blue-600 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔗</span>
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">איך נפטרים מהם?</span>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-blue-900">
                זיהיתם {pest.name} בבית?
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                דף זה מיועד לזיהוי ומידע בלבד. זיהוי הוא רק השלב הראשון בפתרון הבעיה. כדי להיפטר מהמפגע לצמיתות, אנו מספקים שירותי {relatedService?.name || 'הדברה'} מקצועיים עם התחייבות לתוצאות ואחריות מלאה בכתב.
              </p>
              {relatedService && (
                <div className="space-y-4">
                  <Link
                    href={`/${relatedService.slug}`}
                    className="block w-full py-4 bg-blue-600 text-white text-center rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    להזמנת הדברת {pest.name} עכשיו ←
                  </Link>
                  
                  {relatedService.preparation && relatedService.preparation.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                        📋 איך להתכונן לטיפול?
                      </h4>
                      <ul className="space-y-2">
                        {relatedService.preparation.slice(0, 2).map((step: string, i: number) => (
                          <li key={i} className="text-sm text-blue-800 flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            {step}
                          </li>
                        ))}
                        {relatedService.preparation.length > 2 && (
                          <li className="text-xs text-blue-600 italic">
                            ועוד הנחיות ספציפיות בדף השירות...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* קישורים פנימיים ל-SEO */}
      <div className="max-w-4xl mx-auto px-4 pb-12 space-y-8">
        {createComprehensiveInternalLinks('pest', undefined, undefined, pest).map((section, idx) => (
          <InternalLinksSection key={idx} section={section} />
        ))}
      </div>

        <StickyMobileCTA />
        
        <div className="max-w-4xl mx-auto px-4">
          <ReviewsSection serviceId={relatedService?.id} />
        </div>
      </main>
  );
}
