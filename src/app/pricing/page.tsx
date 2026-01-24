import { Metadata } from 'next';
import { getServices } from '@/lib/data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'מחירון הדברה מומלץ לצרכן 2024 | שקיפות מלאה',
  description: 'מחירון הדברה מעודכן לשנת 2024. כמה עולה הדברה? כל המחירים לכל סוגי המזיקים במקום אחד.',
};

export default function PricingPage() {
  const services = getServices();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">מחירון הדברה מומלץ לצרכן 2024</h1>
          <p className="text-xl text-gray-600">שקיפות מלאה במחירים - ללא הפתעות בשטח</p>
        </header>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="px-6 py-4 text-lg font-bold">סוג השירות</th>
                  <th className="px-6 py-4 text-lg font-bold">תיאור השירות</th>
                  <th className="px-6 py-4 text-lg font-bold">מחיר משוער</th>
                  <th className="px-6 py-4 text-lg font-bold text-center">פעולה</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr 
                    key={service.id} 
                    className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.icon}</span>
                        <span className="font-bold text-blue-900">{service.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-gray-600 max-w-md">
                      {service.description || `הדברה מקצועית ל${service.name} עם אחריות מלאה.`}
                    </td>
                    <td className="px-6 py-6">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">
                        {service.avgPrice} ₪
                      </span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <Link 
                        href={`/${service.slug}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors inline-block"
                      >
                        פרטים והזמנה
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <section className="mt-12 bg-blue-50 p-8 rounded-2xl border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">חשוב לדעת על מחירי הדברה</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>המחירים כוללים מע"מ אלא אם צוין אחרת.</li>
            <li>המחיר הסופי עשוי להשתנות בהתאם לגודל השטח ומורכבות הבעיה.</li>
            <li>כל ההדברות מבוצעות על ידי מדבירים מוסמכים עם רישיון מהמשרד להגנת הסביבה.</li>
            <li>ניתנת אחריות בכתב על כל עבודה.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
