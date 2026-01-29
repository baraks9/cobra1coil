import React from 'react';
import { Service, City, Pest, Venue } from '@/lib/data';
import { FAQItem } from '@/lib/faqUtils';
import reviews from '@/data/reviews.json';
import servicesData from '@/data/services.json';
import citiesData from '@/data/cities.json';

interface JsonLdManagerProps {
  type: 'home' | 'service' | 'city' | 'pest' | 'commercial';
  service?: Service;
  city?: City;
  faqs?: FAQItem[];
  breadcrumbs?: { label: string; href: string }[];
  pest?: Pest;
  venue?: Venue;
}

const JsonLdManager: React.FC<JsonLdManagerProps> = ({ 
  type, 
  service, 
  city, 
  faqs, 
  breadcrumbs, 
  pest, 
  venue 
}) => {
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || "קוברה הדברה";
  const phone = process.env.NEXT_PUBLIC_PHONE || "050-213-8028";
  const email = process.env.NEXT_PUBLIC_EMAIL || "office@cobra1.co.il";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cobra1.co.il";
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL || `${baseUrl}/logo.png`;
  const licenseNumber = process.env.NEXT_PUBLIC_LICENSE_NUMBER || "3042";
  const ratingValue = process.env.NEXT_PUBLIC_RATING_VALUE || "4.9";
  const reviewCount = process.env.NEXT_PUBLIC_REVIEW_COUNT || "987";
  
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL;
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL;
  const googleMapsUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL;
  const b144Url = process.env.NEXT_PUBLIC_B144_URL;
  const sameAs = [facebookUrl, youtubeUrl, googleMapsUrl, b144Url].filter(Boolean) as string[];

  const weekdaysOpen = process.env.NEXT_PUBLIC_OPENING_HOURS_WEEKDAYS_OPEN || "00:00";
  const weekdaysClose = process.env.NEXT_PUBLIC_OPENING_HOURS_WEEKDAYS_CLOSE || "23:59";
  const fridayOpen = process.env.NEXT_PUBLIC_OPENING_HOURS_FRIDAY_OPEN || "00:00";
  const fridayClose = process.env.NEXT_PUBLIC_OPENING_HOURS_FRIDAY_CLOSE || "15:00";
  const saturdayOpen = process.env.NEXT_PUBLIC_OPENING_HOURS_SATURDAY_OPEN || "19:00";
  const saturdayClose = process.env.NEXT_PUBLIC_OPENING_HOURS_SATURDAY_CLOSE || "23:59";

  const expertName = process.env.NEXT_PUBLIC_EXPERT_NAME || "שמואל יחזקאל";
  const expertId = `${baseUrl}/#expert`;
  const brandId = `${baseUrl}/#brand`;
  const expertiseTopics = ["הדברת מזיקים", "לכידת חולדות", "הדברת טרמיטים", "הדברת פשפש המיטה", "הדברה ירוקה"];
  
  const today = new Date().toISOString().split('T')[0];

  const graph: any[] = [];

  // Helper to sanitize text for JSON-LD
  const sanitize = (text: string) => {
    if (!text) return "";
    return text
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
      .replace(/"/g, "'") // Replace double quotes with single quotes
      .replace(/\\/g, "\\\\") // Escape backslashes
      .replace(/\n/g, " ") // Replace newlines with spaces
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim();
  };

  // Function to filter reviews by relevance and ensure mandatory fields
  const getRelevantReviews = (currentService?: Service, limit: number = 3) => {
    // 1. Filter reviews that have all mandatory fields for Google Schema
    const validReviews = reviews.filter(r => 
      r.author && 
      r.datePublished && 
      r.reviewBody && 
      r.reviewRating &&
      r.reviewBody.length > 10 // Ensure content is meaningful
    );

    let filtered = validReviews;
    if (currentService) {
      const serviceKeywords = [
        currentService.name,
        currentService.id.replace(/-/g, ' '),
        ...(currentService.id === 'rat-catcher' ? ['חולדה', 'חולדות', 'מכרסמים', 'לוכד'] : []),
        ...(currentService.id === 'mouse-catcher' ? ['עכבר', 'עכברים', 'לוכד'] : []),
        ...(currentService.id === 'termites' ? ['טרמיטים', 'עץ', 'הזרקה'] : []),
        ...(currentService.id === 'bed-bugs' ? ['פשפש', 'עקיצות', 'חום'] : [])
      ];

      filtered = validReviews.filter(r => 
        serviceKeywords.some(keyword => r.reviewBody.includes(keyword))
      );
      
      // If no specific reviews, fall back to general but still valid ones
      if (filtered.length === 0) filtered = validReviews;
    }

    // Sort by date (newest first) and take the limit
    return filtered
      .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
      .slice(0, limit);
  };

  const relevantReviews = getRelevantReviews(service, 3);

  // 1. Organization & LocalBusiness (single source of truth)
  const organizationId = `${baseUrl}/#organization`;
  const localBusiness: any = {
    "@type": ["Organization", "HomeAndConstructionBusiness"],
    "@id": organizationId,
    "name": businessName,
    "legalName": businessName,
    "url": baseUrl,
    "telephone": phone,
    "email": email,
    "logo": logoUrl,
    "image": logoUrl,
    "priceRange": "ILS",
    "sameAs": sameAs,
    "founder": { "@id": expertId },
    "employee": { "@id": expertId },
    "knowsAbout": expertiseTopics,
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": "רישיון מדביר מוסמך",
      "credentialCategory": "certification",
      "recognizedBy": {
        "@type": "Organization",
        "name": "המשרד להגנת הסביבה"
      },
      "identifier": licenseNumber,
      "url": process.env.NEXT_PUBLIC_LICENSE_URL
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": city ? `אזור ${city.name}` : "פריסה ארצית",
      "addressLocality": city?.name || "ישראל",
      "addressRegion": city?.district || "ישראל",
      "addressCountry": "IL"
    },
    "description": type === 'city' && city && service 
      ? sanitize(`שירותי ${service.name} מקצועיים ב${city.name} והסביבה. הגעה מהירה ל${city.neighborhoods?.[0] || city.name} תוך ${city.arrivalTime || '30 דקות'}.`)
      : sanitize(process.env.NEXT_PUBLIC_EXPERT_DESCRIPTION || ""),
    "areaServed": type === 'city' && city ? {
      "@type": "City",
      "name": city.name,
      "sameAs": city.wikidata
    } : type === 'home' ? (citiesData as City[]).map(c => ({
      "@type": "City",
      "name": c.name,
      "sameAs": c.wikidata
    })) : {
      "@type": "Country",
      "name": "Israel"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        "opens": weekdaysOpen,
        "closes": weekdaysClose
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Friday"],
        "opens": fridayOpen,
        "closes": fridayClose
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": saturdayOpen,
        "closes": saturdayClose
      }
    ],
    "specialOpeningHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "validFrom": "2026-04-12",
        "validThrough": "2026-04-19",
        "opens": "00:00",
        "closes": "00:00",
        "description": "חג הפסח - שירות חירום בלבד"
      },
      {
        "@type": "OpeningHoursSpecification",
        "validFrom": "2026-09-11",
        "validThrough": "2026-09-13",
        "opens": "00:00",
        "closes": "00:00",
        "description": "ראש השנה - שירות חירום בלבד"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": parseFloat(ratingValue),
      "reviewCount": parseInt(reviewCount),
      "bestRating": 5,
      "worstRating": 1,
      "itemReviewed": { "@id": organizationId }
    },
    "review": relevantReviews.map((r: any, idx: number) => ({
      "@type": "Review",
      "@id": `${baseUrl}/#review-${idx}`,
      "itemReviewed": { "@id": organizationId },
      "author": { "@type": "Person", "name": sanitize(r.author) },
      "datePublished": r.datePublished,
      "reviewBody": sanitize(r.reviewBody),
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.reviewRating,
        "bestRating": 5,
        "worstRating": 1
      }
    })),
    "potentialAction": [
      {
        "@type": "CommunicateAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `tel:${phone.replace(/-/g, '')}`,
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform"
          ]
        },
        "result": {
          "@type": "PhoneCall",
          "name": "שיחת ייעוץ עם מדביר"
        }
      },
      {
        "@type": "MessageAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `https://wa.me/${phone.replace(/-/g, '').replace(/^0/, '972')}`,
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform"
          ]
        },
        "result": {
          "@type": "Message",
          "name": "הודעת WhatsApp למדביר"
        }
      }
    ]
  };

  if (type === 'home') {
    localBusiness.hasOfferCatalog = {
      "@type": "OfferCatalog",
      "name": "שירותי הדברה מקצועיים",
      "itemListElement": (servicesData as Service[]).map((s) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.name,
          "url": `${baseUrl}/${s.slug}`,
          "description": s.description || `שירותי ${s.name} מקצועיים.`
        }
      }))
    };
  }

  graph.push(localBusiness);

  // 1.1 Expert Person Entity
  graph.push({
    "@type": "Person",
    "@id": expertId,
    "name": expertName,
    "jobTitle": process.env.NEXT_PUBLIC_EXPERT_JOB_TITLE || "מדביר מוסמך",
    "description": process.env.NEXT_PUBLIC_EXPERT_DESCRIPTION,
    "image": process.env.NEXT_PUBLIC_EXPERT_IMAGE_URL || logoUrl,
    "worksFor": { "@id": organizationId },
    "sameAs": sameAs,
    "knowsAbout": expertiseTopics,
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certification",
      "identifier": licenseNumber,
      "name": "רישיון הדברה בתוקף"
    }
  });

  // 1.2 WebPage Entity
  const currentUrl = type === 'home' ? baseUrl :
                    type === 'service' && service ? `${baseUrl}/${service.slug}` :
                    type === 'city' && service && city ? `${baseUrl}/${service.slug}/${city.slug}` :
                    type === 'pest' && pest ? `${baseUrl}/pest-id/${pest.slug}` :
                    type === 'commercial' && venue ? `${baseUrl}/commercial/${venue.slug}` :
                    baseUrl;

  graph.push({
    "@type": "WebPage",
    "@id": `${currentUrl}/#webpage`,
    "url": currentUrl,
    "name": type === 'home' ? businessName : service ? `${service.name} ב${city?.name || 'כל הארץ'}` : businessName,
    "isPartOf": { "@id": `${baseUrl}/#website` },
    "publisher": { "@id": organizationId },
    "description": type === 'city' && city && service 
      ? `שירותי ${service.name} מקצועיים ב${city.name}. מדביר מוסמך זמין כעת להגעה מהירה.` 
      : process.env.NEXT_PUBLIC_EXPERT_DESCRIPTION,
    "breadcrumb": (breadcrumbs && breadcrumbs.length > 0) ? { "@id": `${baseUrl}/#breadcrumb` } : undefined,
    "mainEntity": type === 'city' ? { "@id": organizationId } : service ? { "@id": `${currentUrl}/#service` } : { "@id": organizationId },
    "reviewedBy": { "@id": expertId },
    "lastReviewed": today,
    "author": { "@id": expertId },
    "speakable": {
      "@type": "SpeakableSpecification",
      "xpath": [
        "/html/head/title",
        "/html/body//h1",
        "/html/body//p[1]"
      ]
    },
    "about": service ? { "@id": `${currentUrl}/#service` } : undefined,
    "mentions": city ? [
      {
        "@type": "City",
        "name": city.name,
        "sameAs": city.wikidata || `https://www.wikidata.org/wiki/Special:Search?search=${encodeURIComponent(city.name)}`
      }
    ] : undefined
  });

  // 2. WebSite
  if (type === 'home') {
    graph.push({
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": businessName,
      "publisher": { "@id": organizationId },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    });
  }

  // 3. Service Schema
  if (service) {
    const serviceUrl = city ? `${baseUrl}/${service.slug}/${city.slug}` : `${baseUrl}/${service.slug}`;
    const prices = service.avgPrice?.split('-') || ["250", "500"];
    const minPrice = prices[0]?.trim();
    const maxPrice = prices[1]?.trim();
    const isEmergencyService = service.urgency === 'critical' || service.urgency === 'high';

    graph.push({
      "@type": "Service",
      "@id": `${serviceUrl}/#service`,
      "name": service.name,
      "serviceType": service.name,
      "provider": { "@id": organizationId },
      "brand": { "@id": brandId },
      "additionalType": service.wikidata,
      "areaServed": type === 'city' && city ? {
        "@type": "City",
        "name": city.name,
        "sameAs": city.wikidata
      } : {
        "@type": "Country",
        "name": "Israel"
      },
      "hoursAvailable": isEmergencyService ? [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      ] : undefined,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "ILS",
        "price": minPrice,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": minPrice,
          "maxPrice": maxPrice,
          "priceCurrency": "ILS"
        },
        "availability": "https://schema.org/InStock",
        "url": serviceUrl,
        "warranty": service.warranty,
        "seller": { "@id": organizationId }
      },
      "description": service.description || `שירותי ${service.name} מקצועיים עם אחריות.`,
      "serviceOutput": "סביבה נקייה ממזיקים עם אחריות בכתב",
      "image": service.url ? {
        "@type": "ImageObject",
        "url": service.url.startsWith('http') ? service.url : `${baseUrl}${service.url}`,
        "caption": `${service.name} ב${city?.name || 'פריסה ארצית'} - ${businessName}`,
        "license": "https://cobra1.co.il/terms",
        "acquireLicensePage": "https://cobra1.co.il/contact"
      } : undefined,
    });
  }

  // 4. FAQ Schema
  const allFaqs = [...(faqs || [])];
  
  // Add dynamic FAQs from service preparation
  if (service?.preparation && service.preparation.length > 0) {
    allFaqs.push({
      question: `איך להתכונן להדברת ${service.name}${city ? ` ב${city.name}` : ''}?`,
      answer: `כדי להתכונן ל${service.name}, יש לבצע את הפעולות הבאות: ${service.preparation.join('. ')}`
    });
  }

  // Add dynamic FAQs from pest prevention tips
  if (pest?.preventionTips && pest.preventionTips.length > 0) {
    allFaqs.push({
      question: `איך מונעים את חזרת ${pest.name} לאחר ההדברה?`,
      answer: `למניעת חזרת המזיק מומלץ: ${pest.preventionTips.join('. ')}`
    });
  }

  if (allFaqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${baseUrl}/${service?.slug || ''}/${city?.slug || ''}/#faq`,
      "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": sanitize(faq.question),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": sanitize(faq.answer)
      }
      }))
    });
  }

  // 5. Breadcrumbs Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${baseUrl}/#breadcrumb`,
      "itemListElement": breadcrumbs.map((link, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": link.label,
        "item": link.href.startsWith('http') ? link.href : `${baseUrl}${link.href}`
      }))
    });
  }

  // 6. Pest ID
  if (type === 'pest' && pest) {
    graph.push({
      "@type": "Article",
      "@id": `${baseUrl}/pest-id/${pest.slug}/#article`,
      "headline": `איך מזהים ${pest.name}? מדריך זיהוי ותמונות`,
      "description": pest.description,
      "image": {
        "@type": "ImageObject",
        "url": pest.imageUrl.startsWith('http') ? pest.imageUrl : `${baseUrl}${pest.imageUrl}`,
        "caption": `זיהוי ${pest.name} - ${pest.scientificName}`,
        "license": "https://cobra1.co.il/terms",
        "acquireLicensePage": "https://cobra1.co.il/contact"
      },
      "author": { "@id": expertId },
      "publisher": { "@id": organizationId },
      "mainEntity": {
        "@type": "Taxon",
        "name": pest.scientificName,
        "alternateName": pest.name,
        "description": pest.description,
        "image": pest.imageUrl.startsWith('http') ? pest.imageUrl : `${baseUrl}${pest.imageUrl}`,
        "sameAs": pest.wikidata || `https://en.wikipedia.org/wiki/${pest.scientificName.replace(/ /g, '_')}`
      }
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ 
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph
        }) 
      }}
    />
  );
};

export default JsonLdManager;
