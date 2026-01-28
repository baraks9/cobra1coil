import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLdManager from '@/components/JsonLdManager';
import { getServices, getCities } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import { routes } from '@/lib/routes';
import ReviewsSection from '@/components/ReviewsSection';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const services = getServices();
  const cities = getCities();

  // Smart logic to distribute services across cities for better internal linking
  const getSmartServiceForCity = (index: number) => {
    // We exclude very specific services to keep links relevant
    const generalServices = services.filter(s => 
      !['commercial', 'emergency'].includes(s.id)
    );
    return generalServices[index % generalServices.length];
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-12" dir="rtl">
      <JsonLdManager type="home" />
      <HeroSection serviceName="הדברה מקצועית" />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">השירותים שלנו</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={routes.service(service.slug)}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-500 transition-all text-center group overflow-hidden"
              >
                {service.url ? (
                  <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform">
                    <Image 
                      src={service.url} 
                      alt={service.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                <p className="text-gray-500 mt-2">החל מ-{service.avgPrice.split('-')[0]} ₪</p>
              </Link>
            ))}
          </div>
        </section>

        <ReviewsSection />

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">שירותי הדברה נפוצים בערים</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.slice(0, 60).map((city, index) => {
              const smartService = getSmartServiceForCity(index);
              return (
                <Link
                  key={`${city.id}-${smartService.id}`}
                  href={routes.serviceCity(smartService.slug, city.slug)}
                  className="bg-white px-5 py-2.5 rounded-full shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-400 hover:text-blue-600 transition-all text-sm font-medium"
                >
                  {smartService.name} ב{city.name}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
