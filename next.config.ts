import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Seed content currently points at the live theacosa.com media
      // library. Once the client's WordPress site is live (even on a
      // staging domain), add/replace that host here — same shape.
      { protocol: "https", hostname: "theacosa.com", pathname: "/wp-content/uploads/**" },
      { protocol: "https", hostname: "*.theacosa.com", pathname: "/wp-content/uploads/**" },
    ],
  },
};

export default withNextIntl(nextConfig);
