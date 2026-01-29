'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { Service } from '@/lib/data';

interface RelatedServicesProps {
  services: Service[];
  currentCitySlug?: string;
}

export default function RelatedServices({ services, currentCitySlug }: RelatedServicesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -184, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 184, behavior: 'smooth' });
    }
  };


  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-blue-900 mb-4">שירותים קשורים</h3>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors border border-gray-200"
          aria-label="גלול שמאלה"
        >
          ‹
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors border border-gray-200"
          aria-label="גלול ימינה"
        >
          ›
        </button>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide pl-12 pr-12">
          {services.map((service) => (
            <Link
              key={service.id}
              href={currentCitySlug ? `/${service.slug}/${currentCitySlug}` : `/${service.slug}`}
              className="flex flex-col items-center p-3 border border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group overflow-hidden flex-shrink-0 w-40 h-52 shadow-sm"
            >
            {service.url ? (
              <div className="relative w-28 h-28 mb-3 rounded-lg overflow-hidden bg-blue-50 flex-shrink-0">
                <Image
                  src={service.url}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-28 h-28 mb-3 flex items-center justify-center bg-blue-50 rounded-lg">
                <span className="text-4xl">{service.icon}</span>
              </div>
            )}
            <span className="font-medium group-hover:text-blue-800 text-center text-sm leading-tight text-truncate-2">
              {service.name}
            </span>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}
