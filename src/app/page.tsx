import Link from 'next/link';
import { getServices, getCities } from '@/lib/data';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  const services = getServices();
  const cities = getCities();

  return (
    <main className="min-h-screen bg-gray-50 pb-12" dir="rtl">
      <HeroSection serviceName="הדברה מקצועית" />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">השירותים שלנו</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/${service.slug}`}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-500 transition-all text-center group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                <p className="text-gray-500 mt-2">החל מ-{service.avgPrice.split('-')[0]} ₪</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">אזורי שירות מרכזיים</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={`/risus-labayit/${city.slug}`}
                className="bg-white px-6 py-3 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:text-blue-600 transition-all"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
