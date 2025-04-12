/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "http://localhost:5001",
    COURSE_SERVICE_URL:
      process.env.COURSE_SERVICE_URL || "http://localhost:5002",
    GRADE_SERVICE_URL: process.env.GRADE_SERVICE_URL || "http://localhost:5003",
  },
  // Other Next.js config options
};

export default nextConfig;
