import Link from 'next/link';
import Image from 'next/image';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import { getServices, getCities } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import { routes } from '@/lib/routes';

export default function Home() {
  const services = getServices();
  const cities = getCities();

  return (
    <main className="min-h-screen bg-gray-50 pb-12" dir="rtl">
      <LocalBusinessSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": process.env.NEXT_PUBLIC_BUSINESS_NAME || "קוברה הדברה",
            "url": process.env.NEXT_PUBLIC_BASE_URL || "https://cobra1.co.il",
            "logo": process.env.NEXT_PUBLIC_LOGO_URL || `${process.env.NEXT_PUBLIC_BASE_URL || "https://cobra1.co.il"}/logo.png`,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": process.env.NEXT_PUBLIC_PHONE || "050-2138028",
              "contactType": "customer service",
              "areaServed": "IL",
              "availableLanguage": ["Hebrew", "English"]
            },
            "email": process.env.NEXT_PUBLIC_EMAIL || "office@cobra1.co.il",
            "sameAs": [
              process.env.NEXT_PUBLIC_FACEBOOK_URL,
              process.env.NEXT_PUBLIC_YOUTUBE_URL
            ].filter(Boolean) as string[]
          })
        }}
      />
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

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">אזורי שירות מרכזיים</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={routes.serviceCity('risus-labayit', city.slug)}
                className="bg-white px-6 py-3 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:text-blue-600 transition-all text-sm font-medium"
              >
                הדברה ב{city.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
