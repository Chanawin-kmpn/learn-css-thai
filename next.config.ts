import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  pageExtensions: ["md", "mdx", "ts", "tsx"], // กำหนดนามสกุลไฟล์ที่เป็นหน้าเว็บ
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fonts.googleapis.com",
      },
    ],
  },
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

export default withContentCollections(nextConfig);
