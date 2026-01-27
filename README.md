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
