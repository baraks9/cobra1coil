import { MetadataRoute } from 'next';
import { getServices, getCities, getProblems, getPests, getVenues } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.pest-control.co.il';

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
    '/pricing',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));

  const allCities = getCities();
  const allServices = getServices();
  const allProblems = getProblems();
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
        priority: getCityPriority(city, 0.7),
      });
    });
  });

  const problemRoutes: MetadataRoute.Sitemap = [];
  allProblems.forEach((problem) => {
    allCities.forEach((city) => {
      problemRoutes.push({
        url: `${baseUrl}/problem/${problem.slug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: getCityPriority(city, 0.6),
      });
    });
  });

  const priceRoutes: MetadataRoute.Sitemap = [];
  allServices.forEach((service) => {
    allCities.forEach((city) => {
      priceRoutes.push({
        url: `${baseUrl}/price/${service.slug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: getCityPriority(city, 0.5),
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
    ...problemRoutes,
    ...priceRoutes,
    ...pestRoutes,
    ...commercialRoutes,
  ];
}
