import { withFaust, getWpHostname } from "@faustwp/core";
import { createSecureHeaders } from "next-secure-headers";

require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.local"),
});
/**
 * @type {import('next').NextConfig}
 **/
export default withFaust({
  // output: "standalone",
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
