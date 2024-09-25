import { withFaust, getWpHostname } from "@faustwp/core";
import { createSecureHeaders } from "next-secure-headers";
/**
 * @type {import('next').NextConfig}
 **/
const dynamicRoutes = [
  { slug: "example-1" },
  { slug: "example-2" },
  // Add more known slugs or fetch from your WordPress API
];

export default withFaust({
  exportPathMap: async function () {
    const paths = {
      "/": { page: "/" },
      "/page": { page: "/page" },
      "/preview": { page: "/preview" },
    };

    dynamicRoutes.forEach((route) => {
      paths[`/${route.slug}`] = {
        page: "/[...wordpressNode]",
        query: { slug: route.slug },
      };
    });

    return paths;
  },
  distDir: "build",
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["node_modules"],
  },
  images: {
    unoptimized: true,
    domains: [getWpHostname()],
  },
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: createSecureHeaders({
          xssProtection: false,
        }),
      },
    ];
  },
});
