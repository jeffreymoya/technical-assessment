import nextBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
};

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Wrap the config with the analyzer
export default withBundleAnalyzer(nextConfig); 