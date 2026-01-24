import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPestBySlug, getPests, getServiceById, getRandomSuffix } from '@/lib/data';
import StickyMobileCTA from '@/components/StickyMobileCTA';

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
    title: `זיהוי ${pest.name} (${pest.scientificName}) - מדריך זיהוי וטיפול`,
    description: `איך מזהים ${pest.name}? סימני זיהוי, סכנות ודרכי טיפול. ${pest.description.substring(0, 100)}...`,
    alternates: {
      canonical: `/pest-id/${pest.slug}`,
    },
  };
}

export default async function PestPage({ params }: PageProps) {
  const { pest: slug } = await params;
  const pest = getPestBySlug(slug);

  if (!pest) {
    notFound();
  }

  const relatedService = getServiceById(pest.relatedServiceId);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            מגדיר מזיקים: {pest.category}
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${toneClass}`}>
            זיהוי {pest.name}: סימנים, סכנות ודרכי טיפול
          </h1>
          <p className="text-xl text-gray-500 italic mb-6">
            {pest.scientificName}
          </p>
          <div className="flex justify-center gap-4">
            <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              רמת ביטחון בזיהוי: גבוהה
            </span>
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
                🔍 איך מזהים?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {pest.identificationSigns}
              </p>
            </div>
          </div>

          {/* Educational Content */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">תיאור המזיק</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {pest.description}
              </p>
            </section>

            {/* Urgency Alert */}
            {pest.urgency === 'critical' && (
              <div className="bg-red-50 border-r-4 border-red-500 p-6 rounded-l-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="text-lg font-bold text-red-800">טיפול דחוף נדרש</h3>
                </div>
                <p className="text-red-700">
                  מזיק זה מוגדר כבעל דחיפות קריטית. מומלץ לא להמתין ולהזמין טיפול מקצועי באופן מיידי למניעת התפשטות.
                </p>
              </div>
            )}

            {/* The Pivot (CTA) */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-600 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                זיהיתם את המזיק בבית?
              </h3>
              <p className="text-gray-700 mb-6">
                יש לנו טיפול ייעודי ומקצועי נגד {pest.name} שיפתור לכם את הבעיה לצמיתות עם אחריות מלאה.
              </p>
              {relatedService && (
                <Link
                  href={`/${relatedService.slug}`}
                  className="block w-full py-4 bg-blue-600 text-white text-center rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  לפרטי השירות והזמנת מדביר
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <StickyMobileCTA />
    </main>
  );
}
