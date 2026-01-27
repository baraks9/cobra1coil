import { City, Service } from '@/lib/data';

interface LocalContextProps {
  city: City;
  service: Service;
}

export default function LocalContext({ city, service }: LocalContextProps) {
  const mainNeighborhood = city.neighborhoods?.[0];
  const secondaryNeighborhood = city.neighborhoods?.[1];
  
  // Create variations of text based on city ID to prevent duplicates
  const textVariants = [
    `תושבי ${city.name} והסביבה, אנו מבינים שנוכחות של ${service.name} מצריכה מענה מהיר. בין אם אתם גרים ב${mainNeighborhood || 'מרכז העיר'} או ב${secondaryNeighborhood || 'שכונות הסמוכות'}, צוות המדבירים שלנו זמין להגעה תוך פחות מ-${city.arrivalTime || 'שעה'}.`,
    `מחפשים ${service.name} ב${city.name}? המדבירים שלנו כבר ביצעו מעל ${city.completedJobs || '150'} עבודות באזורכם השנה. אנו מכירים היטב את אתגרי המזיקים הייחודיים ל${city.name}, במיוחד בשכונות כמו ${mainNeighborhood || city.name}.`,
    `שירותי ה${service.name} שלנו ב${city.name} מותאמים אישית לסוג המבנה שלכם. הגענו לאחרונה לטיפולים מוצלחים ב${mainNeighborhood || 'אזור'} וגם ב${secondaryNeighborhood || 'סביבה'}, ואנו מצוידים בחומרים הבטוחים ביותר למשפחה שלכם.`
  ];

  const selectedText = textVariants[parseInt(city.id) % textVariants.length];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50 mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-sm font-bold text-green-700">מדביר פעיל כעת באזור {city.name}</span>
      </div>
      <p className="text-lg text-gray-700 leading-relaxed">
        {selectedText}
      </p>
    </div>
  );
}
