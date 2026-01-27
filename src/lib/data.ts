import services from '@/data/services.json';
import cities from '@/data/cities.json';
import problems from '@/data/problems.json';
import pests from '@/data/pests.json';
import venues from '@/data/venues.json';

export interface Service {
  id: string;
  slug: string;
  name: string;
  avgPrice: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  icon: string;
  wikidata?: string;
  description?: string;
  source?: number;
  url?: string;
  warranty?: string;
  safety?: string;
  duration?: string;
  preparation?: string[];
}

export interface City {
  id: string;
  slug: string;
  name: string;
  district: string;
  tier?: number;
  priorityScore?: number;
  injectionPhrase?: string;
  conversionRate?: number;
  lat?: number;
  lng?: number;
  arrivalTime?: string;
  neighborhoods?: string[];
  completedJobs?: number;
  wikidata?: string;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  serviceId: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  injectionPhrase: string;
  url?: string;
  source?: number;
}

export interface Pest {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  identificationSigns: string;
  relatedServiceId: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  imageUrl: string;
  dataInsight?: string;
  dangerLevel?: number;
  seasonality?: string[];
  preventionTips?: string[];
  wikidata?: string;
}

export interface Venue {
  id: string;
  slug: string;
  name: string;
  focus: string[];
  description: string;
  features: string[];
}

export function getServices(): Service[] {
  return services as Service[];
}

export function getCities(): City[] {
  return cities as City[];
}

export function getProblems(): Problem[] {
  return problems as Problem[];
}

export function getPests(): Pest[] {
  return pests as Pest[];
}

export function getVenues(): Venue[] {
  return venues as Venue[];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return (services as Service[]).find((s) => s.slug === slug);
}

export function getServiceById(id: string): Service | undefined {
  return (services as Service[]).find((s) => s.id === id);
}

export function getCityBySlug(slug: string): City | undefined {
  return (cities as City[]).find((c) => c.slug === slug);
}

export function getProblemBySlug(slug: string): Problem | undefined {
  return (problems as Problem[]).find((p) => p.slug === slug);
}

export function getPestBySlug(slug: string): Pest | undefined {
  return (pests as Pest[]).find((p) => p.slug === slug);
}

export function getPestsByServiceId(serviceId: string): Pest[] {
  return (pests as Pest[]).filter((p) => p.relatedServiceId === serviceId);
}

export function getRotationSuffix(cityName: string): string {
  const titleSuffixes = [
    " | המלצות ומחירים הוגנים",        // Intent: Social Proof + Price
    " | זמינות 24/7 (הגעה מיידית)",   // Intent: Urgency
    " | מדביר מוסמך עם רישיון",       // Intent: Trust/Authority
    " | 100% אחריות על העבודה",       // Intent: Guarantee
    " | קוברה הדברות (מחיר משתלם)"    // Intent: Brand + Price
  ];
  return titleSuffixes[cityName.length % titleSuffixes.length];
}

export function getDeterministicSuffix(cityName: string, serviceId: string): string {
  const suffixes = {
    urgent: [ // For rodents, wasps, fleas
      " - הגעה תוך 30 דקות",
      " | זמינות מעכשיו לעכשיו",
      " - שירות חירום 24/7",
      " (לכידה במקום)"
    ],
    safety: [ // For ants, roaches, general spray
      " - ללא ריח ובטוח לילדים",
      " - כניסה מידית לבית",
      " | הדברה ירוקה ומאושרת",
      " (חומרים טבעיים בלבד)"
    ],
    trust: [ // For termites, bed bugs (expensive services)
      " - אחריות מלאה בכתב",
      " | מדביר מוסמך עם רישיון",
      " - התחייבות לתוצאות",
      " (טיפול יסודי)"
    ]
  };

  let selectedCategorySuffixes: string[];
  
  // Logic to select category based on serviceId
  if (['wasps', 'rodents', 'rat-catcher', 'mice-control', 'fleas'].includes(serviceId)) {
    selectedCategorySuffixes = suffixes.urgent;
  } else if (['termites', 'bed-bugs'].includes(serviceId)) {
    selectedCategorySuffixes = suffixes.trust;
  } else {
    selectedCategorySuffixes = suffixes.safety;
  }

  const suffixIndex = cityName.length % selectedCategorySuffixes.length;
  return selectedCategorySuffixes[suffixIndex];
}

export function getRandomSuffix(urgencyLevel: 'critical' | 'high' | 'medium' | 'low'): string {
  const suffixes = {
    critical: [' - הגעה תוך 30 דקות', ' | זמינות מעכשיו לעכשיו'],
    high: [' - הגעה תוך 30 דקות', ' | זמינות מעכשיו לעכשיו', ' - מדביר מורשה'],
    medium: [' - מדביר מורשה', ' (מחיר הוגן)', ' | אחריות מלאה'],
    low: [' - מדביר מורשה', ' (מחיר הוגן)', ' | אחריות מלאה']
  };

  const options = suffixes[urgencyLevel] || suffixes.medium;
  return options[Math.floor(Math.random() * options.length)];
}

export function getWhyChooseUsTitle(service: Service): string {
  // Logic for dynamic title based on service
  if (service.id === 'rat-catcher' || service.id === 'mouse-catcher' || service.id === 'rodents') {
    return `למה להזמין לוכד ${service.name.replace('לוכד ', '')} מאיתנו?`;
  }
  if (service.id === 'bed-bugs') {
    return `יתרונות הטיפול שלנו בפשפש המיטה`;
  }
  if (service.id === 'termites') {
    return `למה לבחור במומחים שלנו להדברת טרמיטים?`;
  }
  if (service.id === 'home-spraying') {
    return `למה להזמין ריסוס לבית מאיתנו?`;
  }
  if (service.id === 'wasps') {
    return `למה להזמין הדברת צרעות מאיתנו?`;
  }
  
  // Default fallback that's still better than the static one
  if (service.name.includes('הדברת')) {
    return `למה לבחור בנו ל${service.name}?`;
  }
  return `למה לבחור בנו לשירותי ${service.name}?`;
}

export function getVenueBySlug(slug: string): Venue | undefined {
  return (venues as Venue[]).find((v) => v.slug === slug);
}
