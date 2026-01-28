import {
  Service,
  City,
  Pest,
  getServices,
  getCities,
  getPests,
  getServiceBySlug,
  getServiceById,
  getCityBySlug,
  getPestBySlug,
  getPestsByServiceId,
} from '@/lib/data';
import { routes } from '@/lib/routes';

export interface InternalLink {
  href: string;
  label: string;
  description?: string;
  isPrimary?: boolean;
}

export interface InternalLinkSection {
  title: string;
  links: InternalLink[];
  variant?: 'default' | 'breadcrumbs' | 'compact' | 'grid';
}

/**
 * יצירת breadcrumbs לדף
 */
export function createBreadcrumbs(
  type: 'service' | 'serviceCity' | 'pest' | 'home',
  service?: Service,
  city?: City,
  pest?: Pest
): InternalLinkSection {
  const links: InternalLink[] = [
    { href: routes.home(), label: 'קוברה הדברה', isPrimary: true },
  ];

  if (type === 'service' && service) {
    links.push({ href: routes.service(service.slug), label: service.name });
  } else if (type === 'serviceCity' && service && city) {
    links.push({ href: routes.service(service.slug), label: service.name });
    links.push({
      href: routes.serviceCity(service.slug, city.slug),
      label: `${service.name} ב${city.name}`,
    });
  } else if (type === 'pest' && pest) {
    links.push({ href: routes.pestHub(), label: 'זיהוי מזיקים' });
    links.push({ href: routes.pest(pest.slug), label: pest.name });
  }

  return {
    title: 'ניווט',
    links,
    variant: 'breadcrumbs',
  };
}

/**
 * יצירת קישורים לשירותים קשורים
 */
export function getRelatedServices(
  currentService: Service,
  currentCity?: City,
  limit: number = 12
): InternalLinkSection {
  const allServices = getServices();
  const related = allServices
    .filter((s) => s.id !== currentService.id)
    .sort((a, b) => {
      // Prioritize same urgency category
      if (a.urgency === currentService.urgency && b.urgency !== currentService.urgency) return -1;
      if (a.urgency !== currentService.urgency && b.urgency === currentService.urgency) return 1;
      return 0;
    })
    .slice(0, limit)
    .map((service) => ({
      href: currentCity
        ? routes.serviceCity(service.slug, currentCity.slug)
        : routes.service(service.slug),
      label: service.name,
      description: service.description || `שירותי ${service.name} מקצועיים`,
      isPrimary: service.urgency === 'high' || service.urgency === 'critical',
    }));

  return {
    title: currentCity ? `שירותי הדברה נוספים ב${currentCity.name}` : 'שירותי הדברה נוספים',
    links: related,
    variant: 'grid',
  };
}

/**
 * יצירת קישורים לערים באותו אזור
 */
export function getNearbyCities(
  currentCity: City,
  currentService?: Service,
  limit: number = 24
): InternalLinkSection {
  const allCities = getCities();
  
  // 1. ערים באותו מחוז
  let nearby = allCities
    .filter((c) => c.district === currentCity.district && c.id !== currentCity.id);
    
  // 2. אם אין מספיק ערים במחוז, נוסיף ערים מובילות ממחוזות אחרים
  if (nearby.length < limit) {
    const otherCities = allCities
      .filter((c) => c.district !== currentCity.district && c.id !== currentCity.id)
      .sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0));
    
    nearby = [...nearby, ...otherCities];
  }

  const links = nearby
    .slice(0, limit)
    .map((city) => ({
      href: currentService
        ? routes.serviceCity(currentService.slug, city.slug)
        : routes.serviceCity('risus-labayit', city.slug),
      label: city.name,
      description: `הדברה ב${city.name}`,
      isPrimary: (city.priorityScore || 0) > 90,
    }));

  return {
    title: currentService ? `${currentService.name} בערים נוספות` : 'ערים נוספות באזור',
    links,
    variant: 'compact',
  };
}


/**
 * יצירת קישורים למזיקים קשורים
 */
export function getRelatedPests(
  currentService: Service,
  limit: number = 6
): InternalLinkSection {
  const relatedPests = getPestsByServiceId(currentService.id);
  const links = relatedPests.slice(0, limit).map((pest) => ({
    href: routes.pest(pest.slug),
    label: pest.name,
    description: pest.description,
    isPrimary: pest.urgency === 'high' || pest.urgency === 'critical',
  }));

  return {
    title: 'מזיקים קשורים',
    links,
    variant: 'grid',
  };
}

/**
 * יצירת קישורים לדפי Hub
 */
export function getHubLinks(): InternalLinkSection {
  return {
    title: 'עמודים מרכזיים',
    links: [
      {
        href: routes.home(),
        label: 'קוברה הדברה',
        description: 'כל שירותי ההדברה שלנו',
        isPrimary: true,
      },
      {
        href: routes.pestHub(),
        label: 'זיהוי מזיקים',
        description: 'מדריך מקיף לזיהוי מזיקים',
      },
    ],
    variant: 'default',
  };
}

/**
 * יצירת קישורים לפי קטגוריות שירותים
 */
export function getServiceCategoryLinks(
  currentService?: Service,
  limit: number = 8
): InternalLinkSection {
  const allServices = getServices();
  
  // קיבוץ לפי urgency
  const urgentServices = allServices
    .filter((s) => s.urgency === 'critical' || s.urgency === 'high')
    .filter((s) => !currentService || s.id !== currentService.id)
    .slice(0, limit);

  const links = urgentServices.map((service) => ({
    href: routes.service(service.slug),
    label: service.name,
    description: service.description || `שירותי ${service.name}`,
    isPrimary: service.urgency === 'critical',
  }));

  return {
    title: 'שירותי חירום',
    links,
    variant: 'grid',
  };
}

/**
 * יצירת מערכת קישורים מקיפה לדף
 */
export function createComprehensiveInternalLinks(
  type: 'serviceCity' | 'service' | 'pest',
  service?: Service,
  city?: City,
  pest?: Pest
): InternalLinkSection[] {
  const sections: InternalLinkSection[] = [];

  // Breadcrumbs
  sections.push(createBreadcrumbs(type, service, city, pest));

  if (type === 'serviceCity' && service && city) {
    // 1. שירותים נוספים באותה עיר (כמעט כל השירותים)
    sections.push(getRelatedServices(service, city, 14));
    
    // 2. אותם שירות בערים נוספות (הרבה ערים)
    sections.push(getNearbyCities(city, service, 20));
    
    // 3. מזיקים קשורים
    const relatedPests = getRelatedPests(service, 6);
    if (relatedPests.links.length > 0) {
      sections.push(relatedPests);
    }

    // 4. קישור לדף השירות הארצי (לחיזוק הסמכות של דף השירות)
    sections.push({
      title: 'מידע מקצועי נוסף',
      links: [{
        href: routes.service(service.slug),
        label: `מדריך מקצועי ל${service.name}`,
        description: `מחירון והמלצות על ${service.name} בפריסה ארצית`
      }],
      variant: 'default'
    });

    // 5. שירותי חירום (תמיד טוב לקישוריות)
    sections.push(getServiceCategoryLinks(service, 6));

  } else if (type === 'service' && service) {
    // דף שירות ראשי - צריך לקשר להרבה ערים עבור השירות הזה
    sections.push(getNearbyCities({ id: 'none', district: 'מרכז' } as City, service, 30));
    sections.push(getRelatedServices(service, undefined, 12));
    const relatedPests = getRelatedPests(service, 8);
    if (relatedPests.links.length > 0) {
      sections.push(relatedPests);
    }
  } else if (type === 'pest' && pest) {
    const pestService = getServiceById(pest.relatedServiceId);
    if (pestService) {
      sections.push(getRelatedServices(pestService, undefined, 8));
      // קישור לשירות בערים מרכזיות
      sections.push(getNearbyCities({ id: 'none', district: 'מרכז' } as City, pestService, 12));
    }
  }

  return sections;
}
