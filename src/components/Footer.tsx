import Link from 'next/link';
import { getServices, getCities, getPests, getVenues } from '@/lib/data';
import { routes } from '@/lib/routes';

export default function Footer() {
  const services = getServices();
  const allCities = getCities();
  const cities = allCities.slice(0, 12);
  const venues = getVenues();

  // Group cities by district for better organization
  const districts = Array.from(new Set(allCities.map(c => c.district)));

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 border-t border-gray-800" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🛡️</span>
            <span className="text-2xl font-bold text-white">הדברה מקצועית</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            שירותי הדברה מקצועיים בפריסה ארצית. מדבירים מוסמכים עם רישיון המשרד להגנת הסביבה. פתרונות מתקדמים לכל סוגי המזיקים, זמינות גבוהה ואחריות מלאה בכתב.
          </p>
          <div className="pt-4">
            <h4 className="text-white font-bold mb-4">זיהוי מזיקים</h4>
            <Link href={routes.pestHub()} className="text-sm bg-gray-800 hover:bg-blue-900 text-blue-400 px-4 py-2 rounded-lg transition-colors inline-block">
              למדריך המלא לזיהוי מזיקים
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6">שירותי הדברה נפוצים</h4>
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

        <div>
          <h4 className="text-white font-bold text-lg mb-6">הדברה לעסקים ומוסדות</h4>
          <ul className="space-y-3 text-sm">
            {venues.map((venue) => (
              <li key={venue.id}>
                <Link href={routes.commercial(venue.slug)} className="hover:text-blue-400 transition-colors">
                  הדברה ל{venue.name}
                </Link>
              </li>
            ))}
          </ul>
          <h4 className="text-white font-bold text-lg mt-8 mb-6">אזורי שירות מרכזיים</h4>
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

        <div>
          <h4 className="text-white font-bold text-lg mb-6">צור קשר</h4>
          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-3">
              <span className="bg-gray-800 p-2 rounded-lg">📍</span>
              <div>
                <p className="font-bold text-white">פריסה ארצית</p>
                <p className="text-gray-400">זמינות ב{districts.join(', ')}</p>
              </div>
            </li>
            <li className="flex items-center gap-3 group">
              <span className="bg-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">📞</span>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">התקשרו עכשיו:</span>
                <a 
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE?.replace(/-/g, '') || '0502138028'}`} 
                  className="text-xl font-black text-white hover:text-blue-400 tracking-wider"
                >
                  {process.env.NEXT_PUBLIC_PHONE || '050-2138028'}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-gray-800 p-2 rounded-lg">✉️</span>
              <a 
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'office@cobra1.co.il'}`} 
                className="hover:text-blue-400 transition-colors"
              >
                {process.env.NEXT_PUBLIC_EMAIL || 'office@cobra1.co.il'}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} הדברה מקצועית. כל הזכויות שמורות. הדברה באישור המשרד להגנת הסביבה (רישיון מס' 3042).</p>
        <div className="flex gap-6">
          <Link href="/about" className="hover:text-white transition-colors">אודות</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">מדיניות פרטיות</Link>
          <Link href="/terms" className="hover:text-white transition-colors">תנאי שימוש</Link>
        </div>
      </div>
    </footer>
  );
}
