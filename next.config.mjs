/** @type {import('next').NextConfig} */
const BasePath = process.env.BASEPATH;
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  skipMiddlewareUrlNormalize: true,
  swcMinify: false,

  env: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    // ASSET_PREFIX: process.env.ASSET_PREFIX,
    RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
    APP_VERSION: process.env.APP_VERSION,
    KEY_YOUTUBE: process.env.KEY_YOUTUBE,
    // BASE_PATH: process.env.BASE_PATH,
    APP_NAME: process.env.APP_NAME,
    URI_API: process.env.URI_API,
    URI_VER: process.env.URI_VER,
    APP: process.env.APP,
  },

  async rewrites() {
    return [
      {
        source: "/",
        destination: "/innovatube/home",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/innovatube/home",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
