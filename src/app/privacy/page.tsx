import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות | קוברה הדברה',
  description: 'מדיניות הפרטיות של אתר קוברה הדברה. אנו מחויבים לשמירה על פרטיות המשתמשים שלנו.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">מדיניות פרטיות</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>
            ברוכים הבאים לאתר "קוברה הדברה". אנו מכבדים את פרטיותכם ומחויבים להגן על המידע האישי שאתם משתפים איתנו.
          </p>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3">1. המידע שאנו אוספים</h2>
            <p>
              אנו אוספים מידע שאתם מספקים לנו באופן יזום, כגון שם, מספר טלפון וכתובת בעת פנייה לקבלת שירות או ייעוץ. בנוסף, האתר עשוי לאסוף מידע טכני אנונימי (כמו כתובת IP וסוג דפדפן) לצורך שיפור חווית המשתמש.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3">2. השימוש במידע</h2>
            <p>
              המידע שנאסף משמש אך ורק לצורך מתן שירותי הדברה, יצירת קשר עם הלקוח, ושיפור השירותים הניתנים באתר. אנו לא מוכרים או משתפים את המידע שלכם עם צדדים שלישיים למטרות שיווק.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3">3. אבטחת מידע</h2>
            <p>
              אנו נוקטים באמצעי אבטחה מקובלים כדי להגן על המידע האישי שלכם מפני גישה לא מורשית, שינוי או חשיפה.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3">4. עוגיות (Cookies)</h2>
            <p>
              האתר עשוי להשתמש בעוגיות לצורך תפעולו השוטף ואיסוף נתונים סטטיסטיים על השימוש בו. ניתן לבטל את השימוש בעוגיות דרך הגדרות הדפדפן שלכם.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3">5. יצירת קשר</h2>
            <p>
              בכל שאלה בנושא מדיניות הפרטיות, ניתן ליצור איתנו קשר בטלפון: 050-213-8028 או במייל: office@cobra1.co.il.
            </p>
          </section>
          
          <p className="text-sm text-gray-500 pt-8 border-t border-gray-100">
            עודכן לאחרונה: ינואר 2026
          </p>
        </div>
      </div>
    </main>
  );
}
