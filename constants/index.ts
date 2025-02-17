import { Code, Footprints, MonitorCheck } from "lucide-react";

export const navbarLinks = [
  {
    href: "/docs/basics/introduction",
    label: "Docs",
  },
  {
    href: "/blogs",
    label: "Blogs",
  },
];

export const howToLearn = [
  {
    title: "เรียนรู้แบบ Step by Step",
    descritpion:
      "เริ่มจากพื้นฐานง่ายๆ ไปจนถึงระดับ Advance ด้วยบทเรียนที่เรียบเรียงอย่างเป็นระบบ",
    icon: Footprints,
  },
  {
    title: "ทดสอบได้ทันที",
    descritpion:
      "แก้ไขโค้ดและดูผลลัพธ์แบบ Real-time ช่วยให้เข้าใจการทำงานของ CSS ได้ดียิ่งขึ้น",
    icon: Code,
  },
  {
    title: "ตัวอย่างที่ใช้ได้จริง",
    descritpion:
      "เรียนรู้ผ่านตัวอย่างที่นำไปใช้ได้จริงพร้อมคำอธิบายที่เข้าใจง่าย",
    icon: MonitorCheck,
  },
];
