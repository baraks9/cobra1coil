export const routes = {
  home: () => `/`,
  pricing: () => `/pricing`,

  // Programmatic SEO templates
  service: (serviceSlug: string) => `/${serviceSlug}`,
  serviceCity: (serviceSlug: string, citySlug: string) => `/${serviceSlug}/${citySlug}`,
  problemCity: (problemSlug: string, citySlug: string) => `/problem/${problemSlug}/${citySlug}`,
  priceCity: (serviceSlug: string, citySlug: string) => `/price/${serviceSlug}/${citySlug}`,
  pest: (pestSlug: string) => `/pest-id/${pestSlug}`,
  commercial: (venueSlug: string) => `/commercial/${venueSlug}`,

  // Hub pages
  pestHub: () => `/pest-id`,
  problemHub: () => `/problem`,
} as const;

export type RouteBuilder = typeof routes;
