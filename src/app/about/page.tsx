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
      <div className="max-w-5xl mx-auto space-y-12">
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.9fr] gap-0">
            <div className="relative h-72 md:h-full bg-blue-700">
              <Image
                src="/Shmuel-Yehezkel.jpg"
                alt="שמואל יחזקאל - קוברה הדברה"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-12">
              <a
                href="https://www.gov.il/he/departments/dynamiccollectors/madbirim?skip=0&LicenseNumber=3042"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-1 rounded-full mb-4 hover:bg-blue-100 transition-colors"
              >
                מדביר מוסמך • רישיון 3042
              </a>
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">אודות קוברה הדברה</h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                נעים מאוד, אני שמואל יחזקאל, הבעלים והמדביר הראשי של "קוברה הדברה".
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                הקמתי את קוברה הדברה מתוך מטרה אחת פשוטה: לתת מענה מקצועי, ישר ובטוח לבעיות מזיקים
                בבתים ובעסקים בישראל. אני מאמין שהדברה היא לא רק "לרסס וללכת", אלא תהליך של אבחון,
                פתרון ומניעה.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">איך ג'וק אחד שינה לי את החיים</h2>
              <p className="text-lg text-gray-600 mb-8">
                קטע אישי שמספר איך פחד הפך למקצוע – ואיך נולדה קוברה הדברה.
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 text-blue-900">
                <p className="text-lg font-semibold leading-relaxed">
                  "אני מבינה שמדביר אתה לא תהיה…" — ומשם הכול התחיל.
                </p>
              </div>

              <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                  היי, אני שמואל יחזקאל, בן 40 מחולון. נשוי באושר לחן ואב ל 4 ילדים.
                  הסיפור שלי מתחיל בערב רגוע אחד, כשחן ואני שוכבים במיטה, פנים אל פנים.
                  החדר חשוך, חן כבר ישנה, ואני מתנדנד בין ערות לשינה.
                </p>
                <p>
                  ופתאום – מתוך האפלה – ג'וק מעופף, חום, עם כנפיים רחבות, מתפרץ דרך החלון,
                  מתרסק על הקיר שלצדי… וצונח בדיוק בין הפנים שלנו.
                  חן ישנה. אני – רואה את כל הזוועה מול העיניים.
                </p>
                <p>
                  היצור הדוחה הזה, עם המחושים הענקיים והכנפיים הרועשות, פשוט נחת לנו במיטה.
                  ואז קרה מה שלא קרה מעולם:
                  זינקתי על השידה, צרחתי כמו שלא צרחתי מעולם –
                  "ג'וּקקקקק! איכססס! בעעעע!"
                </p>
                <p>
                  חן התעוררה בבהלה – ואז התפקעה מצחוק.
                  היא ראתה את הג'וק, ראתה אותי, והבינה בפעם הראשונה שיש לי פוביה רצינית ממקקים.
                  היא אפילו שיחקה איתו קצת, כאילו היו חברים…
                  ולפני ששחררה אותו בחזרה לטבע, חייכה אליי ואמרה משפט שלא אשכח לעולם:
                  "אני מבינה שמדביר אתה לא תהיה…"
                </p>
                <p>
                  אותו הלילה כבר לא חזרתי לישון.
                  הפחד הפך להחלטה.
                  החלטה פנימית, שקטה, נחושה:
                  אני הולך להפוך את הפחד הזה למקצוע.
                  "אני אוכל ג’וקים לארוחת בוקר!" חשבתי לעצמי. (בלב… שלא תעז לשמוע אותי!)
                </p>
                <p>
                  התחלתי לחקור: תמונות, סרטונים, כתבות, מאמרים – צללתי לעולם החרקים.
                  ולאט־לאט, משהו בי השתנה:
                  הפחד התחלף בעניין, הגועל הפך לסקרנות.
                  אהבתי את התחכום, את הדרכים המוזרות שבהן הם שומעים, נעים, מתרבים, נלחמים…
                </p>
                <p>
                  בסופו של דבר, למדתי את התחום בצורה מקצועית, עברתי את ההסמכה של המשרד להגנת הסביבה,
                  ועבדתי שנים כשכיר באחת מחברות ההדברה הגדולות בארץ.
                  כשהרגשתי בשל – יצאתי לדרך עצמאית, וכך נולדה קוברה הדברות.
                </p>
                <p>
                  הערכים שלנו פשוטים וברורים:
                  יושרה. אמינות. מקצועיות. והשמדת ג'וקים – באהבה.
                </p>
                <p>
                  ולסיום – אם תפגשו אחד…
                  אל תהרגו אותו. תשאירו לי את התענוג. 😉
                </p>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3">תמצית מהירה</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span>🏡</span>
                    בן 40 מחולון, נשוי ואבא ל־4
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🎓</span>
                    מוסמך מטעם המשרד להגנת הסביבה
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🧪</span>
                    ניסיון מקצועי בחברות מובילות
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <p className="text-sm text-gray-500 mb-3 font-medium">רישיון הדברה</p>
                <div className="relative w-full h-80 rounded-xl overflow-hidden">
                  <Image
                    src="/Pest_Control_License.jpg"
                    alt="רישיון הדברה של שמואל יחזקאל"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
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
