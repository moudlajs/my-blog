export const SITE = {
  website: "https://danielczetner.com/", // Your custom domain (or use https://moudlajs.github.io/my-blog/ for GitHub Pages default)
  author: "Daniel Czetner",
  profile: "https://github.com/moudlajs",
  desc: "DevOps engineer, fantasy football analyst, and occasional writer. Based in Brno, Czech Republic.",
  title: "DeeCee's blog",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/moudlajs/my-blog/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/Prague", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
