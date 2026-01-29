import { Metadata } from 'next';
import Link from 'next/link';
import { getServices, getCities, getPests, getVenues } from '@/lib/data';
import { routes } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'מפת האתר | כל שירותי ההדברה ואזורי השירות',
  description: 'ריכוז כל שירותי ההדברה, אזורי השירות, מדריכי זיהוי מזיקים ופתרונות הדברה לעסקים של קוברה הדברה.',
};

export default function SitemapPage() {
  const services = getServices();
  const cities = getCities();
  const pests = getPests();
  const venues = getVenues();

  // Group cities by district for better organization
  const districts = Array.from(new Set(cities.map(c => c.district)));

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-black text-blue-900 mb-4 font-heebo">מפת האתר</h1>
          <p className="text-xl text-gray-600">כל מה שאתם מחפשים בתחום ההדברה במקום אחד</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* שירותי הדברה */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <span>🚿</span> שירותי הדברה
            </h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link 
                    href={routes.service(service.slug)}
                    className="text-gray-700 hover:text-blue-600 hover:underline transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* הדברה לעסקים */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <span>🏢</span> הדברה לעסקים ומוסדות
            </h2>
            <ul className="space-y-3">
              {venues.map((venue) => (
                <li key={venue.id}>
                  <Link 
                    href={routes.commercial(venue.slug)}
                    className="text-gray-700 hover:text-blue-600 hover:underline transition-colors"
                  >
                    הדברה ל{venue.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* זיהוי מזיקים */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <span>🔍</span> מדריך זיהוי מזיקים
            </h2>
            <ul className="grid grid-cols-2 gap-3">
              {pests.map((pest) => (
                <li key={pest.id}>
                  <Link 
                    href={routes.pest(pest.slug)}
                    className="text-gray-700 hover:text-blue-600 hover:underline transition-colors text-sm"
                  >
                    {pest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* אזורי שירות */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <span>📍</span> אזורי שירות (ערים מרכזיות)
            </h2>
            <div className="space-y-6">
              {districts.map((district) => (
                <div key={district}>
                  <h3 className="font-bold text-gray-900 mb-3 border-b pb-1 border-gray-100">
                    מחוז {district}
                  </h3>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {cities
                      .filter(c => c.district === district)
                      .map((city) => (
                        <li key={city.id}>
                          <Link 
                            href={routes.serviceCity('risus-labayit', city.slug)}
                            className="text-gray-600 hover:text-blue-600 text-sm"
                          >
                            {city.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* עמודים נוספים */}
        <section className="mt-12 text-center border-t pt-12 border-gray-200">
          <div className="flex flex-wrap justify-center gap-8 text-gray-500">
            <Link href="/" className="hover:text-blue-600">דף הבית</Link>
            <Link href="/about" className="hover:text-blue-600">אודות</Link>
            <Link href="/privacy" className="hover:text-blue-600">מדיניות פרטיות</Link>
            <Link href="/terms" className="hover:text-blue-600">תנאי שימוש</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
