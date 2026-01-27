interface DynamicPricingCardProps {
  serviceName: string;
  cityName: string;
  priceRange: string;
  warranty?: string;
  safety?: string;
  duration?: string;
}

export default function DynamicPricingCard({
  serviceName,
  cityName,
  priceRange,
  warranty,
  safety,
  duration,
}: DynamicPricingCardProps) {
  return (
    <div className="bg-white border-2 border-blue-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-2xl font-bold mb-6 text-blue-900">מחירון ופרטי שירות</h3>
      
      <div className="space-y-6">
        <div className="pb-6 border-b border-gray-100">
          <p className="text-lg text-gray-700">
            מחיר עבור <span className="font-semibold">{serviceName}</span> ב<span className="font-semibold">{cityName}</span> מתחיל ב-
            <span className="text-3xl font-bold text-blue-600 mx-2">{priceRange.split('-')[0]}</span>
            ₪
          </p>
          <p className="mt-2 text-sm text-gray-500">
            * המחיר הממוצע נע בין {priceRange} ₪ ותלוי במורכבות העבודה.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {warranty && (
            <div className="flex items-center gap-3 text-gray-700 bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
              <span className="text-2xl">🛡️</span>
              <div>
                <p className="text-xs text-blue-600 font-bold">אחריות בכתב</p>
                <p className="font-bold text-blue-900">{warranty}</p>
              </div>
            </div>
          )}
          {safety && (
            <div className="flex items-center gap-3 text-gray-700 bg-green-50/50 p-3 rounded-xl border border-green-100/50">
              <span className="text-2xl">🌿</span>
              <div>
                <p className="text-xs text-green-600 font-bold">רמת בטיחות</p>
                <p className="font-bold text-green-900">{safety}</p>
              </div>
            </div>
          )}
          {duration && (
            <div className="flex items-center gap-3 text-gray-700 bg-orange-50/50 p-3 rounded-xl border border-orange-100/50">
              <span className="text-2xl">⏱️</span>
              <div>
                <p className="text-xs text-orange-600 font-bold">זמן עבודה משוער</p>
                <p className="font-bold text-orange-900">{duration}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
