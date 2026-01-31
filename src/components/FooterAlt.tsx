import Link from 'next/link';
import { getServices, getCities, getVenues } from '@/lib/data';
import { routes } from '@/lib/routes';

export default function FooterAlt() {
  const services = getServices();
  const allCities = getCities();
  const cities = allCities.slice(0, 12);
  const venues = getVenues();

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 border-t border-gray-800" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="space-y-6">
          <h4 className="text-white font-bold text-lg">שירותי הדברה נפוצים</h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link href={routes.service(service.slug)} className="hover:text-blue-400 transition-colors">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold text-lg">הדברה לעסקים ומוסדות</h4>
          <ul className="space-y-3 text-sm">
            {venues.map((venue) => (
              <li key={venue.id}>
                <Link href={routes.commercial(venue.slug)} className="hover:text-blue-400 transition-colors">
                  הדברה ל{venue.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold text-lg">אזורי שירות מרכזיים</h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {cities.map((city) => (
              <li key={city.id}>
                <Link href={routes.serviceCity('risus-labayit', city.slug)} className="hover:text-blue-400 transition-colors">
                  הדברה ב{city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold text-lg">זיהוי מזיקים</h4>
          <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
            <p className="text-sm text-gray-300 mb-4">
              מדריך מלא לזיהוי מזיקים נפוצים עם תמונות והסברים.
            </p>
            <Link
              href={routes.pestHub()}
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors inline-block"
            >
              למדריך המלא
            </Link>
          </div>
        </div>

        <div>
          <div className="grid grid-rows-4 gap-4 text-sm min-h-[260px]">
            <div className="flex items-center">
              <h4 className="text-white font-bold text-lg">צור קשר</h4>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-gray-800 p-2 rounded-lg">📍</span>
              <div>
                <p className="font-bold text-white">פריסה ארצית</p>
                <p className="text-gray-400">זמינות במרכז, דרום, שפלה, בקעת אונו, שרון</p>
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <span className="bg-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">📞</span>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">התקשרו עכשיו:</span>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE?.replace(/-/g, '') || '0502138028'}`}
                  className="text-lg font-black text-white hover:text-blue-400 tracking-wider"
                >
                  {process.env.NEXT_PUBLIC_PHONE || '050-2138028'}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-gray-800 p-2 rounded-lg">✉️</span>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'office@cobra1.co.il'}`}
                className="hover:text-blue-400 transition-colors"
              >
                {process.env.NEXT_PUBLIC_EMAIL || 'office@cobra1.co.il'}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} קוברה הדברה. כל הזכויות שמורות. הדברה באישור המשרד להגנת הסביבה (
          <a
            href="https://www.gov.il/he/departments/dynamiccollectors/madbirim?skip=0&LicenseNumber=3042"
            className="hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            רישיון מס' 3042
          </a>
          ).
        </p>
        <div className="flex gap-6">
          <Link href="/about" className="hover:text-white transition-colors">אודות</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">מדיניות פרטיות</Link>
          <Link href="/terms" className="hover:text-white transition-colors">תנאי שימוש</Link>
          <Link href="/accessibility" className="hover:text-white transition-colors">הצהרת נגישות</Link>
          <Link href="/site-map" className="hover:text-white transition-colors">מפת האתר</Link>
        </div>
      </div>
    </footer>
  );
}
