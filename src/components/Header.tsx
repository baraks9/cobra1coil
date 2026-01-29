import Link from 'next/link';
import { getServices } from '@/lib/data';
import Image from 'next/image';

export default function Header() {
  const services = getServices().slice(0, 5);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="קוברה הדברה"
                width={160}
                height={60}
                className="h-14 w-auto"
                priority
              />
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center justify-center gap-8 px-4">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/${service.slug}`}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors whitespace-nowrap"
              >
                {service.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE?.replace(/-/g, '') || '0502138028'}`}
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
