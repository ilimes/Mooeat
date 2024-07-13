/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
  frame-src giscus.app
`;
const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: 'upgrade-insecure-requests',
    // value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  { key: 'Access-Control-Allow-Credentials', value: 'true' },
  { key: 'Access-Control-Allow-Origin', value: '*' },
  {
    key: 'Access-Control-Allow-Methods',
    value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  },
  {
    key: 'Access-Control-Allow-Headers',
    value:
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  },
];

const nextConfig = {
  /* css-in-js FOUC 문제 해결 */
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  /* useEffect 2번 실행되는 문제 해결 */
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  // images: {
  //   domains: ['mooeat.ilime.kr'],
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  /* CORS 우회 방법 proxy 대체하여 rewrites */
  // async rewrites() {
  //     return [
  //       {
  //         source: "/api/:path*",
  //         destination: `http://${process.env.NEXT_PUBLIC_FRONT_URL}/api/:path*`,
  //       },
  //       {
  //         source: `/:path*`,
  //         destination: `http://${process.env.NEXT_PUBLIC_FRONT_URL}/:path*`,
  //       },
  //     ];
  // },
};

module.exports = nextConfig;
