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
  getWhyChooseUsTitle,
  getVariedHook,
  getVariedDescription,
  getVariedWhyChooseUs,
  getStructuralShuffle,
  getVariedBulletPoints,
  getVariedProblemsTitle,
  getVariedServiceTitle,
  getNeighborhoodsSentence,
  getDistrictContext,
  Service,
  City
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
import LocalContext from '@/components/LocalContext';
import { createComprehensiveInternalLinks } from '@/lib/internalLinks';
import ReviewsSection from '@/components/ReviewsSection';

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
  const titleVariations = [
    `${service.name} ב${city.name}${suffix}`,
    `${service.name} ב${city.name} - מדביר מוסמך`,
    `צריכים ${service.name} ב${city.name}?`,
    `הדברה ב${city.name}: ${service.name} עם אחריות`,
    `מומחה ${service.name} ב${city.name} והסביבה`
  ];

  if (service.id === 'silverfish') {
    title = `הדברת דג הכסף ב${city.name} והסביבה`;
  } else if (service.id === 'psocids') {
    title = `הדברת פסוקאים ב${city.name} - פתרון מקצועי`;
  } else if (service.id === 'cockroaches') {
    title = `הדברת ג'וקים ב${city.name} - שירות מקצועי`;
  } else if (service.id === 'german-roach') {
    title = `הדברת תיקן גרמני ב${city.name} ללא ריסוס`;
  } else if (isEmergency) {
    title = `מדביר חירום ב${city.name} - זמינות גבוהה 24/7`;
  } else {
    const titleIndex = (city.name.length + service.id.length) % titleVariations.length;
    title = titleVariations[titleIndex];
  }
  
  // High-intent, hyper-local description for city pages
  const descriptionVariations = [
    `זקוקים ל${service.name} ב${city.name}? המדבירים שלנו מגיעים לכל שכונות ${city.name} והסביבה. הדברה ירוקה ובטוחה עם אחריות מלאה בכתב. התקשרו עכשיו להצעת מחיר הוגנת.`,
    `מחפשים מדביר מוסמך ל${service.name} ב${city.name}? אנו מספקים פתרונות הדברה מתקדמים ב${city.name} עם דגש על בטיחות ויעילות. זמינות גבוהה ואחריות מלאה על כל עבודה.`,
    `הדברה ב${city.name} של ${service.name} במחירים הוגנים. צוות המומחים שלנו ב${city.name} ערוך לכל קריאה, כולל טיפולי חירום. חומרים מאושרים ובטוחים למשפחה.`,
    `שירותי ${service.name} מקצועיים ב${city.name} והסביבה. אנו מציעים פתרון סופי לבעיית ה${service.name} ב${city.name} עם ליווי מקצועי ואחריות ארוכת טווח. התקשרו לייעוץ חינם.`,
    `איך להיפטר מ${service.name} ב${city.name}? המומחים של קוברה הדברה ב${city.name} מבצעים טיפול יסודי ובטוח. שירות מהיר לתושבי ${city.district} עם 100% הצלחה ואחריות.`,
    `צריכים ${service.name} דחוף ב${city.name}? מדביר מוסמך מהאזור זמין כעת להגעה מהירה. פתרונות הדברה ירוקה ב${city.name} לדירות, בתים פרטיים ועסקים.`,
    `הדברת ${service.name} ב${city.name} והסביבה. אנו משתמשים בחומרים הבטוחים ביותר למשפחה ולחיות המחמד. שירות מקצועי ב${city.name} עם המלצות רבות.`,
    `סובלים מ${service.name} ב${city.name}? אל תחכו שהבעיה תחמיר. אנו מציעים אבחון וטיפול מהיר ב${city.name} על ידי מדבירים מורשים. התקשרו להצעה משתלמת.`
  ];
  const descIndex = (city.id.length + service.slug.length + city.name.length) % descriptionVariations.length;
  const description = descriptionVariations[descIndex];

  return {
    title,
    description,
    alternates: {
      canonical: `/${serviceSlug}/${citySlug}`,
    },
  };
}

export default async function ServiceCityPage({ params }: PageProps) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug) as Service | undefined;
  const city = getCityBySlug(citySlug) as City | undefined;

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
  
  // Filter and prioritize problems based on city conversion data and characteristics
  const getPrioritizedProblems = () => {
    // Base: problems related to the current service
    const serviceProblems = allProblems.filter(p => p.serviceId === service.id);
    
    // Define priority services based on city characteristics
    let priorityServiceIds: string[] = [];
    
    // 1. Manual overrides based on specific city data
    if (city.id === '1') { // Ramla
      priorityServiceIds = ['rat-catcher', 'fleas'];
    } else if (city.slug === 'yavne') {
      priorityServiceIds = ['rat-catcher'];
    }

    // 2. Coastal cities (Bat Yam, Tel Aviv, Ashdod, Netanya, Herzliya)
    const coastalCities = ['bat-yam', 'tel-aviv', 'ashdod', 'netanya', 'herzliya'];
    if (coastalCities.includes(city.slug)) {
      priorityServiceIds = [...priorityServiceIds, 'german-roach', 'psocids', 'silverfish'];
    }

    // 3. Agricultural/Open areas (Rehovot, Hadera, Hod Hasharon, Gedera)
    const agriculturalCities = ['rehovot', 'hadera', 'hod-hasharon', 'gedera', 'rosh-haayin'];
    if (agriculturalCities.includes(city.slug)) {
      priorityServiceIds = [...priorityServiceIds, 'fire-ants', 'wasps', 'rodents'];
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

  const localHook = getVariedHook(service, city);
  const localParagraph = getVariedDescription(service, city, isEmergency);
  const neighborhoodsSentence = getNeighborhoodsSentence(city);
  const districtContext = getDistrictContext(city, service.name);
  const whyChooseUsDescription = getVariedWhyChooseUs(service, city);
  const bulletPoints = getVariedBulletPoints(service.id, city.name);
  const structuralOrder = getStructuralShuffle(city.id);

  const localParagraphWithNeighborhoods = localParagraph.replace(
    /ב\${city\.name}/g, 
    `ב${city.name}`
  );

  const renderSection = (type: string) => {
    switch (type) {
      case 'pricing':
        return !isEmergency && (
          <DynamicPricingCard 
            key="pricing"
            serviceName={service.name} 
            cityName={city.name} 
            priceRange={service.avgPrice} 
            warranty={service.warranty}
            safety={service.safety}
            duration={service.duration}
          />
        );
      case 'faq':
        return (
          <FAQSection 
            key="faq"
            faqs={faqs} 
            serviceName={service.name} 
            cityName={city.name} 
          />
        );
      case 'pests':
        return !isEmergency && relatedProblems.length > 0 && (
          <section key="pests" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">
              {getVariedProblemsTitle(service.id, city.name)}
            </h2>
            <div className="space-y-6">
              {relatedProblems.map((problem) => (
                <div 
                  key={problem.id} 
                  className="border border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-all"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {problem.imageUrl && (
                      <div className="relative w-full md:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image 
                          src={problem.imageUrl} 
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
        );
      case 'content':
        return (
          <section key="content" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className={`text-3xl font-bold mb-6 ${isEmergency ? 'text-red-900' : 'text-blue-900'}`}>
              {getVariedServiceTitle(service.name, city.name, isEmergency)}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {localParagraphWithNeighborhoods}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {districtContext} {neighborhoodsSentence}
            </p>
            {city.injectionPhrase && (
              <p className="text-lg text-blue-800 font-medium mb-6 italic">
                {city.injectionPhrase}
              </p>
            )}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bulletPoints.map((point, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 ml-2 font-bold text-xl">✓</span>
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>

            {service.preparation && service.preparation.length > 0 && (
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 mt-8">
                <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                  📋 איך להתכונן להדברה ב{city.name}?
                </h3>
                <ul className="space-y-3">
                  {service.preparation.map((step: string, i: number) => (
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
        );
      default:
        return null;
    }
  };

  return (
    <main className={`min-h-screen ${isEmergency ? 'bg-red-50' : 'bg-gray-50'} pb-24 md:pb-12`} dir="rtl">
      <JsonLdManager 
        type="city" 
        service={service} 
        city={city} 
        faqs={faqs} 
        breadcrumbs={breadcrumbs?.links} 
      />
      <UrgencyBanner 
        urgency={isEmergency ? 'critical' : service.urgency} 
        cityName={city.name} 
        arrivalTime={city.arrivalTime}
        neighborhoods={city.neighborhoods}
      />
      
      <HeroSection 
        serviceName={service.name} 
        cityName={city.name} 
        isEmergency={isEmergency}
        title={h1Title}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {(featuredPest?.imageUrl || service.url) ? (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <Image
              src={featuredPest?.imageUrl || service.url || ''}
              alt={`זיהוי ${service.name} ב${city.name} - תמונה להמחשה`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 right-0 bg-black/50 text-white px-4 py-1 text-sm backdrop-blur-sm">
              תמונה להמחשה: {featuredPest?.name || service.name}
            </div>
          </div>
        ) : null}
        
        <div className="mb-8 p-6 bg-blue-50 border-r-4 border-blue-500 rounded-l-xl">
          <p className="text-xl text-blue-900 font-medium leading-relaxed">
            {localHook}
          </p>
        </div>
        
        <LocalContext city={city} service={service} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {structuralOrder.map(type => renderSection(type))}

            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className={`text-2xl font-bold mb-4 ${isEmergency ? 'text-red-900' : 'text-blue-900'}`}>
                {getWhyChooseUsTitle(service, city.name)}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {whyChooseUsDescription}
              </p>
              
              {city.neighborhoods && city.neighborhoods.length > 0 && (
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm font-bold text-gray-900 mb-3">📍 אנו מעניקים שירות בכל שכונות {city.name}, כולל:</p>
                  <div className="flex flex-wrap gap-2">
                    {city.neighborhoods.map((n, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
            
            {city.lat && city.lng && (
              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 h-64 relative">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&q=${city.lat},${city.lng}&zoom=12`}
                ></iframe>
              </div>
            )}
          </aside>
        </div>

        <RelatedServices services={otherServices} currentCitySlug={city.slug} />
        
        <ReviewsSection serviceId={service.id} cityName={city.name} />
        
        {/* FAQ Section is now part of structural shuffle */}
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
