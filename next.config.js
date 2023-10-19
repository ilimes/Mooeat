/** @type {import('next').NextConfig} */
const nextConfig = {
    /* css-in-js FOUC 문제 해결 */  
    compiler: {
        styledComponents: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    }
}

module.exports = nextConfig
