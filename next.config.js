/** @type {import('next').NextConfig} */
const nextConfig = {
    /* css-in-js FOUC 문제 해결 */  
    compiler: {
        styledComponents: true,
    },
    typescript: {
        ignoreBuildErrors: true,
     },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    },
    /* CORS 우회 방법 proxy 대체하여 rewrites */
    async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: `http://${process.env.NEXT_PUBLIC_FRONT_URL}/api/:path*`,
          },
        ];
    },
}

module.exports = nextConfig
