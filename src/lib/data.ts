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
  title: string;
  serviceId: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  injectionPhrase: string;
  imageUrl?: string;
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
  h1Title?: string;
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

export function getPestBySlug(slug: string): Pest | undefined {
  return (pests as Pest[]).find((p) => p.slug === slug);
}

export function getPestsByServiceId(serviceId: string): Pest[] {
  return (pests as Pest[]).filter((p) => p.relatedServiceId === serviceId);
}

export function getRotationSuffix(cityName: string): string {
  const titleSuffixes = [
    " - הגעה מהירה",
    " | זמינות גבוהה",
    " | מדביר מוסמך",
    " עם אחריות מלאה",
    " - שירות מקצועי",
    " במחיר הוגן",
    " | פתרון סופי",
    " - ייעוץ חינם",
    " | שירות אדיב ומקצועי",
    " - מומחים להדברה",
    " | זמינות מיידית",
    " - מחירים נוחים"
  ];
  return titleSuffixes[cityName.length % titleSuffixes.length];
}

export function getDeterministicSuffix(cityName: string, serviceId: string): string {
  const suffixes = {
    urgent: [ // For rodents, wasps, fleas
      " - הגעה מהירה",
      " | זמינות גבוהה",
      " - שירות דחוף 24/7",
      " (טיפול מיידי)",
      " - פתרון מקצועי",
      " | מדביר זמין",
      " - מענה מהיר",
      " (שירות אקספרס)",
      " | הגעה תוך שעה",
      " - לוכד מוסמך זמין",
      " | טיפול דחוף",
      " - זמינות עכשיו"
    ],
    safety: [ // For ants, roaches, general spray
      " - הדברה ירוקה ובטוחה",
      " - כניסה מהירה לבית",
      " | חומרים מאושרים",
      " (בטוח לילדים)",
      " - בטיחות למשפחה",
      " | הדברה מאושרת",
      " - חזרה מהירה לשגרה",
      " (ידידותי לסביבה)",
      " | ללא ריח לוואי",
      " - בטוח לחיות מחמד",
      " | חומרים ירוקים",
      " - הדברה ללא סיכון"
    ],
    trust: [ // For termites, bed bugs (expensive services)
      " - אחריות מלאה בכתב",
      " | מדביר מוסמך",
      " - התחייבות לתוצאות",
      " (טיפול יסודי)",
      " - ליווי עד לפתרון",
      " | מומחה מוסמך",
      " - בדיקה וייעוץ",
      " (אחריות ארוכת טווח)",
      " | שירות מקצועי ואמין",
      " - מומחיות מוכחת",
      " | פתרון סופי לבעיה",
      " - אחריות מורחבת"
    ]
  };

  let selectedCategorySuffixes: string[];
  
  // Logic to select category based on serviceId
  if (['wasps', 'rodents', 'rat-catcher', 'mice-control', 'fleas', 'corpse-removal'].includes(serviceId)) {
    selectedCategorySuffixes = suffixes.urgent;
  } else if (['termites', 'bed-bugs', 'psocids'].includes(serviceId)) {
    selectedCategorySuffixes = suffixes.trust;
  } else {
    selectedCategorySuffixes = suffixes.safety;
  }

  const suffixIndex = (cityName.length + serviceId.length) % selectedCategorySuffixes.length;
  return selectedCategorySuffixes[suffixIndex];
}

export function getRandomSuffix(urgencyLevel: 'critical' | 'high' | 'medium' | 'low'): string {
  const suffixes = {
    critical: [' - מחירון מעודכן ומדריך מקצועי', ' | מידע על הדברה בפריסה ארצית'],
    high: [' - כל מה שצריך לדעת', ' | מחירון, המלצות ושיטות טיפול'],
    medium: [' - מדריך מקצועי והמלצות', ' (מחירון ושירות ארצי)', ' | מידע מקיף'],
    low: [' - מדריך מקצועי והמלצות', ' (מחירון ושירות ארצי)', ' | מידע מקיף']
  };

  const options = suffixes[urgencyLevel] || suffixes.medium;
  return options[Math.floor(Math.random() * options.length)];
}

export function getWhyChooseUsTitle(service: Service, cityName?: string): string {
  // If cityName is provided, we use a more varied set of titles for city pages
  if (cityName) {
    const variations = [
      `למה להזמין ${service.name} ב${cityName} מאיתנו?`,
      `יתרונות הטיפול המקצועי שלנו ב${cityName}`,
      `שירותי ${service.name} ב${cityName} - למה לבחור בנו?`,
      `המומחיות שלנו ב${service.name} באזור ${cityName}`,
      `מה הופך אותנו למובילים ב${service.name} ב${cityName}?`,
      `הדברה בטוחה ומקצועית: ${service.name} ב${cityName}`,
      `מדביר מוסמך ל${service.name} ב${cityName} והסביבה`,
      `כל הסיבות לבחור בנו ל${service.name} ב${cityName}`,
      `מחפשים ${service.name} ב${cityName}? הנה הסיבות לבחור בנו`,
      `הסטנדרט שלנו ב${service.name} ב${cityName}`,
      `שירות ${service.name} ללא פשרות ב${cityName}`,
      `מדוע תושבי ${cityName} בוחרים בנו ל${service.name}?`
    ];
    
    // Deterministic selection based on city name and service id
    const index = (cityName.length + service.id.length) % variations.length;
    return variations[index];
  }

  // Fallback for national service pages
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

export function getVariedHook(service: Service, city: City): string {
  const openers = [
    `סובלים מ${service.name} ב${city.name}?`,
    `מחפשים פתרון בטוח ויעיל ל${service.name} ב${city.name}?`,
    `אל תתנו ל${service.name} להרוס לכם את השלווה ב${city.name}.`,
    `צריכים ${service.name} ב${city.name} עכשיו?`,
    `זיהיתם ${service.name} בבית ב${city.name}?`,
    `הדברה מקצועית ומהירה ב${city.name}:`
  ];

  const middle = [
    `המדבירים שלנו כבר בדרך אליכם.`,
    `אתם במקום הנכון.`,
    `אנחנו כאן כדי לעזור.`,
    `צוות המומחים שלנו זמין לקריאה.`,
    `אל תחכו שהבעיה תחמיר.`,
    `שירות אישי לכל תושבי ${city.neighborhoods?.[0] || city.name}.`
  ];

  const closers = [
    `פתרון סופי לבעיית ה${service.name} ב${city.name} - באחריות מלאה.`,
    `מומחי ההדברה שלנו ב${city.name} מצוידים בחומרים המתקדמים ביותר.`,
    `השקט שלכם ב${city.name} חשוב לנו. טיפול מקצועי מתחיל כאן.`,
    `שירותי ${service.name} ב${city.name} עם דגש על בטיחות הילדים.`,
    `אנו מבטיחים 100% הצלחה בכל עבודת הדברה ב${city.name}.`,
    `התקשרו עכשיו לייעוץ מקצועי ללא התחייבות.`
  ];

  const hash = city.name.length + service.id.length;
  const oIdx = hash % openers.length;
  const mIdx = (hash + 1) % middle.length;
  const cIdx = (hash + 2) % closers.length;

  return `${openers[oIdx]} ${middle[mIdx]} ${closers[cIdx]}`;
}

export function getVariedDescription(service: Service, city: City, isEmergency: boolean): string {
  const districtInfo = {
    'מרכז': `באזור גוש דן והמרכז, צפיפות המבנים דורשת מיומנות מיוחדת.`,
    'דרום': `האקלים החם בדרום הארץ מעודד התרבות מהירה של מזיקים.`,
    'צפון': `הצמחייה העשירה באזור הצפון מביאה איתה אתגרים ייחודיים.`,
    'ירושלים': `הבנייה הירושלמית העתיקה דורשת פתרונות איטום והדברה ספציפיים.`
  }[city.district] || '';

  const variations = isEmergency ? [
    `זקוקים ל${service.name} ב${city.name} עכשיו? אנחנו מבינים את הדחיפות. ${districtInfo} צוותי החירום שלנו פרוסים ב${city.name} וזמינים להגעה תוך זמן קצר לכל שכונה, כולל ${city.neighborhoods?.[0] || 'מרכז העיר'}.`,
    `מצב חירום של ${service.name} ב${city.name}? אל תחכו. המדבירים המוסמכים שלנו זמינים 24/7 ב${city.name} והסביבה עם ציוד מקצועי ופתרון מהיר במקום. ${districtInfo}`,
    `צריכים ${service.name} דחוף ב${city.name}? אנו מספקים מענה מיידי לתושבי מחוז ${city.district}, עם דגש על בטיחות ומהירות ללא פשרות ב${city.name}. ${city.neighborhoods?.[1] ? `אנו מגיעים גם ל${city.neighborhoods[1]} ולכל האזור.` : ''}`,
    `קריאת חירום ל${service.name} ב${city.name}: אנו מגיעים במהירות לכל נקודה ב${city.name} כדי לפתור את הבעיה באופן מיידי ומקצועי. ${districtInfo}`,
    `טיפול דחוף ב${service.name} ב${city.name} - צוות המדבירים שלנו ב${city.name} ערוך למתן מענה מהיר בכל שעה. ${city.neighborhoods?.[0] ? `שירות מהיר במיוחד באזור ${city.neighborhoods[0]}.` : ''}`
  ] : [
    `זקוקים ל${service.name} ב${city.name}? אתם במקום הנכון. אנו מספקים שירותי הדברה מתקדמים ומקצועיים במחוז ${city.district}, עם דגש על בטיחות ויעילות. ${districtInfo} הצוות שלנו מכיר היטב את ${city.name} ויודע לתת מענה מדויק לכל בעיה.`,
    `הדברה ירוקה ובטוחה ל${service.name} ב${city.name}. אנו משרתים את כל תושבי ${city.name}, משכונת ${city.neighborhoods?.[0] || 'המרכז'} ועד ${city.neighborhoods?.[1] || 'הקצוות'}, עם אחריות מלאה וליווי מקצועי. ${districtInfo}`,
    `מחפשים מדביר מוסמך ל${service.name} ב${city.name}? אנו מציעים פתרונות הדברה מותאמים אישית לצרכים שלכם ב${city.name}, תוך שימוש בחומרים המאושרים על ידי המשרד להגנת הסביבה. ${districtInfo}`,
    `שירותי ${service.name} ב${city.name} ניתנים על ידי צוות מיומן המכיר את סוגי המבנים והמזיקים האופייניים לאזור ${city.name}. ${city.neighborhoods?.[0] ? `אנו פועלים רבות ב${city.neighborhoods[0]} ובכל העיר.` : ''} אנו מתחייבים לתוצאות מעולות.`,
    `כשמדובר ב${service.name} ב${city.name}, חשוב לבחור במומחים שמכירים את השטח. אנו פועלים ב${city.name} שנים רבות ומספקים שירות אמין לכלל התושבים. ${districtInfo}`
  ];
  const index = (city.name.length + service.slug.length) % variations.length;
  return variations[index];
}

export function getVariedWhyChooseUs(service: Service, city: City): string {
  const localContext = city.neighborhoods?.length 
    ? `כחברה שפועלת רבות ב${city.name} ובשכונות כמו ${city.neighborhoods.slice(0, 2).join(' ו')}, אנו מכירים את סוגי המבנים והאתגרים המקומיים.`
    : `אנו מכירים היטב את אזור ${city.name} ואת סוגי המזיקים האופייניים למחוז ${city.district}.`;

  const variations = [
    `אנו מבינים שנוכחות של ${service.name} בבית או בעסק ב${city.name} יכולה להיות מטרידה מאוד. ${localContext} לכן, אנו מציעים שירות מהיר, דיסקרטי ומקצועי המותאם בדיוק לאופי המבנים ב${city.name}.`,
    `המומחיות שלנו ב${service.name} מאפשרת לנו לתת פתרון ארוך טווח ב${city.name}. אנו משלבים ידע מקצועי רב עם היכרות עמוקה של אזור ${city.district}, מה שמבטיח לכם שקט נפשי. ${localContext}`,
    `כשאתם בוחרים בנו ל${service.name} ב${city.name}, אתם מקבלים יותר מהדברה - אתם מקבלים ליווי מלא, ייעוץ למניעה עתידית ואחריות בכתב על כל עבודה שבוצעה ב${city.name}. ${localContext}`,
    `בטיחות היא הערך העליון שלנו. בכל עבודת ${service.name} ב${city.name}, אנו מקפידים על שימוש בחומרים בטוחים למשפחה ולחיות מחמד, תוך שמירה על סטנדרטים גבוהים של מקצועיות. ${localContext}`,
    `${localContext} הניסיון שלנו ב${city.name} מלמד אותנו שכל מקרה של ${service.name} הוא ייחודי. לכן אנו מבצעים אבחון מדויק לפני תחילת העבודה ב${city.name} כדי להבטיח את הצלחת הטיפול.`,
    `תושבי ${city.name} יודעים שעל איכות לא מתפשרים. אנו גאים לספק שירותי ${service.name} ב${city.name} ברמה הגבוהה ביותר, עם אלפי לקוחות מרוצים במחוז ${city.district}. ${localContext}`
  ];
  const index = (city.completedJobs || 7 + service.name.length) % variations.length;
  return variations[index];
}

export function getStructuralShuffle(cityId: string): ('pricing' | 'faq' | 'pests' | 'content')[] {
  const baseOrder: ('pricing' | 'faq' | 'pests' | 'content')[] = ['content', 'pests', 'pricing', 'faq'];
  const hash = cityId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  if (hash % 4 === 0) return ['content', 'pricing', 'faq', 'pests'];
  if (hash % 4 === 1) return ['pests', 'content', 'faq', 'pricing'];
  if (hash % 4 === 2) return ['pricing', 'content', 'pests', 'faq'];
  return baseOrder;
}

export function getVariedBulletPoints(serviceId: string, cityName: string): string[] {
  const base = [
    "מדבירים מוסמכים עם רישיון בתוקף",
    "שימוש בחומרי הדברה ירוקים ובטוחים",
    "אחריות מלאה על כל עבודה"
  ];
  
  const variations: Record<string, string[]> = {
    'urgent': [
      `הגעה מהירה לכל כתובת ב${cityName}`,
      "צוותי כוננות לטיפול מיידי",
      "זמינות 24/7 לכל קריאה דחופה",
      "מענה טלפוני אנושי מסביב לשעון"
    ],
    'trust': [
      "אחריות מורחבת בכתב לטווח ארוך",
      "ליווי מקצועי עד לפתרון המלא",
      "שימוש בטכנולוגיות ניטור מתקדמות",
      "ייעוץ מקצועי למניעה עתידית"
    ]
  };

  let selected: string[];
  if (['wasps', 'rodents', 'fleas', 'corpse-removal'].includes(serviceId)) {
    selected = variations.urgent;
  } else if (['termites', 'bed-bugs'].includes(serviceId)) {
    selected = variations.trust;
  } else {
    selected = [
      "חזרה לשגרה תוך שעה בלבד",
      "ללא ריח לוואי - בטוח לילדים",
      `ניסיון עשיר באזור ${cityName}`,
      "מחירים הוגנים ושקיפות מלאה"
    ];
  }

  // Shuffle or mix
  const mixIndex = cityName.length % selected.length;
  return [...base.slice(0, 2), selected[mixIndex], selected[(mixIndex + 1) % selected.length]];
}

export function getVariedProblemsTitle(serviceId: string, cityName: string): string {
  const service = getServiceById(serviceId);
  const name = service ? service.name : serviceId;
  
  const variations = [
    `בעיות ${name} נפוצות ב${cityName}`,
    `למה יש הרבה ${name} ב${cityName}?`,
    `התמודדות עם מכת ${name} באזור ${cityName}`,
    `מפגעי ${name} נפוצים לתושבי ${cityName}`,
    `אתגרי ה${name} הייחודיים ל${cityName}`,
    `מה חשוב לדעת על ${name} ב${cityName}?`,
    `איך מזהים ${name} בבתים ב${cityName}?`,
    `סוגי ה${name} שאנו פוגשים ב${cityName}`
  ];
  const index = (cityName.length + serviceId.length) % variations.length;
  return variations[index];
}

export function getVariedServiceTitle(serviceName: string, cityName: string, isEmergency: boolean): string {
  const variations = isEmergency ? [
    `שירות חירום: ${serviceName} ב${cityName}`,
    `צריכים ${serviceName} ב${cityName} עכשיו?`,
    `מענה מיידי ל${serviceName} ב${cityName}`,
    `מדביר חירום ל${serviceName} ב${cityName}`,
    `טיפול דחוף ב${serviceName} ב${cityName} 24/7`,
    `הדברה דחופה של ${serviceName} ב${cityName}`,
    `לוכד ${serviceName.replace('הדברת ', '')} זמין ב${cityName}`,
    `${serviceName} ב${cityName} - הגעה תוך שעה`
  ] : [
    `שירותי ${serviceName} מקצועיים ב${cityName}`,
    `איך אנחנו מדבירים ${serviceName} ב${cityName}?`,
    `פתרונות הדברה מתקדמים ל${serviceName} ב${cityName}`,
    `מומחים ל${serviceName} ב${cityName} והסביבה`,
    `כל מה שצריך לדעת על ${serviceName} ב${cityName}`,
    `השיטות שלנו ל${serviceName} ב${cityName}`,
    `הדברה בטוחה של ${serviceName} ב${cityName}`,
    `מומחי ${serviceName} ב${cityName} לשירותכם`,
    `טיפול יסודי ב${serviceName} לתושבי ${cityName}`,
    `הדברה ירוקה: ${serviceName} ב${cityName}`
  ];
  const index = (cityName.length + serviceName.length) % variations.length;
  return variations[index];
}

export function getVenueBySlug(slug: string): Venue | undefined {
  return (venues as Venue[]).find((v) => v.slug === slug);
}

export function getNeighborhoodsSentence(city: City): string {
  if (!city.neighborhoods || city.neighborhoods.length === 0) {
    return `אנו מעניקים שירות בכל רחבי ${city.name} והסביבה.`;
  }

  const variations = [
    `הצוותים שלנו פרוסים בכל ${city.name} ומגיעים לכל השכונות, כולל ${city.neighborhoods.slice(0, 3).join(', ')} ועוד.`,
    `אנו מספקים מענה מהיר לתושבי ${city.name} בשכונות כמו ${city.neighborhoods[0]}, ${city.neighborhoods[1]} וכל שאר אזורי העיר.`,
    `בין אם אתם גרים ב${city.neighborhoods[0]} או ב${city.neighborhoods[city.neighborhoods.length - 1]}, המדבירים שלנו ב${city.name} זמינים עבורכם.`,
    `השירות שלנו ב${city.name} מקיף את כל חלקי העיר, עם דגש על הגעה מהירה ל${city.neighborhoods.join(' ול')}.`
  ];

  const index = city.name.length % variations.length;
  return variations[index];
}

export function getDistrictContext(city: City, serviceName: string): string {
  const districtVariations: Record<string, string[]> = {
    'מרכז': [
      `כעיר מרכזית במחוז המרכז, ${city.name} מתאפיינת בבנייה צפופה המצריכה פתרונות ${serviceName} ממוקדים.`,
      `אזור המרכז ו${city.name} בפרט סובלים לעיתים קרובות מבעיות ${serviceName} עקב תשתיות וותיקות לצד בנייה חדשה.`,
      `הניסיון שלנו ב${city.name} ובכל אזור המרכז מאפשר לנו לתת מענה מדויק לצרכי התושבים.`
    ],
    'דרום': [
      `האקלים החם בדרום הארץ וב${city.name} מעודד פעילות של מזיקים, מה שהופך את ה${serviceName} לחיונית במיוחד.`,
      `תושבי ${city.name} והדרום יודעים ש${serviceName} מקצועית היא המפתח לשמירה על איכות החיים באזור.`,
      `אנו מומחים בהתאמת שיטות ה${serviceName} לתנאי השטח והאקלים הייחודיים של ${city.name}.`
    ],
    'צפון': [
      `הצמחייה המרובה באזור הצפון וב${city.name} מביאה איתה אתגרי ${serviceName} ייחודיים שאנו יודעים לפתור.`,
      `ב${city.name} ובכל מחוז הצפון, אנו מספקים ${serviceName} המשלבת שמירה על הסביבה עם יעילות מקסימלית.`,
      `המומחיות שלנו ב${city.name} מבוססת על שנים של עבודה מול מזיקים האופייניים לצפון הארץ.`
    ],
    'ירושלים': [
      `המבנה הטופוגרפי והבנייה באבן ב${city.name} דורשים מיומנות מיוחדת בביצוע ${serviceName}.`,
      `אנו מכירים היטב את אתגרי ה${serviceName} ב${city.name} ומספקים פתרונות המותאמים לאופי העיר.`,
      `שירותי ה${serviceName} שלנו ב${city.name} ניתנים תוך התחשבות במאפיינים הייחודיים של עיר הבירה.`
    ]
  };

  const options = districtVariations[city.district] || districtVariations['מרכז'];
  const index = (city.name.length + serviceName.length) % options.length;
  return options[index];
}
