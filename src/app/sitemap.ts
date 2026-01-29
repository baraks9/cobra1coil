import { MetadataRoute } from 'next';
import { getServices, getCities, getPests, getVenues } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cobra1.co.il';

  const getCityPriority = (city: any, basePriority: number) => {
    if (city.conversionRate && city.conversionRate > 0.4) {
      return Math.min(basePriority + 0.2, 1.0);
    }
    if (city.priorityScore && city.priorityScore > 90) {
      return Math.min(basePriority + 0.1, 1.0);
    }
    return basePriority;
  };

  const staticRoutes = [
    '',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));

  const allCities = getCities();
  const allServices = getServices();
  const allPests = getPests();
  const allVenues = getVenues();

  const serviceRoutes = allServices.map((service) => ({
    url: `${baseUrl}/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = [];
  allServices.forEach((service) => {
    allCities.forEach((city) => {
      cityRoutes.push({
        url: `${baseUrl}/${service.slug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: getCityPriority(city, 0.6),
      });
    });
  });

  const pestRoutes = allPests.map((pest) => ({
    url: `${baseUrl}/pest-id/${pest.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const commercialRoutes = allVenues.map((venue) => ({
    url: `${baseUrl}/commercial/${venue.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...cityRoutes,
    ...pestRoutes,
    ...commercialRoutes,
  ];
}
