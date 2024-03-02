const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // add your own icons to src/app/manifest.ts
  // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // webpack: (config, options) => {
  //   config.experiments = {
  //     asyncWebAssembly: true,
  //     syncWebAssembly: true,
  //     layers: true,
  //   };
  //   return config;
  // },
});
