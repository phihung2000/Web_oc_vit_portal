/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config")
const withPlugins = require("next-compose-plugins")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
    NEX_PUBLIC_API_SOCKET_HOST: process.env.NEX_PUBLIC_API_SOCKET_HOST,
  },
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
    },
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
          },
        },
        "url-loader",
      ],
    })

    return config
  },
}

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig)
