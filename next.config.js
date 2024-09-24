const { withFaust, getWpHostname } = require("@faustwp/core");
const { createSecureHeaders } = require("next-secure-headers");

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  basePath: "/wpdac-archive-dev",
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
