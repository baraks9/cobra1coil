import { Service, City } from './data';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQTemplate {
  questions: {
    q: string;
    a: string[]; // Multiple answer variations for uniqueness
  }[];
}

export const faqTemplates: Record<string, FAQTemplate> = {
  'rat-catcher': {
    questions: [
      {
        q: "תוך כמה זמן מגיע לוכד חולדות ל{city}?",
        a: [
          "אנו מפעילים צוותים בפריסה רחבה ב{city}, מה שמאפשר לנו להגיע אליך תוך פחות מ-40 דקות ברוב שעות היממה.",
          "המדבירים שלנו נמצאים בקרבת {city} באופן קבוע, לכן זמן ההגעה הממוצע לקריאת חירום הוא כ-30 עד 60 דקות.",
          "בזכות הזמינות הגבוהה שלנו באזור {city}, נוכל לשלוח לוכד מוסמך שיגיע אליך במהירות המרבית, בדרך כלל תוך שעה אחת."
        ]
      },
      {
        q: "האם אתם משתמשים ברעלים ללכידת חולדות ב{city}?",
        a: [
          "אנו מעדיפים שימוש במלכודות הומניות ומתקדמות. במידה ונדרש שימוש ברעל, הוא נעשה בתוך תיבות האכלה בטיחותיות ונעולות.",
          "בטיחות הלקוחות שלנו ב{city} היא מעל הכל. אנו משתמשים בשיטות לכידה ללא רעלים ככל הניתן, ובמקרה הצורך משתמשים בחומרים המאושרים על ידי המשרד להגנת הסביבה.",
          "השיטה שלנו ב{city} מבוססת על ניטור ואיטום. אנו משתמשים ברעלים רק כמוצא אחרון ובצורה מבוקרת מאוד בתוך תיבות בטיחות."
        ]
      }
    ]
  },
  'termites': {
    questions: [
      {
        q: "האם טרמיטים נפוצים בבניינים ב{city}?",
        a: [
          "כן, אזור {city} ידוע בפעילות טרמיטים ערה עקב סוג הקרקע. אנו ממליצים על בדיקה שנתית למשקופים ורהיטי עץ.",
          "לצערינו אנו נתקלים בהרבה מקרי טרמיטים ב{city}. חשוב לזהות את הבעיה מוקדם כדי למנוע נזק בלתי הפיך ליסודות הבית.",
          "ב{city} ישנה נגיעות של טרמיטי קרקע. הטיפול שלנו כולל יצירת חסם כימי סביב המבנה להגנה מקסימלית."
        ]
      },
      {
        q: "כמה זמן נמשכת האחריות על הדברת טרמיטים ב{city}?",
        a: [
          "אנו מעניקים אחריות מלאה בכתב ל-5 שנים על כל טיפול בטרמיטים ב{city}, כולל בדיקות תקופתיות.",
          "הטיפול שלנו ב{city} כולל אחריות ארוכת טווח ל-5 שנים. אנחנו עומדים מאחורי איכות העבודה והחומרים שלנו.",
          "בגלל מורכבות הטיפול, לקוחותינו ב{city} מקבלים תעודת אחריות ל-5 שנים המבטיחה שקט נפשי מלא."
        ]
      }
    ]
  },
  'default': {
    questions: [
      {
        q: "האם חומרי ההדברה בטוחים לילדים וחיות מחמד ב{city}?",
        a: [
          "בהחלט. אנו משתמשים בחומרים ירוקים על בסיס פירטרואידים, המאושרים לשימוש ביתי ובטוחים לחלוטין לאחר ייבוש קצר.",
          "בכל הדברה שאנו מבצעים ב{city}, אנו שמים דגש על בטיחות. החומרים מאושרים על ידי המשרד להגנת הסביבה ואינם מסוכנים לדיירי הבית.",
          "אנו משתמשים בשיטות הדברה מתקדמות ובטוחות. לאחר הטיפול ב{city}, נספק לכם הנחיות ברורות מתי ניתן לחזור לבית בבטחה."
        ]
      },
      {
        q: "כמה עולה שירות {service} ב{city}?",
        a: [
          "המחיר ל{service} ב{city} מתחיל בדרך כלל מ-{price} ש\"ח, ותלוי בגודל השטח ובחומרת הבעיה.",
          "אנו מציעים מחירים הוגנים ותחרותיים ב{city}. עלות ה{service} נעה בין {price} ש\"ח בממוצע.",
          "הצעת המחיר ל{service} ב{city} ניתנת לאחר הבנת היקף העבודה, אך המחירים הבסיסיים שלנו מתחילים ב-{price} ש\"ח."
        ]
      }
    ]
  }
};

/**
 * Selects a deterministic variation based on a string (e.g., city name)
 */
function getVariation<T>(items: T[], seed: string): T {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % items.length;
  return items[index];
}

export function getUniqueFAQ(service: Service, city?: City): FAQItem[] {
  const cityName = city?.name || "כל הארץ";
  const template = faqTemplates[service.id] || faqTemplates['default'];
  const price = service.avgPrice.split('-')[0];

  return template.questions.map(item => {
    const question = item.q
      .replace(/{city}/g, cityName)
      .replace(/{service}/g, service.name);
    
    // Use city name + question as seed for deterministic answer choice
    const seed = cityName + item.q;
    const rawAnswer = getVariation(item.a, seed);
    
    const answer = rawAnswer
      .replace(/{city}/g, cityName)
      .replace(/{service}/g, service.name)
      .replace(/{price}/g, price);

    return { question, answer };
  });
}
