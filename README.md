# אתר שירותי הדברה

אתר Next.js לשירותי הדברה מקצועיים – דפים דינמיים לפי שירות, עיר ומזיק, עם תמיכה מלאה ב-RTL ו-SEO.

## טכנולוגיות

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**

## התחלה

```bash
npm install
npm run dev
```

פתח [http://localhost:3000](http://localhost:3000) בדפדפן.

### סקריפטים

| סקריפט   | תיאור                          |
|----------|---------------------------------|
| `npm run dev`   | שרת פיתוח עם HMR             |
| `npm run build` | בניית גרסה ל-production      |
| `npm run start` | הרצת האפליקציה לאחר build   |
| `npm run lint`  | הרצת ESLint                  |

## אסטרטגיית SEO ותוכן

הפרויקט כולל מערכת מתקדמת למניעת קניבליזציה של מילות מפתח ולמקסום הדירוג בגוגל:

### 1. בידול כוונת חיפוש (Search Intent)
*   **דפי זיהוי מזיקים (`pest-id`):** תוכן אינפורמטיבי/לימודי בלבד. Schema מסוג `Article` ו-`Taxon`.
*   **דפי שירות ארציים:** דפי "עמוד עוגן" (Pillar Pages) עם מחירונים ומדריכים מקצועיים. Schema מסוג `Service`.
*   **דפי ערים:** דפי המרה מקומיים עם דגש על זמינות ומהירות הגעה. Schema מסוג `LocalBusiness`.

### 2. תוכן מקומי דינמי (Hyper-Local Content)
דפי הערים נוצרים אוטומטית עם בידול עמוק:
*   **הזרקת נתונים:** שילוב שמות שכונות, זמני הגעה ומספר עבודות שבוצעו בכל עיר.
*   **תיעדוף בעיות:** הצגת מזיקים רלוונטיים לפי סוג העיר (למשל: ערי חוף לעומת ערי פנים).
*   **מערכת ביקורות חכמה:** תיעדוף אוטומטי של ביקורות מהעיר הספציפית או על השירות הספציפי.

### 3. בידול B2B לעומת B2C
הפרדה מוחלטת בטרמינולוגיה בין דפי עסקים (מסעדות, משרדים) לדפי מגורים פרטיים, כדי למנוע תחרות על אותם ביטויים ולשפר אחוזי המרה.

## מבנה הפרויקט

```
src/
├── app/                 # דפים (App Router)
│   ├── page.tsx         # דף הבית
│   ├── layout.tsx       # תבנית ראשית (Header, Footer)
│   ├── [service]/       # דפי שירות (למשל /risus-labayit)
│   │   └── [city]/      # שירות בעיר מסוימת
│   ├── pest-id/         # זיהוי מזיקים
│   │   └── [pest]/      # דף מזיק בודד
│   ├── commercial/      # שירותים מסחריים
│   │   └── [venue]/     # דף מקום/סוג עסק
│   ├── about/           # אודות
│   ├── privacy/         # פרטיות
│   ├── terms/           # תנאי שימוש
│   ├── sitemap.ts       # מפת אתר
│   └── robots.ts        # robots.txt
├── components/          # רכיבי React
│   ├── Header.tsx, Footer.tsx
│   ├── HeroSection.tsx, UrgencyBanner.tsx
│   ├── DynamicPricingCard.tsx, RelatedServices.tsx
│   ├── JsonLdManager.tsx, ReviewsSection.tsx, FAQSection.tsx
│   └── ...
├── data/                # נתונים (JSON)
│   ├── services.json    # שירותי הדברה
│   ├── cities.json     # ערים
│   ├── pests.json      # מזיקים
│   ├── problems.json   # בעיות נפוצות
│   ├── venues.json     # מקומות מסחריים
│   └── reviews.json   # ביקורות
└── lib/
    ├── data.ts         # פונקציות לטיפול בנתונים
    └── routes.ts       # בניית URL לדפים
```

## נתונים (Data)

התוכן נשמר ב-`src/data/` כקבצי JSON. עדכון שירותים, ערים, מזיקים או בעיות נעשה שם; `src/lib/data.ts` מספק פונקציות כמו `getServices()`, `getCityBySlug()`, `getPestBySlug()` וכדומה.

## משתני סביבה

קובץ `.env.local` משמש להגדרות מקומיות (אם קיימות). וודא שהוא לא נכלל ב-Git (מופיע ב-`.gitignore`).

## פריסה (Vercel)

ניתן לפרוס ל-[Vercel](https://vercel.com) ישירות מה-repo. ראה [תיעוד הפריסה של Next.js](https://nextjs.org/docs/app/building-your-application/deploying).
