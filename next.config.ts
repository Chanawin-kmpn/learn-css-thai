import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // กำหนดค่า ESLint config ใหม่
    dirs: ["app", "components", "lib", "utils"], // ระบุ directories ที่ต้องการให้ตรวจสอบ
    ignoreDuringBuilds: true, // ถ้าต้องการให้ตรวจสอบ ESLint ระหว่าง build
  },
  typescript: {
    // ถ้าต้องการปรับการตรวจสอบ TypeScript
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
