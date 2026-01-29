'use client';

import Image from 'next/image';
import { useRef } from 'react';
import reviewsData from '@/data/reviews.json';

interface Review {
  author: string;
  datePublished: string;
  reviewBody: string;
  reviewRating: number;
  url: string;
  sourceName?: string;
  sourceUrl?: string;
  serviceId?: string;
  cityId?: string;
}

interface ReviewsSectionProps {
  serviceId?: string;
  cityName?: string;
  limit?: number;
}

export default function ReviewsSection({ serviceId, cityName, limit = 6 }: ReviewsSectionProps) {
  // Filter reviews based on serviceId and cityName if provided
  const allReviews = reviewsData as Review[];
  
  // Scoring system for reviews
  const scoredReviews = allReviews.map(review => {
    let score = 0;
    
    // Priority 1: Matching service AND matching city
    if (serviceId && review.serviceId === serviceId && cityName && review.cityId === cityName) {
      score += 100;
    }
    // Priority 2: Matching city only (any service)
    else if (cityName && review.cityId === cityName) {
      score += 50;
    }
    // Priority 3: Matching service only
    else if (serviceId && review.serviceId === serviceId) {
      score += 30;
    }
    
    return { ...review, score };
  });

  // Sort by score (descending) and then by date (not implemented here but could be)
  const sortedReviews = scoredReviews.sort((a, b) => b.score - a.score);
  
  const reviewsToDisplay = sortedReviews.slice(0, limit);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white rounded-3xl shadow-sm border border-gray-100 my-12 overflow-hidden">
      <div className="px-6 md:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            {cityName ? `מה לקוחות ב${cityName} אומרים עלינו` : `מה הלקוחות שלנו אומרים`}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            אלפי לקוחות מרוצים כבר נהנו משירותי הדברה מקצועיים, אמינים ובטוחים. הנה חלק מהביקורות האחרונות שלנו מ-Google Maps.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors border border-gray-200"
            aria-label="גלול שמאלה"
          >
            ‹
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors border border-gray-200"
            aria-label="גלול ימינה"
          >
            ›
          </button>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide pl-12 pr-12">
          {reviewsToDisplay.map((review, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow flex-shrink-0 w-80"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">{review.author}</h3>
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.reviewRating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4 flex-grow italic">
                "{review.reviewBody}"
              </p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-auto text-xs text-gray-500">
                <span>{review.datePublished}</span>
                {review.sourceUrl && (
                  <a 
                    href={review.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    צפייה ב-Google Maps
                  </a>
                )}
              </div>
            </div>
          ))}
          </div>
        </div>

        {reviewsToDisplay.length === 0 && (
          <p className="text-center text-gray-500 py-8">עדיין אין ביקורות לשירות זה. היו הראשונים להמליץ!</p>
        )}
      </div>
    </section>
  );
}
