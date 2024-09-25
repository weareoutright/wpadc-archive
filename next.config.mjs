import { withFaust, getWpHostname } from "@faustwp/core";
import { createSecureHeaders } from "next-secure-headers";
/**
 * @type {import('next').NextConfig}
 **/
export default withFaust({
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/page": { page: "/pages/*" },
    };
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["node_modules"],
  },
  images: {
    domains: [getWpHostname() || "wpdacarchivdev.wpenginepowered.com"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
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
