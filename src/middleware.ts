import { NextRequest, NextResponse } from "next/server";

const redirectMap = new Map<string, string>([
  // דפי שירותים כלליים
  ["/הדברה", "/"],
  ["/הדברה/", "/"],
  ["/הדברת-מזיקים", "/"],
  ["/הדברת-מזיקים/", "/"],
  ["/לוכד-חולדות", "/lochad-chuldot"],
  ["/לוכד-חולדות/", "/lochad-chuldot"],
  ["/לוכד-עכברים", "/lochad-akbarim"],
  ["/לוכד-עכברים/", "/lochad-akbarim"],
  ["/הדברת-עכברים", "/lochad-akbarim"],
  ["/הדברת-עכברים/", "/lochad-akbarim"],
  ["/ריסוס-לבית", "/risus-labayit"],
  ["/ריסוס-לבית/", "/risus-labayit"],
  ["/מדביר-מומלץ-ומוסמך", "/"],
  ["/מדביר-מומלץ-ומוסמך/", "/"],

  // דפים מקומיים (לפי עיר)
  ["/הדברה/הדברה-בתל-אביב", "/hadbarat-nemalim/tel-aviv"],
  ["/הדברה/הדברה-בתל-אביב/", "/hadbarat-nemalim/tel-aviv"],
  ["/לוכד-חולדות/לוכד-חולדות-באור-יהודה", "/lochad-chuldot/or-yehuda"],
  ["/לוכד-חולדות/לוכד-חולדות-באור-יהודה/", "/lochad-chuldot/or-yehuda"],
  ["/לוכד-חולדות/לוכד-חולדות-באשדוד", "/lochad-chuldot/ashdod"],
  ["/לוכד-חולדות/לוכד-חולדות-באשדוד/", "/lochad-chuldot/ashdod"],
  ["/לוכד-חולדות/לוכד-חולדות-בבאר-יעקב", "/lochad-chuldot/beer-yaakov"],
  ["/לוכד-חולדות/לוכד-חולדות-בבאר-יעקב/", "/lochad-chuldot/beer-yaakov"],
  ["/לוכד-חולדות/לוכד-חולדות-בבת-ים", "/lochad-chuldot/bat-yam"],
  ["/לוכד-חולדות/לוכד-חולדות-בבת-ים/", "/lochad-chuldot/bat-yam"],
  ["/לוכד-חולדות/לוכד-חולדות-בגבעתיים", "/lochad-chuldot/givat-shmuel"],
  ["/לוכד-חולדות/לוכד-חולדות-בגבעתיים/", "/lochad-chuldot/givat-shmuel"],
  ["/לוכד-חולדות/לוכד-חולדות-בגדרה", "/lochad-chuldot/gedera"],
  ["/לוכד-חולדות/לוכד-חולדות-בגדרה/", "/lochad-chuldot/gedera"],
  ["/לוכד-חולדות/לוכד-חולדות-בהוד-השרון", "/lochad-chuldot/hod-hasharon"],
  ["/לוכד-חולדות/לוכד-חולדות-בהוד-השרון/", "/lochad-chuldot/hod-hasharon"],
  ["/לוכד-חולדות/לוכד-חולדות-בהרצליה", "/lochad-chuldot/herzliya"],
  ["/לוכד-חולדות/לוכד-חולדות-בהרצליה/", "/lochad-chuldot/herzliya"],
  ["/לוכד-חולדות/לוכד-חולדות-בחולון", "/lochad-chuldot/holon"],
  ["/לוכד-חולדות/לוכד-חולדות-בחולון/", "/lochad-chuldot/holon"],
  ["/לוכד-חולדות/לוכד-חולדות-ביבנה", "/lochad-chuldot/yavne"],
  ["/לוכד-חולדות/לוכד-חולדות-ביבנה/", "/lochad-chuldot/yavne"],
  ["/לוכד-חולדות/לוכד-חולדות-ביהוד", "/lochad-chuldot/yehud-monosson"],
  ["/לוכד-חולדות/לוכד-חולדות-ביהוד/", "/lochad-chuldot/yehud-monosson"],
  ["/לוכד-חולדות/לוכד-חולדות-בכפר-סבא", "/lochad-chuldot/kfar-saba"],
  ["/לוכד-חולדות/לוכד-חולדות-בכפר-סבא/", "/lochad-chuldot/kfar-saba"],
  ["/לוכד-חולדות/לוכד-חולדות-בלוד", "/lochad-chuldot/lod"],
  ["/לוכד-חולדות/לוכד-חולדות-בלוד/", "/lochad-chuldot/lod"],
  ["/לוכד-חולדות/לוכד-חולדות-בנס-ציונה", "/lochad-chuldot/ness-ziona"],
  ["/לוכד-חולדות/לוכד-חולדות-בנס-ציונה/", "/lochad-chuldot/ness-ziona"],
  ["/לוכד-חולדות/לוכד-חולדות-בנתניה", "/lochad-chuldot/raanana"],
  ["/לוכד-חולדות/לוכד-חולדות-בנתניה/", "/lochad-chuldot/raanana"],
  ["/לוכד-חולדות/לוכד-חולדות-בפתח-תקווה", "/lochad-chuldot/petah-tikva"],
  ["/לוכד-חולדות/לוכד-חולדות-בפתח-תקווה/", "/lochad-chuldot/petah-tikva"],
  ["/לוכד-חולדות/לוכד-חולדות-בקרית-אונו", "/lochad-chuldot/kiryat-ono"],
  ["/לוכד-חולדות/לוכד-חולדות-בקרית-אונו/", "/lochad-chuldot/kiryat-ono"],
  ["/לוכד-חולדות/לוכד-חולדות-בראש-העין", "/lochad-chuldot/rosh-haayin"],
  ["/לוכד-חולדות/לוכד-חולדות-בראש-העין/", "/lochad-chuldot/rosh-haayin"],
  ["/לוכד-חולדות/לוכד-חולדות-ברחובות", "/lochad-chuldot/rehovot"],
  ["/לוכד-חולדות/לוכד-חולדות-ברחובות/", "/lochad-chuldot/rehovot"],
  ["/לוכד-חולדות/לוכד-חולדות-ברמלה", "/lochad-chuldot/ramla"],
  ["/לוכד-חולדות/לוכד-חולדות-ברמלה/", "/lochad-chuldot/ramla"],
  ["/לוכד-חולדות/לוכד-חולדות-ברמת-גן", "/lochad-chuldot/ramat-gan"],
  ["/לוכד-חולדות/לוכד-חולדות-ברמת-גן/", "/lochad-chuldot/ramat-gan"],
  ["/לוכד-חולדות/לוכד-חולדות-ברעננה", "/lochad-chuldot/raanana"],
  ["/לוכד-חולדות/לוכד-חולדות-ברעננה/", "/lochad-chuldot/raanana"],
  ["/לוכד-חולדות/לוכד-חולדות-בשוהם", "/lochad-chuldot/shoham"],
  ["/לוכד-חולדות/לוכד-חולדות-בשוהם/", "/lochad-chuldot/shoham"],
  ["/לוכד-חולדות/לוכד-חולדות-בתל-אביב", "/lochad-chuldot/tel-aviv"],
  ["/לוכד-חולדות/לוכד-חולדות-בתל-אביב/", "/lochad-chuldot/tel-aviv"],
]);

const safeDecode = (pathname: string) => {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
};

export function middleware(request: NextRequest) {
  const pathname = safeDecode(request.nextUrl.pathname);
  const destination = redirectMap.get(pathname);

  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
