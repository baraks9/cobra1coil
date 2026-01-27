import React from 'react';
import { Service, City, Pest, Venue } from '@/lib/data';
import { FAQItem } from '@/lib/faqUtils';
import reviews from '@/data/reviews.json';

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
  
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL;
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL;
  const googleMapsUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL;
  const sameAs = [facebookUrl, youtubeUrl, googleMapsUrl].filter(Boolean) as string[];

  const weekdaysOpen = process.env.NEXT_PUBLIC_OPENING_HOURS_WEEKDAYS_OPEN || "00:00";
  const weekdaysClose = process.env.NEXT_PUBLIC_OPENING_HOURS_WEEKDAYS_CLOSE || "23:59";
  const fridayOpen = process.env.NEXT_PUBLIC_OPENING_HOURS_FRIDAY_OPEN || "00:00";
  const fridayClose = process.env.NEXT_PUBLIC_OPENING_HOURS_FRIDAY_CLOSE || "15:00";
  const saturdayOpen = process.env.NEXT_PUBLIC_OPENING_HOURS_SATURDAY_OPEN || "19:00";
  const saturdayClose = process.env.NEXT_PUBLIC_OPENING_HOURS_SATURDAY_CLOSE || "23:59";

  const expertName = process.env.NEXT_PUBLIC_EXPERT_NAME || "שמואל יחזקאל";
  const expertId = `${baseUrl}/#expert`;

  const graph: any[] = [];

  // 1. Organization & LocalBusiness (The Core Entity)
  const organizationId = `${baseUrl}/#organization`;
  const localBusiness: any = {
    "@type": "LocalBusiness",
    "@id": organizationId,
    "name": businessName,
    "url": baseUrl,
    "telephone": phone,
    "email": email,
    "logo": logoUrl,
    "image": logoUrl,
    "priceRange": "₪₪",
    "sameAs": sameAs,
    "founder": { "@id": expertId },
    "employee": { "@id": expertId },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": city ? `אזור ${city.name}` : "פריסה ארצית",
      "addressLocality": city?.name || "ישראל",
      "addressRegion": city?.district || "ישראל",
      "addressCountry": "IL"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": city?.lat || "32.0853",
        "longitude": city?.lng || "34.7818"
      },
      "geoRadius": city ? "15000" : "100000"
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "987"
    },
    "review": reviews.slice(0, 5).map(r => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": r.author },
      "datePublished": r.datePublished,
      "reviewBody": r.reviewBody,
      "reviewRating": { "@type": "Rating", "ratingValue": r.reviewRating }
    }))
  };

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
    "sameAs": sameAs // Connecting the expert to the same social profiles
  });

  // 2. WebSite (Search Box)
  if (type === 'home') {
    graph.push({
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": businessName,
      "publisher": { "@id": organizationId },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });
  }

  // 3. Service Schema
  if (service) {
    const serviceUrl = city ? `${baseUrl}/${service.slug}/${city.slug}` : `${baseUrl}/${service.slug}`;
    const minPrice = service.avgPrice?.split('-')[0]?.trim() || "250";
    
    graph.push({
      "@type": "Service",
      "@id": `${serviceUrl}/#service`,
      "name": service.name,
      "serviceType": service.name,
      "provider": { "@id": organizationId },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": city?.lat || "32.0853",
          "longitude": city?.lng || "34.7818"
        },
        "geoRadius": city ? "15000" : "100000"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "ILS",
        "price": minPrice,
        "availability": "https://schema.org/InStock",
        "url": serviceUrl
      },
      "description": service.description || `שירותי ${service.name} מקצועיים עם אחריות.`,
      "image": service.url ? {
        "@type": "ImageObject",
        "url": service.url,
        "caption": `${service.name} ב${city?.name || 'פריסה ארצית'} - ${businessName}`
      } : undefined,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "987"
      },
      "review": reviews.slice(0, 3).map(r => ({
        "@type": "Review",
        "author": { "@type": "Person", "name": r.author },
        "datePublished": r.datePublished,
        "reviewBody": r.reviewBody,
        "reviewRating": { "@type": "Rating", "ratingValue": r.reviewRating }
      }))
    });
  }

  // 4. FAQ Schema
  if (faqs && faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${baseUrl}/${service?.slug || ''}/${city?.slug || ''}/#faq`,
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
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

  // 6. Pest ID (Article/Taxon)
  if (type === 'pest' && pest) {
    graph.push({
      "@type": "Article",
      "@id": `${baseUrl}/pest-id/${pest.slug}/#article`,
      "headline": `זיהוי ${pest.name} (${pest.scientificName})`,
      "description": pest.description,
      "image": {
        "@type": "ImageObject",
        "url": pest.imageUrl,
        "caption": `זיהוי ${pest.name} - ${pest.scientificName}`
      },
      "author": { "@id": organizationId },
      "publisher": { "@id": organizationId },
      "mainEntity": {
        "@type": "Taxon",
        "name": pest.scientificName,
        "alternateName": pest.name,
        "description": pest.description,
        "image": pest.imageUrl
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
