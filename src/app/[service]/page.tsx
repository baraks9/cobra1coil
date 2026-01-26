import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getServiceBySlug, getServices, getCities, getPestsByServiceId, getRandomSuffix } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import DynamicPricingCard from '@/components/DynamicPricingCard';
import UrgencyBanner from '@/components/UrgencyBanner';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import NearbyCities from '@/components/NearbyCities';
import RelatedServices from '@/components/RelatedServices';

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
    'lochad-akbarim': "לוכד עכברים מוסמך זמין 24/7. לכידה הומנית, שימוש במלכודות קפיץ מתקדמות וסגירת חורי גישה למניעת חזרת המכרסמים. שירות שקט ודיסקרטי."
  };

  const title = `${service.name} מקצועי | שירות בפריסה ארצית | מחירים החל מ-${service.avgPrice.split('-')[0]} ₪`;
  
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

  const isApplianceProblem = serviceSlug === 'cockroaches'; // Cockroaches often involve appliances
  
  const allServices = getServices();
  const allCities = getCities().slice(0, 10);
  const otherServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 6);
  const relatedPests = getPestsByServiceId(service.id);

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
  } else if (service.slug === 'lochad-akbarim' || service.id === 'mouse-catcher') {
    h1Title = 'לוכד עכברים מומלץ 24/7 - לכידה הומנית ושקטה';
  } else {
    const benefit = service.description ? ` - ${service.description.slice(0, 30)}...` : getRandomSuffix(service.urgency);
    h1Title = `${service.name}${benefit}`;
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24 md:pb-12" dir="rtl">
      <UrgencyBanner urgency={service.urgency as any} cityName="כל הארץ" />
      
      <HeroSection 
        serviceName={service.name} 
        title={h1Title}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
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
            </section>

            {/* Know Your Enemy Section */}
            {relatedPests.length > 0 && (
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-blue-900">
                  דע את האויב: סוגי {service.name} נפוצים
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
              <h3 className="text-2xl font-bold mb-4 text-blue-900">מחירון {service.name}</h3>
              <p className="text-lg text-gray-700">
                המחיר הממוצע עבור <span className="font-semibold">{service.name}</span> נע בין {service.avgPrice} ₪.
              </p>
            </div>
          </div>

          <aside className="space-y-8">
            <NearbyCities currentServiceSlug={service.slug} cities={allCities} />
          </aside>
        </div>

        <RelatedServices services={otherServices} />
      </div>

      <StickyMobileCTA />
    </main>
  );
}
