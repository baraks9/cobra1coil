import { Metadata } from 'next';
import Link from 'next/link';
import { getPests, getServiceById } from '@/lib/data';
import { routes } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'מדריך זיהוי מזיקים - תמונות, סימנים ודרכי טיפול',
  description: 'מדריך זיהוי מזיקים לפי קטגוריות: איך מזהים, מה הסכנות, ולאיזה שירות טיפול לפנות.',
  alternates: {
    canonical: '/pest-id',
  },
};

export default function PestHubPage() {
  const pests = getPests();

  const byCategory = pests.reduce<Record<string, typeof pests>>((acc, pest) => {
    acc[pest.category] = acc[pest.category] ?? [];
    acc[pest.category].push(pest);
    return acc;
  }, {});

  const categories = Object.keys(byCategory).sort((a, b) => a.localeCompare(b, 'he'));

  return (
    <main className="min-h-screen bg-gray-50 pb-12" dir="rtl">
      <section className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">מדריך זיהוי מזיקים</h1>
          <p className="text-lg text-gray-600">
            בחרו מזיק כדי לקרוא על סימני זיהוי, דרכי טיפול והמלצה לשירות מקצועי.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        {categories.map((category) => (
          <section key={category} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {byCategory[category].map((pest) => {
                const service = getServiceById(pest.relatedServiceId);
                return (
                  <Link
                    key={pest.id}
                    href={routes.pest(pest.slug)}
                    className="group p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all"
                  >
                    <div className="font-bold text-gray-900 group-hover:text-blue-700">זיהוי {pest.name}</div>
                    <div className="text-sm text-gray-500 italic">{pest.scientificName}</div>
                    <div className="mt-2 text-sm text-gray-600 line-clamp-2">{pest.identificationSigns}</div>
                    {service && (
                      <div className="mt-3 text-sm text-blue-700 font-semibold">
                        שירות מומלץ: {service.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

