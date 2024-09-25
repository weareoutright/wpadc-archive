import { withFaust, getWpHostname } from "@faustwp/core";
import { createSecureHeaders } from "next-secure-headers";
/**
 * @type {import('next').NextConfig}
 **/

export default withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["node_modules"],
  },
  images: {
    unoptimized: true,
    domains: [getWpHostname()],
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
