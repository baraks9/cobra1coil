import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { 
  getServiceBySlug, 
  getCityBySlug, 
  getServices, 
  getCities, 
  getProblems, 
  getDeterministicSuffix,
  getRotationSuffix,
  getPestsByServiceId,
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
    city: string;
  }>;
}

export async function generateStaticParams() {
  const services = getServices();
  const cities = getCities();

  const params = [];

  for (const service of services) {
    for (const city of cities) {
      params.push({
        service: service.slug,
        city: city.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);

  if (!service || !city) {
    return {};
  }

  const isEmergency = serviceSlug.includes('24-hours') || serviceSlug.includes('emergency') || serviceSlug.includes('24-7');
  
  const suffix = getRotationSuffix(city.name);
  
  let title = "";
  if (service.id === 'silverfish') {
    title = `הדברת דג הכסף ב${city.name} | פתרון לחרקי לחות וספרים`;
  } else if (service.id === 'psocids') {
    title = `הדברת פסוקאים ב${city.name} | טיפול בחרקי עובש בדירות חדשות`;
  } else if (isEmergency) {
    title = `מדביר חירום ב${city.name} 24/7 | הגעה תוך 20 דקות | ${service.name}`;
  } else {
    title = `${service.name} ב${city.name}${suffix}`;
  }
  
  // Intent-based description logic
  const descriptions = {
    safety: [
      `גרים ב${city.name}? קבלו הדברה בטוחה לתינוקות ובעלי חיים (ללא ריח). שימוש בחומרים ירוקים ומאושרים בלבד. חזרה מהירה לשגרה ואחריות מלאה. הזמינו עכשיו.`,
      `ריסוס לבית ב${city.name} מחומרים טבעיים בלבד (רמת רעילות נמוכה). פתרון מושלם למשפחות עם ילדים וכלבים. מדביר מוסמך עם רישיון המשרד להגנת הסביבה.`,
    ],
    urgency: [
      `נתקלתם במזיק ב${city.name}? הגעה תוך 30 דקות! שירות חירום 24/7 ללכידת חולדות, עכברים וטיפול בקני צרעות. אל תחכו שהבעיה תחמיר - חייגו למדביר תורן.`,
      `שירותי הדברה אקספרס ב${city.name}. אנו זמינים כעת לטיפול מיידי בבעיה. התחייבות לפתרון הבעיה או כספכם בחזרה. עבודה נקייה, מהירה ושקטה.`,
    ],
    trust: [
      `מחפשים מדביר ב${city.name} במחיר הוגן? אל תשלמו סתם. אצלנו תקבלו מחירון שקוף, תעודת אחריות בכתב ומדביר המופיע ב'יצאת צדיק'. ייעוץ טלפוני חינם.`,
      `הדברה מקצועית ב${city.name} עם 100% אחריות. אלפי לקוחות מרוצים לא טועים. טיפול יסודי בכל סוגי המזיקים במחירים משתלמים וללא הפתעות.`,
    ],
    silverfish: [
      `הדברת דג הכסף ב${city.name}. טיפול מקצועי בחרקי לחות המזיקים לספרים ובגדים. שימוש בחומרים בטוחים לבית עם אחריות מלאה.`,
      `סובלים מדג הכסף ב${city.name}? אנחנו כאן כדי לעזור. פתרון סופי לחרקי לחות בארונות ובחדרי רחצה. מדביר מוסמך זמין כעת.`
    ],
    psocids: [
      `הדברת פסוקאים ב${city.name}. מומחים לטיפול בחרקי עובש המופיעים על קירות רטובים בדירות חדשות. פתרון יסודי המונע את חזרת החרקים.`,
      `חרקים לבנים קטנים ב${city.name}? אלו כנראה פסוקאים. אנו מספקים טיפול ייעודי לחרקי עובש בדירות חדשות עם התחייבות לתוצאות.`
    ],
    fleas: [
      `הדברת פרעושים ב${city.name} בשיטה ירוקה ובטוחה. טיפול יסודי הכולל השמדת פרעושים בוגרים ומניעת בקיעת ביצים. פתרון מושלם לבתים עם כלבים וחתולים.`,
      `סובלים מפרעושים ב${city.name}? אנו מציעים ריסוס מקצועי לחצר ולבית עם אחריות מלאה. חומרים בטוחים לילדים וחיות מחמד המאפשרים חזרה מהירה לשגרה.`
    ]
  };

  let description = "";
  const variant = city.name.length % 2;

  if (service.id === 'silverfish') {
    description = descriptions.silverfish[variant];
  } else if (service.id === 'psocids') {
    description = descriptions.psocids[variant];
  } else if (service.id === 'fleas') {
    description = descriptions.fleas[variant];
  } else if (isEmergency || ['rat-catcher', 'mouse-catcher', 'wasps', 'carcass-removal', 'snakes'].includes(service.id)) {
    description = descriptions.urgency[variant];
  } else if (['ants', 'cockroaches', 'fleas', 'home-spraying', 'bed-bugs'].includes(service.id)) {
    description = descriptions.safety[variant];
  } else {
    description = descriptions.trust[variant];
  }

  return {
    title,
    description,
    alternates: {
      canonical: `/${service.slug}/${city.slug}`,
    },
  };
}

export default async function ServiceCityPage({ params }: PageProps) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);

  if (!service || !city) {
    notFound();
  }

  const internalLinks = createComprehensiveInternalLinks('serviceCity', service, city);
  const breadcrumbs = internalLinks.find(s => s.variant === 'breadcrumbs');
  const otherInternalLinks = internalLinks.filter(s => s.variant !== 'breadcrumbs');

  const isEmergency = serviceSlug.includes('24-hours') || serviceSlug.includes('emergency') || serviceSlug.includes('24-7') || service.urgency === 'critical';

  const allServices = getServices();
  const allCities = getCities();
  const allProblems = getProblems();
  const otherCities = allCities.filter((c) => c.slug !== city.slug).slice(0, 12);
  const otherServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 12);
  const servicePests = getPestsByServiceId(service.id);
  const featuredPest = servicePests[0];
  
  // Filter and prioritize problems based on city conversion data
  const getPrioritizedProblems = () => {
    // Base: problems related to the current service
    const serviceProblems = allProblems.filter(p => p.serviceId === service.id);
    
    // Define priority services based on city conversion data
    let priorityServiceIds: string[] = [];
    if (city.id === '1') { // Ramla
      priorityServiceIds = ['rat-catcher', 'fleas'];
    } else if (city.id === '2' || city.slug === 'yavne') { // Yavne (User mentioned ID 2, slug is 'yavne')
      priorityServiceIds = ['rat-catcher']; // Mice/Rat
    }

    if (priorityServiceIds.length === 0) {
      return serviceProblems;
    }

    // Get priority problems
    const priorityProblems = allProblems.filter(p => priorityServiceIds.includes(p.serviceId));
    
    // Combine, remove duplicates, and sort
    const combined = [...priorityProblems, ...serviceProblems];
    const uniqueProblems = combined.filter((p, index) => 
      combined.findIndex(other => other.id === p.id) === index
    );

    return uniqueProblems.sort((a, b) => {
      const aPriority = priorityServiceIds.indexOf(a.serviceId);
      const bPriority = priorityServiceIds.indexOf(b.serviceId);
      
      // If both are priority, maintain priority list order
      if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
      // Priority items come first
      if (aPriority !== -1) return -1;
      if (bPriority !== -1) return 1;
      // Then current service items
      if (a.serviceId === service.id && b.serviceId !== service.id) return -1;
      if (a.serviceId !== service.id && b.serviceId === service.id) return 1;
      return 0;
    });
  };

  const relatedProblems = getPrioritizedProblems();
  const faqs = getUniqueFAQ(service, city);

  const h1Title = `${service.name} ב${city.name}${getDeterministicSuffix(city.name, service.id)}`;

  const getOpeningHook = (serviceId: string, cityName: string) => {
    if (['ants', 'cockroaches', 'home-spraying'].includes(serviceId)) {
      return `תושבי ${cityName}, מחפשים הדברה שלא מסכנת את הילדים והחיות? אנו משתמשים בתכשירים ירוקים (פירטרואידים) המאושרים על ידי המשרד להגנת הסביבה, המאפשרים חזרה לשגרה תוך שעה בלבד. ללא ריח וללא סכנה.`;
    }
    if (serviceId === 'fleas') {
      return `סובלים מעקיצות פרעושים ב${cityName}? הטיפול שלנו משלב חומרים להשמדת הפרעושים הבוגרים יחד עם מעכבי גדילה (IGR) המונעים בקיעה של ביצים חדשות. פתרון בטוח לילדים וחיות מחמד עם אחריות מלאה.`;
    }
    if (['rat-catcher', 'mouse-catcher', 'wasps', 'snakes', 'rodents'].includes(serviceId)) {
      return `נתקלתם במזיק מסוכן ב${cityName}? אל תחכו! צוות כוננות שלנו נמצא כרגע באזור וזמין להגעה תוך 30 דקות. לכידה וטיפול במקום עם התחייבות לפתרון הבעיה.`;
    }
    if (['termites', 'bed-bugs'].includes(serviceId)) {
      return `הדברה מורכבת ב${cityName} דורשת מומחים. אנו מספקים אחריות מלאה בכתב (עד 5 שנים לטרמיטים), שימוש בציוד מתקדם וליווי מלא עד לפתרון המוחלט של הבעיה.`;
    }
    return null;
  };

  const openingHook = getOpeningHook(service.id, city.name);

  return (
    <main className={`min-h-screen ${isEmergency ? 'bg-red-50' : 'bg-gray-50'} pb-24 md:pb-12`} dir="rtl">
      <JsonLdManager 
        type="city" 
        service={service} 
        city={city} 
        faqs={faqs} 
        breadcrumbs={breadcrumbs?.links} 
      />
      <UrgencyBanner urgency={isEmergency ? 'critical' : service.urgency} cityName={city.name} />
      
      <HeroSection 
        serviceName={service.name} 
        cityName={city.name} 
        isEmergency={isEmergency}
        title={h1Title}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {featuredPest && featuredPest.imageUrl ? (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <Image
              src={featuredPest.imageUrl}
              alt={`זיהוי ${service.name} ב${city.name} - תמונה להמחשה`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 right-0 bg-black/50 text-white px-4 py-1 text-sm backdrop-blur-sm">
              תמונה להמחשה: {featuredPest.name}
            </div>
          </div>
        ) : null}
        {service.url && !featuredPest?.imageUrl && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <Image
              src={service.url}
              alt={`${service.name} ב${city.name}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}
        {openingHook && (
          <div className="mb-8 p-6 bg-blue-50 border-r-4 border-blue-500 rounded-l-xl">
            <p className="text-xl text-blue-900 font-medium leading-relaxed">
              {openingHook}
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className={`text-3xl font-bold mb-6 ${isEmergency ? 'text-red-900' : 'text-blue-900'}`}>
                {isEmergency ? `שירות חירום: ${service.name} ב${city.name}` : `שירותי ${service.name} מקצועיים ב${city.name}`}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {isEmergency 
                  ? `זקוקים ל${service.name} ב${city.name} עכשיו? אנחנו מבינים את הדחיפות. צוותי החירום שלנו פרוסים ב${city.name} ומוכנים להגיע אליכם תוך דקות ספורות לטיפול מיידי ומקצועי.`
                  : `זקוקים ל${service.name} ב${city.name}? אתם במקום הנכון. אנו מספקים שירותי הדברה מתקדמים ומקצועיים, עם דגש על בטיחות, יעילות ושירות ללא פשרות. הצוות שלנו מכיר היטב את אזור ${city.name} ויודע לתת מענה מהיר ומדויק לכל בעיה.`
                }
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>מדבירים מוסמכים עם רישיון בתוקף</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>שימוש בחומרי הדברה ירוקים ובטוחים</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>אחריות מלאה על כל עבודה</span>
                </li>
              </ul>

              {service.preparation && service.preparation.length > 0 && (
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 mt-8">
                  <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                    📋 איך להתכונן להדברה ב{city.name}?
                  </h3>
                  <ul className="space-y-3">
                    {service.preparation.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-orange-800">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </span>
                        <span className="font-medium">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {!isEmergency && relatedProblems.length > 0 && (
              <section className="bg-white p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-blue-900">
                  {service.id === 'rat-catcher' 
                    ? `בעיות חולדות נפוצות ב${city.name}`
                    : service.id === 'mouse-catcher'
                    ? `בעיות עכברים נפוצות ב${city.name}`
                    : service.id === 'rodents' 
                    ? `בעיות מכרסמים נפוצות ב${city.name}` 
                    : service.id === 'cockroaches' || service.id === 'german-roach'
                    ? `סוגי תיקנים נפוצים ב${city.name}`
                    : `בעיות ${service.name} נפוצות ופתרונות ב${city.name}`}
                </h2>
                <div className="space-y-6">
                  {relatedProblems.map((problem) => (
                    <div 
                      key={problem.slug} 
                      className="border border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-all"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {problem.url && (
                          <div className="relative w-full md:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <Image 
                              src={problem.url} 
                              alt={problem.title} 
                              fill 
                              className="object-cover" 
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-blue-900 mb-3">{problem.title}</h3>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            {problem.description}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {problem.injectionPhrase}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!isEmergency && (
              <DynamicPricingCard 
                serviceName={service.name} 
                cityName={city.name} 
                priceRange={service.avgPrice} 
              />
            )}

            <section className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className={`text-2xl font-bold mb-4 ${isEmergency ? 'text-red-900' : 'text-blue-900'}`}>{getWhyChooseUsTitle(service)}</h2>
              <p className="text-gray-700">
                אנו מבינים שנוכחות של מזיקים בבית או בעסק יכולה להיות מטרידה מאוד. לכן, אנו מציעים שירות מהיר, דיסקרטי ומקצועי. אנו לא רק מטפלים בבעיה הקיימת, אלא גם נותנים ייעוץ למניעת חזרת המזיקים בעתיד.
              </p>
            </section>
          </div>

          <aside className="space-y-8">
            <div className={`${isEmergency ? 'bg-red-600 text-white' : 'bg-blue-50 text-blue-900'} p-6 rounded-2xl border ${isEmergency ? 'border-red-700' : 'border-blue-100'} shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">צריכים עזרה דחופה?</h3>
              <p className={`${isEmergency ? 'text-red-50' : 'text-gray-600'} mb-6`}>
                המומחים שלנו זמינים עבורכם ב{city.name} לכל שאלה או הזמנה.
              </p>
              <a 
                href={`tel:${process.env.NEXT_PUBLIC_PHONE?.replace(/-/g, '') || '0502138028'}`}
                className={`block w-full ${isEmergency ? 'bg-yellow-400 text-red-700' : 'bg-blue-600 text-white'} text-center font-black py-4 rounded-xl hover:scale-105 transition-transform text-xl`}
              >
                התקשרו עכשיו
              </a>
            </div>
            
            <NearbyCities currentServiceSlug={service.slug} cities={otherCities} />
          </aside>
        </div>

        <RelatedServices services={otherServices} currentCitySlug={city.slug} />
        
        <FAQSection 
          faqs={faqs} 
          serviceName={service.name} 
          cityName={city.name} 
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
