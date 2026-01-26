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
  getPestsByServiceId
} from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import DynamicPricingCard from '@/components/DynamicPricingCard';
import UrgencyBanner from '@/components/UrgencyBanner';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import NearbyCities from '@/components/NearbyCities';
import RelatedServices from '@/components/RelatedServices';
import Link from 'next/link';

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
  const title = isEmergency 
    ? `מדביר חירום ב${city.name} 24/7 | הגעה תוך 20 דקות | ${service.name}`
    : `${service.name} ב${city.name}${suffix}`;
  
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
    ]
  };

  let description = "";
  if (isEmergency || ['rat-catcher', 'mouse-catcher', 'wasps', 'carcass-removal', 'snakes'].includes(service.id)) {
    const variant = city.name.length % 2;
    description = descriptions.urgency[variant];
  } else if (['ants', 'cockroaches', 'fleas', 'home-spraying', 'bed-bugs'].includes(service.id)) {
    const variant = city.name.length % 2;
    description = descriptions.safety[variant];
  } else {
    const variant = city.name.length % 2;
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

  const isEmergency = serviceSlug.includes('24-hours') || serviceSlug.includes('emergency') || serviceSlug.includes('24-7') || service.urgency === 'critical';

  const allServices = getServices();
  const allCities = getCities();
  const allProblems = getProblems();
  const otherCities = allCities.filter((c) => c.slug !== city.slug).slice(0, 6);
  const otherServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 6);
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

  const h1Title = `${service.name} ב${city.name}${getDeterministicSuffix(city.name, service.id)}`;

  const getOpeningHook = (serviceId: string, cityName: string) => {
    if (['ants', 'cockroaches', 'fleas', 'home-spraying'].includes(serviceId)) {
      return `תושבי ${cityName}, מחפשים הדברה שלא מסכנת את הילדים והחיות? אנו משתמשים בתכשירים ירוקים (פירטרואידים) המאושרים על ידי המשרד להגנת הסביבה, המאפשרים חזרה לשגרה תוך שעה בלבד. ללא ריח וללא סכנה.`;
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
      <UrgencyBanner urgency={isEmergency ? 'critical' : service.urgency} cityName={city.name} />
      
      <HeroSection 
        serviceName={service.name} 
        cityName={city.name} 
        isEmergency={isEmergency}
        title={h1Title}
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
            </section>

            {!isEmergency && relatedProblems.length > 0 && (
              <section className="bg-white p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-blue-900">בעיות נפוצות ב{city.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedProblems.map((problem) => (
                    <Link 
                      key={problem.slug} 
                      href={`/problem/${problem.slug}/${city.slug}`}
                      className="block p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all group"
                    >
                      {problem.url && (
                        <div className="relative w-full aspect-video mb-2 rounded-lg overflow-hidden bg-gray-100">
                          <Image src={problem.url} alt={problem.title} fill className="object-cover" />
                        </div>
                      )}
                      <h3 className="font-bold text-blue-900 group-hover:text-blue-700">{problem.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{problem.description}</p>
                    </Link>
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
              <h2 className={`text-2xl font-bold mb-4 ${isEmergency ? 'text-red-900' : 'text-blue-900'}`}>למה לבחור בנו?</h2>
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
                href="tel:0500000000" 
                className={`block w-full ${isEmergency ? 'bg-yellow-400 text-red-700' : 'bg-blue-600 text-white'} text-center font-black py-4 rounded-xl hover:scale-105 transition-transform text-xl`}
              >
                התקשרו עכשיו
              </a>
            </div>
            
            <NearbyCities currentServiceSlug={service.slug} cities={otherCities} />
          </aside>
        </div>

        <RelatedServices services={otherServices} currentCitySlug={city.slug} />
      </div>

      <StickyMobileCTA />
    </main>
  );
}
