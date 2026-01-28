import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'אודות קוברה הדברה | שמואל יחזקאל - מדביר מוסמך',
  description: 'הכירו את קוברה הדברה בניהולו של שמואל יחזקאל. ניסיון רב שנים, רישיון מדביר בתוקף ושירות ללא פשרות.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 relative h-80 md:h-auto bg-blue-600">
              <Image
                src="/Shmuel-Yechizkel.jpg"
                alt="שמואל יחזקאל - קוברה הדברה"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-2/3 p-8 md:p-12">
              <h1 className="text-4xl font-bold text-blue-900 mb-6">אודות קוברה הדברה</h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                נעים מאוד, אני שמואל יחזקאל, הבעלים והמדביר הראשי של "קוברה הדברה".
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                הקמתי את קוברה הדברה מתוך מטרה אחת פשוטה: לתת מענה מקצועי, ישר ובטוח לבעיות מזיקים בבתים ובעסקים בישראל. אני מאמין שהדברה היא לא רק "לרסס וללכת", אלא תהליך של אבחון, פתרון ומניעה.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📜</span>
                  <div>
                    <h3 className="font-bold text-blue-900">רישיון מוסמך</h3>
                    <p className="text-sm text-gray-500">מספר רישיון 3042 מטעם המשרד להגנת הסביבה.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🌿</span>
                  <div>
                    <h3 className="font-bold text-blue-900">הדברה ירוקה</h3>
                    <p className="text-sm text-gray-500">שימוש בחומרים בטוחים בלבד המאושרים לשימוש ביתי.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <h3 className="font-bold text-blue-900">אחריות מלאה</h3>
                    <p className="text-sm text-gray-500">אנו עומדים מאחורי כל עבודה עם תעודת אחריות בכתב.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <h3 className="font-bold text-blue-900">שירות אישי</h3>
                    <p className="text-sm text-gray-500">זמינות גבוהה, עמידה בזמנים ויחס אדיב לכל לקוח.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">החזון שלנו</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            בקוברה הדברה, אנו שואפים להיות חברת ההדברה המובילה בישראל מבחינת איכות השירות והאמינות. אנו משקיעים ללא הרף בלימוד שיטות הדברה חדישות, רכישת ציוד טכנולוגי מתקדם ושימוש בחומרים הידידותיים ביותר לסביבה ולדיירי הבית.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            ההצלחה שלנו נמדדת בשקט הנפשי של הלקוחות שלנו. כשאתם מזמינים אותנו, אתם יכולים להיות בטוחים שהבעיה תיפתר מהשורש, בצורה המקצועית והבטוחה ביותר.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link 
              href="tel:0502138028"
              className="px-8 py-4 bg-blue-600 text-white text-center rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md"
            >
              התקשרו לייעוץ חינם
            </Link>
            <Link 
              href="/"
              className="px-8 py-4 bg-gray-100 text-gray-700 text-center rounded-xl font-bold text-lg hover:bg-gray-200 transition-all"
            >
              חזרה לדף הבית
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
