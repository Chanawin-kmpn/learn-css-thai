import {
  Code,
  Footprints,
  Lightbulb,
  ListChecks,
  MonitorCheck,
} from "lucide-react";

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
    title: "คำอธิบายที่เข้าใจง่าย",
    descritpion:
      "เรียนรู้แนวคิด CSS ผ่านบทความและคำอธิบายที่ออกแบบมาให้เข้าใจง่าย พร้อมตัวอย่างที่ช่วยให้คุณนำไปปรับใช้ได้จริงในโปรเจกต์ของคุณ",
    icon: ListChecks,
  },
  {
    title: "เรียนรู้แบบ Step by Step",
    descritpion:
      "เริ่มจากพื้นฐานง่ายๆ ไปจนถึงระดับ Advance ด้วยบทเรียนที่เรียบเรียงอย่างเป็นระบบ",
    icon: Footprints,
  },
  {
    title: "ทดสอบและเห็นผลลัพท์ได้ทันที",
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
  {
    title: "จุดประกายไอเดียด้วย CSS",
    descritpion:
      "เปลี่ยนแนวคิดธรรมดาให้กลายเป็นเว็บไซต์ที่ยอดเยี่ยม ด้วยเทคนิค CSS ที่ช่วยให้ไอเดียของคุณสร้างสรรค์ได้อย่างไม่สิ้นสุด",
    icon: Lightbulb,
  },
];
