/** @type {import('next').NextConfig} */
const nextConfig = {
    /* css-in-js FOUC 문제 해결 */  
    compiler: {
        styledComponents: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    /* useEffect 2번 실행되는 문제 해결 */
    reactStrictMode: false,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
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
}

module.exports = nextConfig
