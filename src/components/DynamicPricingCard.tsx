interface DynamicPricingCardProps {
  serviceName: string;
  cityName: string;
  priceRange: string;
}

export default function DynamicPricingCard({
  serviceName,
  cityName,
  priceRange,
}: DynamicPricingCardProps) {
  return (
    <div className="bg-white border-2 border-blue-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-2xl font-bold mb-4 text-blue-900">מחירון שירות</h3>
      <p className="text-lg text-gray-700">
        מחיר עבור <span className="font-semibold">{serviceName}</span> ב<span className="font-semibold">{cityName}</span> מתחיל ב-
        <span className="text-3xl font-bold text-blue-600 mx-2">{priceRange.split('-')[0]}</span>
        ₪
      </p>
      <p className="mt-4 text-sm text-gray-500">
        * המחיר הממוצע נע בין {priceRange} ₪ ותלוי במורכבות העבודה.
      </p>
    </div>
  );
}
