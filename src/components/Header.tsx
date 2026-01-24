import Link from 'next/link';
import { getServices } from '@/lib/data';

export default function Header() {
  const services = getServices().slice(0, 5);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span className="text-xl font-bold text-blue-900 hidden sm:block">הדברה מקצועית</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/${service.slug}`}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {service.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <a
              href="tel:0500000000"
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors"
            >
              התקשרו עכשיו
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
