/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    async rewrites() {
        return [
            {
                source: "/js/script.js",
                destination: "https://plausible.io/js/script.js",
            },
            {
                source: "/api/event", // Or '/api/event/' if you have `trailingSlash: true` in this config
                destination: "https://plausible.io/api/event",
            },
        ];
    },
};

module.exports = nextConfig;
