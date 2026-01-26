import Link from 'next/link';
import Image from 'next/image';
import { Service } from '@/lib/data';

interface RelatedServicesProps {
  services: Service[];
  currentCitySlug?: string;
}

export default function RelatedServices({ services, currentCitySlug }: RelatedServicesProps) {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-4">שירותים קשורים</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <Link
            key={service.id}
            href={currentCitySlug ? `/${service.slug}/${currentCitySlug}` : `/${service.slug}`}
            className="flex items-center p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group overflow-hidden"
          >
            {service.url ? (
              <div className="relative w-16 h-16 mr-3 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image 
                  src={service.url} 
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <span className="text-2xl mr-3">{service.icon}</span>
            )}
            <span className="font-medium group-hover:text-blue-700">{service.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
