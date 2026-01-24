import { getServiceBySlug, getCityBySlug, getPricingByServiceId } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: Promise<{
    service: string;
    city: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);

  if (!service || !city) return {};

  return {
    title: `כמה עולה ${service.name} ב${city.name}? | מחירון 2024`,
    description: `גלו מה המחיר הממוצע עבור ${service.name} ב${city.name}. מחירים מעודכנים, הערכת עלות וייעוץ חינם.`,
  };
}

export default async function PriceServiceCityPage({ params }: Props) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);

  if (!service || !city) {
    notFound();
  }

  const pricing = getPricingByServiceId(service.id);

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600">בית</Link>
          <span className="mx-2">/</span>
          <Link href="/pricing" className="hover:text-blue-600">מחירון</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{service.name} ב{city.name}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-blue-900 p-8 text-white text-center">
            <div className="text-6xl mb-4">{service.icon}</div>
            <h1 className="text-3xl font-bold mb-2">עלות {service.name} ב{city.name}</h1>
            <p className="text-blue-100">הערכת מחיר מבוססת נתוני שוק 2024</p>
          </div>

          <div className="p-8">
            <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-100 text-center mb-8">
              <p className="text-gray-600 text-lg mb-2">עלות משוערת ל{service.name} ב{city.name}:</p>
              <div className="text-5xl font-black text-blue-900 mb-4">
                {pricing ? `${pricing.minPrice} - ${pricing.maxPrice}` : service.avgPrice} ₪
              </div>
              <p className="text-sm text-gray-500">
                * המחיר הסופי עשוי להשתנות בהתאם לגודל הדירה ומורכבות הבעיה
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">מה משפיע על המחיר ב{city.name}?</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>גודל השטח המטופל (מספר חדרים)</span>
                </li>
                <li className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>רמת הנגיעות (כמות המזיקים)</span>
                </li>
                <li className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>שעת הקריאה (יום/לילה/סופ"ש)</span>
                </li>
                <li className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>סוג החומרים (הדברה ירוקה/כימית)</span>
                </li>
              </ul>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-6">קבלו הצעת מחיר מדויקת עכשיו</h3>
              <a 
                href="tel:0500000000" 
                className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-10 py-5 rounded-full text-2xl font-bold hover:bg-green-700 transition-all shadow-xl hover:scale-105"
              >
                <span>📞</span>
                <span>קבלו הצעת מחיר בטלפון</span>
              </a>
              <p className="mt-4 text-gray-500">זמינות מיידית ב{city.name} והסביבה</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
