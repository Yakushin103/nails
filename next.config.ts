const nextConfig = {
  // Убираем deprecated images.domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

module.exports = nextConfig;
