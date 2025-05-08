const FRONTEND_URL = "https://wpadc-archive.vercel.app/";

const siteUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : FRONTEND_URL;

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      //   {
      //     userAgent: "*",
      //     disallow: "/thank-you", // Disallow a specific folder/file
      //   },
      {
        userAgent: "*",
        allow: "/", // Allow all pages by default
      },
    ],
    additionalSitemaps: [
      //   `${siteUrl}/sitemap-story-blog-post.xml`,
      //   `${siteUrl}/sitemap-posts.xml`,
    ],
  },
  exclude: [
    "/exclude-file", // for specific page/file
    "/exclude/*", // for Folder
  ],
};
