import Link from 'next/link';
import { City, Service } from '@/lib/data';

interface NearbyCitiesProps {
  currentServiceSlug: string;
  cities: City[];
}

export default function NearbyCities({ currentServiceSlug, cities }: NearbyCitiesProps) {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-4">ערים נוספות באזור</h3>
      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <Link
            key={city.id}
            href={`/${currentServiceSlug}/${city.slug}`}
            className="bg-gray-100 hover:bg-blue-100 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            {city.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
