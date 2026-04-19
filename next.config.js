/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure /data JSON files are bundled into the Vercel serverless functions
  // — otherwise fs.readFileSync at runtime fails because the folder isn't traced.
  outputFileTracingIncludes: {
    "/**/*": ["./data/**/*.json"],
  },
};

module.exports = nextConfig;
