import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'תנאי שימוש | קוברה הדברה',
  description: 'תנאי השימוש באתר קוברה הדברה. מידע על אחריות, שירותים ושימוש בתוכן האתר.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">תנאי שימוש</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>
            השימוש באתר "קוברה הדברה" (להלן: "האתר") כפוף לתנאים המפורטים להלן. גלישה באתר מהווה הסכמה לתנאים אלו.
          </p>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3">1. התוכן באתר</h2>
            <p>
              המידע המופיע באתר, לרבות מדריכי זיהוי מזיקים וטיפים למניעה, נועד למטרות אינפורמטיביות בלבד ואינו מהווה תחליף לייעוץ מקצועי של מדביר מוסמך בשטח.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3">2. שירותי הדברה ואחריות</h2>
            <p>
              מתן שירותי ההדברה בפועל מותנה בתיאום מראש ובבדיקת תנאי השטח. האחריות על עבודות ההדברה ניתנת בכתב בסיום כל עבודה, ומשך האחריות משתנה בהתאם לסוג המזיק והטיפול שבוצע.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3">3. קניין רוחני</h2>
            <p>
              כל הזכויות על התוכן, העיצוב, התמונות והקוד באתר שמורות לקוברה הדברה. אין להעתיק, לשכפל או להשתמש בתוכן האתר ללא אישור מפורש בכתב.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3">4. הגבלת אחריות</h2>
            <p>
              קוברה הדברה לא תישא באחריות לכל נזק שייגרם כתוצאה משימוש במידע המופיע באתר ללא התייעצות עם איש מקצוע.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3">5. סמכות שיפוט</h2>
            <p>
              על תנאי שימוש אלו יחולו חוקי מדינת ישראל, וכל מחלוקת תידון בבית המשפט המוסמך במחוז המרכז.
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
