import { getVenueBySlug, getServices } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLdManager from '@/components/JsonLdManager';
import InternalLinksSection from '@/components/InternalLinksSection';
import { getRelatedServices, getNearbyCities } from '@/lib/internalLinks';
import { routes } from '@/lib/routes';

interface Props {
  params: Promise<{
    venue: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { venue: venueSlug } = await params;
  const venue = getVenueBySlug(venueSlug);
  if (!venue) return {};

  const titles: Record<string, string> = {
    'office': `הדברה למשרדים ומוסדות (B2B) | ניטור חודשי ואישורי בטיחות`,
    'restaurant': `הדברה למסעדות ועסקי מזון | עמידה בתקני משרד הבריאות (HACCP)`,
    'building': `הדברה לבניינים וועדי בתים | טיפול מוסדי בתשתיות ובורות ביוב`
  };

  const descriptions: Record<string, string> = {
    'office': `פתרונות הדברה מקיפים למשרדים וחללי עבודה. שירות דיסקרטי לאחר שעות הפעילות, עמידה בתקני בטיחות וגהות, וביטוח צד ג' מלא. התקשרו להצעת מחיר עסקית.`,
    'restaurant': `הדברה מקצועית למסעדות עם תיק הדברה מלא לביקורות משרד הבריאות. הסכמי תחזוקה חודשיים, ניטור מונע וזמינות 24/7 לכל תקלה. עמידה בתקני HACCP.`,
    'building': `שירות הדברה מוסדי לוועדי בתים ובניינים משותפים. ריסוס יסודי של תשתיות ביוב, חדרי אשפה ומקלטים. הסכמי שירות שנתיים ומחירים מיוחדים למוסדות.`
  };

  return {
    title: titles[venue.id] || `הדברה ל${venue.name} | שירות לעסקים ומוסדות | הדברה מקצועית`,
    description: descriptions[venue.id] || `שירותי הדברה מותאמים אישית ל${venue.name}. ${venue.focus.join(', ')}. עמידה בתקנים, רישיון משרד הבריאות ואחריות מלאה.`,
    alternates: {
      canonical: `/commercial/${venueSlug}`,
    },
  };
}

export default async function CommercialVenuePage({ params }: Props) {
  const { venue: venueSlug } = await params;
  const venue = getVenueBySlug(venueSlug);

  if (!venue) {
    notFound();
  }

  const allServices = getServices();
  const relatedServicesSection = getRelatedServices(allServices[0], undefined, 12);
  const breadcrumbs = [
    { label: 'בית', href: '/' },
    { label: 'הדברה לעסקים', href: '/commercial' },
    { label: venue.name, href: `/commercial/${venue.slug}` }
  ];

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <JsonLdManager type="commercial" venue={venue} breadcrumbs={breadcrumbs} />
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            {venue.h1Title || `הדברה מקצועית ל${venue.name}`}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto">
            {venue.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {venue.focus.map((f, i) => (
              <span key={i} className="bg-blue-600 px-4 py-2 rounded-lg font-bold text-sm md:text-base">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Value Proposition */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">למה בעלי {venue.name} בוחרים בנו?</h2>
            <div className="space-y-6">
              {venue.features.map((feature, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-800">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 p-6 bg-slate-50 border-r-4 border-blue-600 rounded-l-xl">
              <p className="text-slate-700 italic">
                "אנחנו מבינים שבעסק שלך אין מקום למזיקים. אנחנו מספקים את כל האישורים הנדרשים לביקורות של משרד הבריאות והרשויות, עם שירות דיסקרטי ומקצועי."
              </p>
            </div>
          </div>
          <div className="bg-slate-100 rounded-3xl p-10 border border-slate-200 shadow-inner">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">בקשת הצעה למגזר העסקי</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">שם העסק / ועד הבית</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="שם העסק שלך" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">טלפון ליצירת קשר</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="05X-XXXXXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">סוג השירות המבוקש</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>הדברה חד פעמית</option>
                  <option>הסכם תחזוקה חודשי</option>
                  <option>ייעוץ ומיגון מונע</option>
                </select>
              </div>
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-blue-700 transition-colors shadow-lg mt-4">
                שלחו לי הצעת מחיר עסקית
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-slate-500 mb-2">או התקשרו ישירות למחלקת עסקים:</p>
              <a href="tel:0500000000" className="text-2xl font-black text-blue-600 hover:underline">050-000-0000</a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl mb-2">📜</div>
            <p className="font-bold text-slate-800">רישיון הדברה בתוקף</p>
          </div>
          <div>
            <div className="text-4xl mb-2">📑</div>
            <p className="font-bold text-slate-800">חשבונית מס כחוק</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🛡️</div>
            <p className="font-bold text-slate-800">ביטוח צד ג' מלא</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🕒</div>
            <p className="font-bold text-slate-800">זמינות 24/7 לעסקים</p>
          </div>
        </div>
      </section>

      {/* Internal Links for SEO */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <InternalLinksSection 
            section={getRelatedServices(getServices()[0], undefined, 12)} 
          />
          <InternalLinksSection 
            section={getNearbyCities({ id: 'none', district: 'מרכז' } as any, undefined, 24)} 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t">
            <Link href={routes.home()} className="text-blue-600 font-bold hover:underline">← חזרה לדף הבית</Link>
            <Link href={routes.pestHub()} className="text-blue-600 font-bold hover:underline text-left">למדריך זיהוי מזיקים →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
