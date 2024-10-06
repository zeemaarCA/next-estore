/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'source.unsplash.com', 'fakestoreapi.com', 'images.pexels.com', 'firebasestorage.googleapis.com', 'via.placeholder.com', 'www.hostinger.com', 'img.clerk.com'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },
};

export default nextConfig;
