/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [

      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.humacollection.in',
      },
      {
        protocol: 'https',
        hostname: 'www.humacollection.in',
      },
      {
        protocol: 'https',
        hostname: 'humacollection.in',
      },
      {
        protocol: 'https',
        hostname: 'media.humacollection.in',
      },
      {
        protocol: 'https',
        hostname: 'media.humahijabcollection.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.humacollection.in',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
    NEXT_PUBLIC_STORE_NAME: process.env.NEXT_PUBLIC_STORE_NAME || 'Huma Hijab Collection',
    NEXT_PUBLIC_OWNER_NAME: process.env.NEXT_PUBLIC_OWNER_NAME || 'Hamid Shaikh',
    NEXT_PUBLIC_STORE_PHONE: process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009',
    NEXT_PUBLIC_STORE_PHONE_FORMATTED: process.env.NEXT_PUBLIC_STORE_PHONE_FORMATTED || '+91 82006 17009',
    NEXT_PUBLIC_WHATSAPP: process.env.NEXT_PUBLIC_WHATSAPP || '+918200617009',
    NEXT_PUBLIC_MAPS_URL: process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6',
    NEXT_PUBLIC_ONLINE_LAUNCH_DATE: process.env.NEXT_PUBLIC_ONLINE_LAUNCH_DATE || 'November 2026',
    NEXT_PUBLIC_RAZORPAY_KEY: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_HumaHijab2026',
  },
};

module.exports = nextConfig;
