'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  serviceName: string;
  cityName: string;
  title?: string;
}

export default function FAQSection({ faqs, serviceName, cityName, title }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 my-12" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <h2 className="text-3xl font-bold mb-8 text-blue-900 text-center">
        {title || `שאלות ותשובות על ${serviceName} ב${cityName}`}
      </h2>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-right p-5 flex justify-between items-center bg-gray-50 hover:bg-blue-50 transition-colors"
            >
              <span className="font-bold text-lg text-blue-900">{faq.question}</span>
              <span className={`transform transition-transform duration-200 text-blue-600 ${openIndex === index ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 text-gray-700 leading-relaxed border-t border-gray-100 bg-white">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
