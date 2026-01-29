import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'הצהרת נגישות | קוברה הדברה',
  description: 'הצהרת נגישות של אתר קוברה הדברה - מחויבותנו להנגשת האתר לכלל האוכלוסייה.',
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-900 border-b pb-4">הצהרת נגישות</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">מבוא</h2>
            <p>
              אנו בקוברה הדברה רואים חשיבות עליונה במתן שירות שוויוני, מכובד, נגיש ומקצועי לכלל לקוחותינו. בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, תשנ"ח-1998 ולתקנות שהותקנו מכוחו, אנו משקיעים מאמצים ומשאבים רבים בביצוע התאמות נגישות שיאפשרו לאדם עם מוגבלות לקבל את השירותים הניתנים לכלל הלקוחות, באופן עצמאי ושוויוני.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">נגישות אתר האינטרנט</h2>
            <p>
              אתר אינטרנט נגיש הוא אתר המאפשר לאנשים עם מוגבלות ולאנשים מבוגרים לגלוש באותה רמה של יעילות והנאה ככל הגולשים. 
              אנו מאמינים ופועלים למען שוויון הזדמנויות במרחב הדיגיטלי לאנשים עם לקויות מגוונות ואנשים המסתייעים בטכנולוגיה מסייעת לשימוש במחשב.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>האתר עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.</li>
              <li>התאמות הנגישות בוצעו עפ"י המלצות התקן הישראלי (ת"י 5568) לנגישות תכנים באינטרנט ברמת AA ומסמך WCAG2.0 הבינלאומי.</li>
              <li>האתר מותאם לתצוגה בדפדפנים הנפוצים ולשימוש בטלפון הסלולרי.</li>
              <li>הניווט באתר פשוט וברור.</li>
              <li>תכני האתר כתובים בשפה פשוטה, ברורה ומאורגנת היטב באמצעות כותרות ורשימות.</li>
              <li>האתר מותאם לגולשים המשתמשים במקלדת בלבד.</li>
              <li>האתר מותאם לשימוש בטכנולוגיות מסייעות (כגון קורא מסך).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">הסדרי נגישות פיזיים</h2>
            <p>
              שירותי ההדברה שלנו ניתנים בבית הלקוח או בבית העסק שלו. המדבירים שלנו מונחים לתת שירות מונגש ומותאם לצרכי הלקוח בשטח, כולל הסברים מפורטים בכתב ובעל פה והתאמת אופן ביצוע העבודה למגבלות פיזיות במידת הצורך.
            </p>
          </section>

          <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">דרכי פנייה לבקשות והצעות לשיפור בנושא נגישות</h2>
            <p className="mb-4">
              חשוב לציין כי למרות מאמצינו להנגיש את כלל הדפים באתר, ייתכן ויתגלו חלקים או יכולות שלא הונגשו כראוי או שטרם הונגשו.
              אם נתקלתם בבעיה בנושא נגישות באתר, נשמח אם תעדכנו אותנו כדי שנוכל לתקן ולשפר.
            </p>
            <div className="space-y-2 font-medium text-blue-900">
              <p>רכז נגישות: {process.env.NEXT_PUBLIC_EXPERT_NAME || 'שמואל יחזקאל'}</p>
              <p>טלפון: {process.env.NEXT_PUBLIC_PHONE || '050-2138028'}</p>
              <p>דוא"ל: {process.env.NEXT_PUBLIC_EMAIL || 'office@cobra1.co.il'}</p>
            </div>
          </section>

          <p className="text-sm text-gray-500 mt-8">
            עדכון אחרון להצהרה: ינואר 2026
          </p>
        </div>
      </div>
    </main>
  );
}
