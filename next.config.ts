import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [],
  },
  async redirects() {
    return [
      // דפי שירותים כלליים
      {
        source: '/הדברה/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/הדברת-מזיקים/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/',
        destination: '/lochad-chuldot',
        permanent: true,
      },
      {
        source: '/לוכד-עכברים/',
        destination: '/lochad-akbarim',
        permanent: true,
      },
      {
        source: '/הדברת-עכברים/',
        destination: '/lochad-akbarim',
        permanent: true,
      },
      {
        source: '/ריסוס-לבית/',
        destination: '/risus-labayit',
        permanent: true,
      },
      {
        source: '/מדביר-מומלץ-ומוסמך/',
        destination: '/',
        permanent: true,
      },
      // דפים מקומיים (לפי עיר)
      {
        source: '/הדברה/הדברה-בתל-אביב/',
        destination: '/hadbarat-nemalim/tel-aviv',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-באור-יהודה/',
        destination: '/lochad-chuldot/or-yehuda',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-באשדוד/',
        destination: '/lochad-chuldot/ashdod',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בבאר-יעקב/',
        destination: '/lochad-chuldot/beer-yaakov',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בבת-ים/',
        destination: '/lochad-chuldot/bat-yam',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בגבעתיים/',
        destination: '/lochad-chuldot/givat-shmuel', // גבעתיים לא קיימת, מפנה לגבעת שמואל הקרובה
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בגדרה/',
        destination: '/lochad-chuldot/gedera',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בהוד-השרון/',
        destination: '/lochad-chuldot/hod-hasharon',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בהרצליה/',
        destination: '/lochad-chuldot/herzliya',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בחולון/',
        destination: '/lochad-chuldot/holon',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-ביבנה/',
        destination: '/lochad-chuldot/yavne',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-ביהוד/',
        destination: '/lochad-chuldot/yehud-monosson',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בכפר-סבא/',
        destination: '/lochad-chuldot/kfar-saba',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בלוד/',
        destination: '/lochad-chuldot/lod',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בנס-ציונה/',
        destination: '/lochad-chuldot/ness-ziona',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בנתניה/',
        destination: '/lochad-chuldot/raanana', // נתניה לא קיימת, מפנה לרעננה הקרובה
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בפתח-תקווה/',
        destination: '/lochad-chuldot/petah-tikva',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בקרית-אונו/',
        destination: '/lochad-chuldot/kiryat-ono',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בראש-העין/',
        destination: '/lochad-chuldot/rosh-haayin',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-ברחובות/',
        destination: '/lochad-chuldot/rehovot',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-ברמלה/',
        destination: '/lochad-chuldot/ramla',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-ברמת-גן/',
        destination: '/lochad-chuldot/ramat-gan',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-ברעננה/',
        destination: '/lochad-chuldot/raanana',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בשוהם/',
        destination: '/lochad-chuldot/shoham',
        permanent: true,
      },
      {
        source: '/לוכד-חולדות/לוכד-חולדות-בתל-אביב/',
        destination: '/lochad-chuldot/tel-aviv',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
