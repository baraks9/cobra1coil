export const routes = {
  home: () => `/`,

  // Programmatic SEO templates
  service: (serviceSlug: string) => `/${serviceSlug}`,
  serviceCity: (serviceSlug: string, citySlug: string) => `/${serviceSlug}/${citySlug}`,
  pest: (pestSlug: string) => `/pest-id/${pestSlug}`,
  commercial: (venueSlug: string) => `/commercial/${venueSlug}`,

  // Hub pages
  pestHub: () => `/pest-id`,
} as const;

export type RouteBuilder = typeof routes;
