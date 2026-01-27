import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  getServiceBySlug, 
  getServices, 
  getCities, 
  getPestsByServiceId, 
  getRandomSuffix,
  getWhyChooseUsTitle
} from '@/lib/data';
import { getUniqueFAQ } from '@/lib/faqUtils';
import HeroSection from '@/components/HeroSection';
import DynamicPricingCard from '@/components/DynamicPricingCard';
import UrgencyBanner from '@/components/UrgencyBanner';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import NearbyCities from '@/components/NearbyCities';
import RelatedServices from '@/components/RelatedServices';
import InternalLinksSection from '@/components/InternalLinksSection';
import FAQSection from '@/components/FAQSection';
import JsonLdManager from '@/components/JsonLdManager';
import { createComprehensiveInternalLinks } from '@/lib/internalLinks';

interface PageProps {
  params: Promise<{
    service: string;
  }>;
}

export async function generateStaticParams() {
  const services = getServices();
  return services.map((service) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return {};
  }

  // Manual overrides for specific national root pages
  const manualOverrides: Record<string, string> = {
    'hadbarat-termitim': "הדברת טרמיטים מקצועית בפריסה ארצית. טיפול במערכת קידוח מתקדמת או בשיטת הסנטריקון (ללא קידוח). אחריות ל-5 שנים בכתב. בדיקה חינם בבית הלקוח.",
    'pishpesh-hamita': "הדברת פשפש המיטה בשיטת הקיטור היבש והחום (ללא רעלים). טיפול יסודי הכולל ניטור, שאיבה והדברה עם 100% הצלחה. התחייבות לתוצאות.",
    'tzraot': "פינוי קני צרעות ודבורים בצורה בטוחה ומהירה. מדבירים מוסמכים לטיפול בצרעה הגרמנית והמזרחית. שירות חירום 24/7 בכל הארץ.",
    'lochad-akbarim': "לוכד עכברים מוסמך זמין 24/7. לכידה הומנית, שימוש במלכודות קפיץ מתקדמות וסגירת חורי גישה למניעת חזרת המכרסמים. שירות שקט ודיסקרטי.",
    'dag-hakesef': "הדברת דג הכסף בבית ובמחסן. פתרון יעיל לחרקי לחות וספרים. שימוש בחומרים בטוחים המונעים נזק לנייר ובגדים. אחריות מלאה על הטיפול.",
    'hadbarat-psokaim': "הדברת פסוקאים (חרקי עובש) בדירות חדשות. טיפול יסודי בחרקים לבנים קטנים המופיעים עקב רטיבות בקירות. פתרון מקצועי המונע את חזרת המפגע.",
    'hadbarat-paroshim': "הדברת פרעושים מקצועית בבית ובחצר. טיפול יסודי הכולל השמדת פרעושים בוגרים ומניעת בקיעת ביצים. חומרים בטוחים לילדים וחיות מחמד. אחריות מלאה בכתב."
  };

  let title = "";
  if (service.id === 'silverfish') {
    title = "הדברת דג הכסף | טיפול בחרקי לחות וספרים | אחריות מלאה";
  } else if (service.id === 'psocids') {
    title = "הדברת פסוקאים | טיפול בחרקי עובש בדירות חדשות | מדביר מוסמך";
  } else {
    title = `${service.name} מקצועי | שירות בפריסה ארצית | מחירים החל מ-${service.avgPrice.split('-')[0]} ₪`;
  }
  
  let description = manualOverrides[serviceSlug];

  if (!description) {
    // Intent-based description logic for generic service pages (country-wide)
    const descriptions = {
      safety: [
        `זקוקים ל${service.name}? קבלו הדברה בטוחה לתינוקות ובעלי חיים (ללא ריח). שימוש בחומרים ירוקים ומאושרים בלבד. חזרה מהירה לשגרה ואחריות מלאה. הזמינו עכשיו.`,
        `ריסוס לבית מחומרים טבעיים בלבד (רמת רעילות נמוכה). פתרון מושלם למשפחות עם ילדים וכלבים. מדביר מוסמך עם רישיון המשרד להגנת הסביבה.`,
      ],
      urgency: [
        `נתקלתם במזיק? הגעה תוך 30 דקות! שירות חירום 24/7 ללכידת חולדות, עכברים וטיפול בקני צרעות. אל תחכו שהבעיה תחמיר - חייגו למדביר תורן.`,
        `שירותי הדברה אקספרס. אנו זמינים כעת לטיפול מיידי בבעיה. התחייבות לפתרון הבעיה או כספכם בחזרה. עבודה נקייה, מהירה ושקטה.`,
      ],
      trust: [
        `מחפשים מדביר במחיר הוגן? אל תשלמו סתם. אצלנו תקבלו מחירון שקוף, תעודת אחריות בכתב ומדביר המופיע ב'יצאת צדיק'. ייעוץ טלפוני חינם.`,
        `הדברה מקצועית עם 100% אחריות. אלפי לקוחות מרוצים לא טועים. טיפול יסודי בכל סוגי המזיקים במחירים משתלמים וללא הפתעות.`,
      ]
    };

    // Use service.name.length % 2 for deterministic rotation on generic pages
    const variant = service.name.length % 2;
    
    if (['rat-catcher', 'mouse-catcher', 'wasps', 'carcass-removal', 'snakes'].includes(service.id)) {
      description = descriptions.urgency[variant];
    } else if (['ants', 'cockroaches', 'fleas', 'home-spraying', 'bed-bugs'].includes(service.id)) {
      description = descriptions.safety[variant];
    } else {
      description = descriptions.trust[variant];
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: `/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const internalLinks = createComprehensiveInternalLinks('service', service);
  const breadcrumbs = internalLinks.find(s => s.variant === 'breadcrumbs');
  const otherInternalLinks = internalLinks.filter(s => s.variant !== 'breadcrumbs');

  const isApplianceProblem = serviceSlug === 'cockroaches'; // Cockroaches often involve appliances
  
  const allServices = getServices();
  const allCities = getCities().slice(0, 20);
  const otherServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 12);
  const relatedPests = getPestsByServiceId(service.id);

  // Content generation for 600-800 words
  const getExtendedContent = (serviceId: string) => {
    const contents: Record<string, { 
      prevention: string[], 
      dangers: string, 
      methods: string,
      tips: string[]
    }> = {
      'rat-catcher': {
        prevention: [
          "איטום חורים וסדקים בקירות חיצוניים (אפילו חור בגודל מטבע מספיק לחולדה).",
          "גיזום ענפי עצים הנוגעים בגג או בחלונות הבית.",
          "שמירה על סדר וניקיון במחסנים ובחצרות - מניעת מקומות מסתור.",
          "התקנת רשתות על פתחי ניקוז ומרזבים."
        ],
        dangers: "חולדות ועכברים הם נשאים של מחלות קשות כמו לפטוספירוזיס (עכבת), סלמונלה וטיפוס. מעבר לסיכון הבריאותי, הם גורמים לנזק כלכלי כבד על ידי כירסום כבלי חשמל (סכנת שריפה), צנרת פלסטיק ורהיטים.",
        methods: "אנו משתמשים בשיטת 'הדברה משולבת' (IPM). זה מתחיל בניטור וזיהוי מסלולי התנועה, ממשיך בהצבת מלכודות קפיץ או דבק הומניות בתיבות האכלה מוגנות, ובמקרים קשים שימוש בפיתיונות רעל מאושרים. בסיום, אנו מבצעים איטום של נקודות החדירה.",
        tips: [
          "אל תשאירו אוכל של חיות מחמד בחוץ למשך הלילה.",
          "שימו לב לרעשים של גירוד או ריצה בתקרה או בקירות.",
          "גללים קטנים בצורת אורז הם סימן ודאי לנוכחות מכרסמים."
        ]
      },
      'bed-bugs': {
        prevention: [
          "בדיקה יסודית של מזוודות ובגדים לאחר חזרה מטיול בחו\"ל או לינה בבתי מלון.",
          "הימנעות מהכנסת רהיטי רחוב או יד שנייה ללא בדיקה וחיטוי.",
          "שימוש בכיסויים אטומים למזרנים המונעים חדירת פשפשים."
        ],
        dangers: "פשפש המיטה אינו ידוע כמעביר מחלות, אך הנזק הנפשי והפיזי הוא עצום. העקיצות גורמות לגרד עז, נפיחות ותגובות אלרגיות. חוסר היכולת לישון בביטחון במיטה שלכם מוביל לחרדה ופגיעה קשה באיכות החיים.",
        methods: "הטיפול שלנו בפשפש המיטה הוא ללא רעלים ומבוסס על חום. אנו משתמשים במכשירי קיטור יבש בטמפרטורה של 180 מעלות להשמדת הביצים והבוגרים, שאיבה עוצמתית עם פילטר HEPA, וריסוס משלים רק בנקודות אסטרטגיות למניעת בקיעה עתידית.",
        tips: [
          "חפשו כתמי דם קטנים או נקודות שחורות (צואה) על הסדינים.",
          "אם נעקצתם בשורה של 3-4 עקיצות, זהו סימן קלאסי לפשפש המיטה.",
          "כבסו בגדים חשודים ב-60 מעלות לפחות למשך שעה."
        ]
      },
      'termites': {
        prevention: [
          "מניעת מגע ישיר של עץ עם האדמה (למשל במשקופים או דקים).",
          "טיפול ברטיבות ונזילות בקירות - טרמיטים זקוקים ללחות גבוהה.",
          "בדיקה תקופתית של משקופי דלתות על ידי הקשה עליהם (צליל חלול מעיד על כירסום)."
        ],
        dangers: "טרמיטים מכונים 'הרוצחים השקטים' של הבית. הם מסוגלים להשמיד משקופים, רהיטים, פרקטים ואפילו קונסטרוקציות גג תוך זמן קצר מבלי שתרגישו. הנזק הכספי יכול להגיע לעשרות אלפי שקלים.",
        methods: "אנו מציעים שתי שיטות מובילות: 1. שיטת הקידוח - הזרקת חומר הדברה ייעודי מתחת לריצוף ליצירת מחסום כימי. 2. שיטת הסנטריקון - הצבת תחנות ניטור והאכלה מסביב לבית המחסלות את המושבה כולה מהשורש ללא צורך בקידוח.",
        tips: [
          "אם ראיתם כנפיים שקופות על אדן החלון, ייתכן שזהו מעוף כלולות של טרמיטים.",
          "תעלות בוץ על הקירות הן סימן מובהק לדרך התנועה של הטרמיטים.",
          "אל תאחסנו קרטונים או עצים צמוד לקירות הבית בחוץ."
        ]
      },
      'fleas': {
        prevention: [
          "טיפול תקופתי בחיות המחמד נגד פרעושים (אמפולות/קולרים).",
          "שאיבת שטיחים, ספות ומזרנים בתדירות גבוהה.",
          "כיבוס מצעי חיות המחמד בטמפרטורה של 60 מעלות.",
          "מניעת כניסת חתולי רחוב לחצר או למחסנים."
        ],
        dangers: "פרעושים הם טפילים מוצצי דם הגורמים לעקיצות מגרדות, אלרגיות קשות ואף העברת מחלות וטפילים (כמו תולעי סרט) לבני אדם וחיות מחמד. נוכחותם גורמת למטרד קשה וחוסר נוחות בבית.",
        methods: "הטיפול שלנו בפרעושים הוא דו-שלבי: 1. ריסוס בחומר קטילה חזק להשמדת הפרעושים הבוגרים. 2. שימוש במעכבי גדילה (IGR) המונעים מהביצים והזחלים להתפתח לפרעושים בוגרים. זהו השלב הקריטי למניעת התפרצות חוזרת.",
        tips: [
          "לפני ההדברה, יש לשאוב היטב את כל הבית ולרוקן את שקית השואב.",
          "לאחר הטיפול, אין לשטוף את הרצפה במשך 3 ימים כדי לאפשר לחומר לעבוד.",
          "חשוב לטפל בחיות המחמד במקביל להדברת הבית."
        ]
      }
    };

    return contents[serviceId] || {
      prevention: [
        "שמירה על ניקיון כללי ומניעת הצטברות פירורי מזון.",
        "איטום סדקים וחריצים בקירות ובפאנלים.",
        "ייבוש מקורות מים עומדים ולחות יתרה.",
        "התקנת רשתות תקינות על כל החלונות."
      ],
      dangers: `נוכחות של ${service.name} בבית מהווה מטרד תברואתי ועלולה לגרום לאלרגיות, זיהום מזון ותחושת אי-נוחות כללית. חלק מהמזיקים עלולים להעביר חיידקים וטפילים לסביבת המגורים.`,
      methods: `אנו מבצעים הדברה מקצועית המשלבת ריסוס בחומרים ירוקים (פירטרואידים) המאושרים לשימוש ביתי, יחד עם פיתיונות ג'ל מתקדמים במידת הצורך. הטיפול ממוקד, בטוח למשפחה ולחיות מחמד ומבטיח שקט לאורך זמן.`,
      tips: [
        "הקפידו על סגירת שקיות זבל ופינוי יומיומי.",
        "אל תשאירו כלים בכיור למשך הלילה.",
        "בדקו את אריזות המזון היבש בארונות המטבח מדי פעם."
      ]
    };
  };

  const content = getExtendedContent(service.id);

  const getServicePricing = (serviceId: string) => {
    const pricing: Record<string, { item: string, price: string }[]> = {
      'rat-catcher': [
        { item: "לכידת חולדה בודדת (קריאת שירות)", price: "350-500 ₪" },
        { item: "טיפול מקיף בחולדות בבית פרטי", price: "600-900 ₪" },
        { item: "הצבת תיבות האכלה מוגנות (ליחידה)", price: "80-120 ₪" },
        { item: "פינוי פגר חולדה וחיטוי", price: "400-550 ₪" }
      ],
      'bed-bugs': [
        { item: "טיפול בחדר שינה בודד (חום + שאיבה)", price: "800-1200 ₪" },
        { item: "טיפול בכל הבית (3-4 חדרים)", price: "2500-4500 ₪" },
        { item: "ניטור וזיהוי פשפשים (ללא טיפול)", price: "250-350 ₪" }
      ],
      'termites': [
        { item: "הדברת טרמיטים בקידוח (למטר רץ)", price: "25-45 ₪" },
        { item: "טיפול במשקוף נגוע בודד", price: "400-600 ₪" },
        { item: "מערכת סנטריקון (התקנה ותחזוקה)", price: "1500-3000 ₪" },
        { item: "אחריות ל-5 שנים (כלול בטיפול)", price: "0 ₪" }
      ],
      'home-spraying': [
        { item: "ריסוס לדירת 2 חדרים", price: "250-350 ₪" },
        { item: "ריסוס לדירת 4 חדרים", price: "350-500 ₪" },
        { item: "ריסוס לבית פרטי + חצר", price: "500-800 ₪" },
        { item: "תוספת לטיפול בנמלים/ג'וקים", price: "50-100 ₪" }
      ],
      'fleas': [
        { item: "הדברת פרעושים בדירת 3 חדרים", price: "350-500 ₪" },
        { item: "הדברת פרעושים בבית פרטי כולל חצר", price: "550-850 ₪" },
        { item: "טיפול משולב (פרעושים + ריסוס כללי)", price: "450-650 ₪" },
        { item: "אחריות לתוצאות (כלול בטיפול)", price: "0 ₪" }
      ]
    };

    return pricing[serviceId] || [
      { item: `טיפול בסיסי ב${service.name}`, price: `${service.avgPrice.split('-')[0]} - ${service.avgPrice.split('-')[1]} ₪` },
      { item: "ביקור מדביר וייעוץ מקצועי", price: "200-300 ₪" },
      { item: "תוספת לשירות חירום (לילה/שבת)", price: "150-250 ₪" }
    ];
  };

  const servicePricing = getServicePricing(service.id);
  const faqs = getUniqueFAQ(service);

  let h1Title = '';
  if (service.slug === 'risus-labayit') {
    h1Title = 'ריסוס לבית - מחירים, המלצות והנחיות בטיחות';
  } else if (service.slug === 'hadbarat-termitim' || service.id === 'termites') {
    h1Title = 'הדברת טרמיטים מקצועית (טיפול בקידוח/ללא קידוח)';
  } else if (service.slug === 'pishpesh-hamita' || service.id === 'bed-bugs') {
    h1Title = 'הדברת פשפש המיטה - טיפול בחום עם אחריות';
  } else if (service.slug === 'tzraot' || service.id === 'wasps') {
    h1Title = 'הדברת צרעות ופינוי קנים (דבורים/צרעות) - אחריות מלאה';
  } else if (service.slug === 'namlei-esh' || service.id === 'fire-ants') {
    h1Title = 'הדברת נמלי אש בגינה ובבית (טיפול בגרגרים ופיתיונות)';
  } else if (service.id === 'fleas') {
    h1Title = 'הדברת פרעושים בבית ובחצר - פתרון סופי לעקיצות';
  } else if (service.slug === 'lochad-akbarim' || service.id === 'mouse-catcher') {
    h1Title = 'לוכד עכברים מומלץ 24/7 - לכידה הומנית ושקטה';
  } else if (service.id === 'psocids') {
    h1Title = 'הדברת פסוקאים (חרקי עובש) בדירות חדשות - טיפול יסודי';
  } else if (service.id === 'silverfish') {
    h1Title = 'הדברת דג הכסף - פתרון סופי לחרקי ספרים ולחות';
  } else {
    const benefit = service.description ? ` - ${service.description.slice(0, 30)}...` : getRandomSuffix(service.urgency);
    h1Title = `${service.name}${benefit}`;
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24 md:pb-12" dir="rtl">
      <JsonLdManager 
        type="service" 
        service={service} 
        faqs={faqs} 
        breadcrumbs={breadcrumbs?.links} 
      />
      <UrgencyBanner urgency={service.urgency as any} cityName="כל הארץ" />
      
      <HeroSection 
        serviceName={service.name} 
        title={h1Title}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {service.url && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <Image
              src={service.url}
              alt={service.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              unoptimized={false}
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {isApplianceProblem && (
              <section className="bg-green-50 border-2 border-green-200 p-6 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold text-green-900 mb-4">🛡️ טיפול בטוח במכשירי חשמל</h2>
                <p className="text-green-800 font-medium">
                  אנו מתמחים בטיפול בתיקן גרמני בתוך ברי מים (תמי 4) ומכונות קפה. 
                  השימוש ב<span className="underline">ג'ל בטיחותי</span> (Safe Gel Treatment) אינו רעיל ומאפשר חזרה לשימוש במכשיר ללא חשש.
                </p>
              </section>
            )}

            <section className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-3xl font-bold mb-6 text-blue-900">
                שירותי {service.name} בפריסה ארצית
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                אנו מספקים שירותי {service.name} מקצועיים בכל רחבי הארץ. המדבירים שלנו מוסמכים, מנוסים ומצוידים בציוד המתקדם ביותר כדי להבטיח תוצאות מעולות. אנו שמים דגש על בטיחות הלקוחות ואיכות הסביבה.
              </p>
              
              <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
                <h3 className="text-2xl font-bold text-blue-800 mt-8 mb-4">סכנות ומטרדים</h3>
                <p>{content.dangers}</p>

                <h3 className="text-2xl font-bold text-blue-800 mt-8 mb-4">שיטות עבודה ודרכי טיפול</h3>
                <p>{content.methods}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h4 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                      🛡️ איך למנוע את המפגע?
                    </h4>
                    <ul className="space-y-2 list-disc list-inside">
                      {content.prevention.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <h4 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                      💡 טיפים מקצועיים
                    </h4>
                    <ul className="space-y-2 list-disc list-inside">
                      {content.tips.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-blue-800 mt-12 mb-6">מדריך מקיף ל{service.name}</h3>
                <p>
                  כאשר אתם מחפשים שירותי {service.name}, חשוב להבין שלא כל טיפול הוא זהה. המומחיות שלנו טמונה ביכולת להתאים את פתרון ההדברה לסוג המזיק הספציפי, לתנאי השטח ולצרכים של דיירי הבית. אנו משתמשים בטכנולוגיות החדישות ביותר בתחום ההדברה, כולל ניטור דיגיטלי, פיתיונות ג'ל בעלי רעילות אפסית לבני אדם, ומערכות אידוי וחום מתקדמות.
                </p>
                <p>
                  תהליך העבודה שלנו מתחיל תמיד באבחון מדויק. המדביר יסרוק את הבית או העסק, יזהה את מוקדי הדגירה ואת דרכי הגישה של המזיקים, ורק לאחר מכן יבנה תוכנית פעולה. אנו מאמינים בשקיפות מלאה, ולכן תקבלו הסבר מפורט על כל שלב בטיפול, כולל הנחיות בטיחות לפני ואחרי ההדברה.
                </p>
                <p>
                  בנוסף לטיפול המיידי, אנו שמים דגש רב על מניעה לטווח ארוך. הדברה מוצלחת היא כזו שלא רק פותרת את הבעיה הנוכחית, אלא גם מונעת את חזרתה. לכן, בסיום כל עבודה אנו מספקים ייעוץ מקצועי לאיטום הבית, שינוי הרגלים תברואתיים ותחזוקה נכונה שתשמור על סביבה נקייה ממזיקים לאורך זמן.
                </p>
              </div>
            </section>

            {/* Know Your Enemy Section */}
            {relatedPests.length > 0 && (
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-blue-900">
                  {service.id === 'rat-catcher'
                    ? "סוגי חולדות נפוצים בישראל"
                    : service.id === 'mouse-catcher'
                    ? "סוגי עכברים נפוצים בישראל"
                    : service.id === 'rodents' 
                    ? "סוגי מכרסמים נפוצים בישראל" 
                    : service.id === 'cockroaches' || service.id === 'german-roach'
                    ? "סוגי תיקנים נפוצים בישראל"
                    : `סוגי ${service.name} נפוצים בישראל`}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPests.map((pest) => (
                    <Link 
                      key={pest.id} 
                      href={`/pest-id/${pest.slug}`}
                      className="block group p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                      {pest.imageUrl && (
                        <div className="relative w-full aspect-video mb-2 rounded-lg overflow-hidden bg-gray-100">
                          <Image src={pest.imageUrl} alt={pest.name} fill className="object-cover" />
                        </div>
                      )}
                      <h3 className="font-bold text-lg group-hover:text-blue-700">{pest.name}</h3>
                      <p className="text-sm text-gray-500 italic mb-2">{pest.scientificName}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{pest.identificationSigns}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="bg-white border-2 border-blue-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-blue-900">מחירון {service.name} מעודכן</h3>
              <div className="overflow-hidden rounded-xl border border-blue-100">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="p-4 font-bold">סוג השירות</th>
                      <th className="p-4 font-bold">טווח מחירים</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicePricing.map((item, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                        <td className="p-4 border-t border-blue-100">{item.item}</td>
                        <td className="p-4 border-t border-blue-100 font-bold text-blue-700">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                * המחירים עשויים להשתנות בהתאם לגודל השטח, מורכבות הטיפול ודחיפות השירות. המחיר הסופי ייקבע לאחר אבחון המדביר.
              </p>
            </div>

            <section className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">{getWhyChooseUsTitle(service)}</h2>
              <p className="text-gray-700">
                אנו מבינים שנוכחות של מזיקים בבית או בעסק יכולה להיות מטרידה מאוד. לכן, אנו מציעים שירות מהיר, דיסקרטי ומקצועי. אנו לא רק מטפלים בבעיה הקיימת, אלא גם נותנים ייעוץ למניעת חזרת המזיקים בעתיד.
              </p>
            </section>
          </div>

          <aside className="space-y-8">
            <NearbyCities currentServiceSlug={service.slug} cities={allCities} />
          </aside>
        </div>

        <RelatedServices services={otherServices} />
        
        <FAQSection 
          faqs={faqs} 
          serviceName={service.name} 
          cityName="כל הארץ" 
        />
      </div>

      {/* קישורים פנימיים ל-SEO */}
      <div className="max-w-4xl mx-auto px-4 pb-12 space-y-8">
        {otherInternalLinks.map((section, idx) => (
          <InternalLinksSection key={idx} section={section} />
        ))}
      </div>

      <StickyMobileCTA />
    </main>
  );
}
