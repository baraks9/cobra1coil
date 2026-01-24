import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { 
  getProblemBySlug, 
  getCityBySlug, 
  getServiceById, 
  getProblems, 
  getCities,
  getServices,
  getDeterministicSuffix,
  getPestsByServiceId
} from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import DynamicPricingCard from '@/components/DynamicPricingCard';
import UrgencyBanner from '@/components/UrgencyBanner';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import NearbyCities from '@/components/NearbyCities';
import RelatedServices from '@/components/RelatedServices';

interface PageProps {
  params: Promise<{
    problem: string;
    city: string;
  }>;
}

export async function generateStaticParams() {
  const problems = getProblems();
  const cities = getCities();

  const params = [];

  for (const problem of problems) {
    for (const city of cities) {
      params.push({
        problem: problem.slug,
        city: city.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { problem: problemSlug, city: citySlug } = await params;
  const problem = getProblemBySlug(problemSlug);
  const city = getCityBySlug(citySlug);

  if (!problem || !city) {
    return {};
  }

  const isUrgent = ['rat-catcher', 'wasps', 'fire-ants', 'carcass-removal', 'pigeon-lice', 'fleas', 'mouse-catcher'].includes(problem.serviceId) || problem.urgency === 'critical';
  const isGermanRoach = problem.slug.includes('german-roach') || problem.slug.includes('tikan-germani') || problem.serviceId === 'german-roach';

  let title = "";
  if (isGermanRoach) {
    title = `${problem.title} ב${city.name} - טיפול בג'ל ללא ריח | קוברה`;
  } else if (isUrgent) {
    title = `${problem.title} ב${city.name} - טיפול חירום 24/7 | קוברה`;
  } else {
    title = `${problem.title} ב${city.name} - טיפול יסודי עם אחריות`;
  }

  // Intent-based description logic (only for generic or non-specific descriptions)
  // The user said: "Do NOT change the problem (micro-problem) descriptions if they are already specific (like "Rat in toilet"). Only apply this to generic service + city pages."
  // However, the current description is: `${problem.description} שירות מקצועי ב${city.name}. ${problem.injectionPhrase}`
  // This is already quite specific to the problem. 
  // But to be safe and follow the instruction "Only apply this to generic service + city pages", 
  // I will keep the problem page description as is, since it's already problem-specific.
  const description = `${problem.description} שירות מקצועי ב${city.name}. ${problem.injectionPhrase}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/problem/${problem.slug}/${city.slug}`,
    },
  };
}

export default async function ProblemCityPage({ params }: PageProps) {
  const { problem: problemSlug, city: citySlug } = await params;
  const problem = getProblemBySlug(problemSlug);
  const city = getCityBySlug(citySlug);

  if (!problem || !city) {
    notFound();
  }

  const service = getServiceById(problem.serviceId);
  if (!service) {
    notFound();
  }

  const allServices = getServices();
  const allCities = getCities();
  const otherCities = allCities.filter((c) => c.slug !== city.slug).slice(0, 6);
  const otherServices = allServices.filter((s) => s.id !== service.id).slice(0, 6);
  const problemPests = getPestsByServiceId(problem.serviceId);
  const featuredPest = problemPests[0];

  const isEmergency = problem.urgency === 'critical';

  const h1Title = `${problem.title} ב${city.name}${getDeterministicSuffix(city.name, problem.serviceId)}`;

  return (
    <main className={`min-h-screen ${isEmergency ? 'bg-red-50' : 'bg-gray-50'} pb-24 md:pb-12`} dir="rtl">
      <UrgencyBanner 
        urgency={problem.urgency} 
        cityName={city.name} 
        customMessage={problem.urgency === 'critical' ? `Emergency Response Team Available in ${city.name}` : undefined}
      />
      
      <HeroSection 
        serviceName={service.name} 
        cityName={city.name} 
        title={h1Title}
        subtitle={problem.injectionPhrase}
        isEmergency={isEmergency}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {featuredPest && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <Image
              src={featuredPest.imageUrl}
              alt={`תמונה של ${problem.title} - איתור וטיפול ב${city.name}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 right-0 bg-black/50 text-white px-4 py-1 text-sm backdrop-blur-sm">
              תמונה להמחשה: {problem.title}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-3xl font-bold mb-6 text-blue-900">
                טיפול מקצועי ב{problem.title} ב{city.name}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {problem.description}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                זקוקים לטיפול ב{problem.title} ב{city.name}? אנו מספקים שירותי {service.name} מתקדמים ומקצועיים, עם דגש על פתרון הבעיה הספציפית שלכם. הצוות שלנו מכיר היטב את אזור {city.name} ויודע לתת מענה מהיר ומדויק.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>מדבירים מוסמכים עם רישיון בתוקף</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>טיפול ממוקד ב{problem.title}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 ml-2">✓</span>
                  <span>אחריות מלאה על כל עבודה</span>
                </li>
              </ul>
            </section>

            <DynamicPricingCard 
              serviceName={service.name} 
              cityName={city.name} 
              priceRange={service.avgPrice} 
            />

            <section className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">למה לבחור בנו?</h2>
              <p className="text-gray-700">
                אנו מבינים ש{problem.title} יכול להיות מצב מלחיץ ומטריד. לכן, אנו מציעים שירות מהיר, דיסקרטי ומקצועי. אנו מתמחים בפתרונות עבור {problem.injectionPhrase} ומבטיחים חזרה מהירה לשגרה.
              </p>
            </section>
          </div>

          <aside className="space-y-8">
            <div className={`${isEmergency ? 'bg-red-600 text-white' : 'bg-blue-50 text-blue-900'} p-6 rounded-2xl border ${isEmergency ? 'border-red-700' : 'border-blue-100'} shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">צריכים עזרה דחופה?</h3>
              <p className={`${isEmergency ? 'text-red-50' : 'text-gray-600'} mb-6`}>
                המומחים שלנו זמינים עבורכם ב{city.name} לטיפול ב{problem.title}.
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
