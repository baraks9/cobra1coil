import Link from 'next/link';
import { getServices, getCities } from '@/lib/data';

export default function Footer() {
  const services = getServices();
  const cities = getCities().slice(0, 8);

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🛡️</span>
            <span className="text-2xl font-bold text-white">הדברה מקצועית</span>
          </div>
          <p className="text-sm leading-relaxed">
            שירותי הדברה מקצועיים בפריסה ארצית. מדבירים מוסמכים עם רישיון המשרד להגנת הסביבה. פתרונות מתקדמים לכל סוגי המזיקים.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6">השירותים שלנו</h4>
          <ul className="space-y-3 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link href={`/${service.slug}`} className="hover:text-blue-400 transition-colors">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6">אזורי שירות</h4>
          <ul className="space-y-3 text-sm">
            {cities.map((city) => (
              <li key={city.id}>
                <Link href={`/risus-labayit/${city.slug}`} className="hover:text-blue-400 transition-colors">
                  הדברה ב{city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6">צור קשר</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span>📍</span>
              <span>פריסה ארצית - הגעה מהירה</span>
            </li>
            <li className="flex items-center gap-3 font-bold text-white text-lg">
              <span>📞</span>
              <a href="tel:0500000000" className="hover:text-blue-400">050-000-0000</a>
            </li>
            <li className="flex items-center gap-3">
              <span>✉️</span>
              <span>contact@example.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-sm">
        <p>© {new Date().getFullYear()} הדברה מקצועית. כל הזכויות שמורות. הדברה באישור המשרד להגנת הסביבה.</p>
      </div>
    </footer>
  );
}
