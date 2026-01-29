import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-50" dir="rtl">
      <div className="max-w-md w-full text-center">
        {/* איור או אייקון של מזיק "אבוד" */}
        <div className="text-9xl mb-8 animate-bounce">
          🐜
        </div>
        
        <h1 className="text-6xl font-black text-blue-900 mb-4 font-heebo">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4 font-heebo">
          אופס! הדף הזה חמק לנו...
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          נראה שהדף שחיפשת לא נמצא. אולי הוא עבר הדברה? 
          בכל מקרה, אנחנו כאן כדי לעזור לך להיפטר מכל מזיק אחר.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-200"
          >
            חזרה לדף הבית
          </Link>
          
          <a 
            href="tel:0502138028"
            className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-bold transition-all"
          >
            דברו עם מדביר
          </a>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-400">
            מחפש שירות ספציפי? נסה להשתמש בתפריט הניווט למעלה.
          </p>
        </div>
      </div>
    </main>
  );
}
