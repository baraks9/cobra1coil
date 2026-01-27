import React from 'react';
import { Service, City } from '@/lib/data';
import reviews from '@/data/reviews.json';

interface LocalBusinessSchemaProps {
  service?: Service;
  city?: City;
}

const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({ service, city }) => {
  // 1. נתונים בסיסיים ממשתני הסביבה
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || "קוברה הדברות";
  const phone = process.env.NEXT_PUBLIC_PHONE || "050-213-8028";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.cobra-pest.co.il";
  
  // שעות פעילות ממשתני הסביבה
  const weekdaysOpen = process.env.NEXT_PUBLIC_OPENING_HOURS_WEEKDAYS_OPEN || "00:00";
  const weekdaysClose = process.env.NEXT_PUBLIC_OPENING_HOURS_WEEKDAYS_CLOSE || "23:59";
  const fridayOpen = process.env.NEXT_PUBLIC_OPENING_HOURS_FRIDAY_OPEN || "00:00";
  const fridayClose = process.env.NEXT_PUBLIC_OPENING_HOURS_FRIDAY_CLOSE || "15:00";
  const saturdayOpen = process.env.NEXT_PUBLIC_OPENING_HOURS_SATURDAY_OPEN || "19:00";
  const saturdayClose = process.env.NEXT_PUBLIC_OPENING_HOURS_SATURDAY_CLOSE || "23:59";

  // לוגיקה לשם ותיאור דינמיים
  let name = businessName;
  let description = `שירותי הדברה מקצועיים בפריסה ארצית על ידי ${businessName}. מדבירים מוסמכים, זמינות 24/7 ואחריות מלאה.`;
  let url = baseUrl;
  let serviceArea = "ישראל";

  if (service && city) {
    name = `${service.name} ב${city.name} - ${businessName}`;
    description = `זקוקים ל${service.name} ב${city.name}? ${businessName} מספקים שירותי הדברה מקצועיים, בטוחים ויעילים ב${city.name} והסביבה. זמינות גבוהה ואחריות מלאה.`;
    url = `${baseUrl}/${service.slug}/${city.slug}`;
    serviceArea = city.name;
  } else if (city) {
    name = `הדברה ב${city.name} - ${businessName}`;
    description = `שירותי הדברה מקצועיים ב${city.name}. ${businessName} מציעים פתרונות לכל סוגי המזיקים עם מדבירים מוסמכים ב${city.name}.`;
    url = `${baseUrl}/risus-labayit/${city.slug}`;
    serviceArea = city.name;
  } else if (service) {
    name = `${service.name} - ${businessName}`;
    description = `שירותי ${service.name} מקצועיים בפריסה ארצית. ${businessName} מתמחים ב${service.name} עם תוצאות מוכחות ואחריות.`;
    url = `${baseUrl}/${service.slug}`;
  }

  // בניית ה-Graph בצורה דינמית
  const graph: any[] = [
    {
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#organization`,
      "name": businessName,
      "url": baseUrl,
      "telephone": phone,
      "image": `${baseUrl}/logo.png`,
      "priceRange": "₪₪",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": city ? `אזור ${city.name}` : "פריסה ארצית",
        "addressLocality": city?.name || "ישראל",
        "addressRegion": city?.district || "ישראל",
        "addressCountry": "IL"
      },
      "geo": {
        "@type": "GeoCircle",
        "itemOffered": {
          "@type": "Service",
          "name": "שירותי הדברה"
        },
        "address": city?.name || "ישראל"
      },
      "areaServed": {
        "@type": "City",
        "name": serviceArea
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
      "review": reviews.map(r => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": r.author
        },
        "datePublished": r.datePublished,
        "reviewBody": r.reviewBody,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": r.reviewRating
        }
      }))
    }
  ];

  // הוספת Service Schema אם קיים שירות
  if (service) {
    const minPrice = service.avgPrice?.split('-')[0]?.trim() || "250";
    
    graph.push({
      "@type": "Service",
      "@id": `${url}/#service`,
      "serviceType": service.name,
      "provider": { "@id": `${baseUrl}/#organization` },
      "description": description,
      "areaServed": {
        "@type": "City",
        "name": serviceArea
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "ILS",
        "price": minPrice,
        "availability": "https://schema.org/InStock"
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

export default LocalBusinessSchema;
