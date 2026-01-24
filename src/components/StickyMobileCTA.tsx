export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden z-50">
      <a
        href="tel:0500000000"
        className="flex items-center justify-center w-full bg-green-600 text-white font-bold py-4 rounded-xl text-xl shadow-lg active:scale-95 transition-transform"
      >
        <span className="mr-2">📞</span>
        התקשרו עכשיו לייעוץ חינם
      </a>
    </div>
  );
}
