import Link from "next/link";

import HowToLearnCard from "@/components/HowToLearnCard";
import LottieAnimation from "@/components/LottieAnimation";
import SearchButton from "@/components/Search/SearchButton";
import { howToLearn } from "@/constants";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="max-w-5xl px-8 py-4">
        <h1 className="h1-banner mb-4 lg:mb-16">
          เข้าใจ <span className="text-gradient">CSS</span>{" "}
          ได้ง่ายขึ้นผ่านการเรียนรู้แบบ Interactive
        </h1>
        <p className="paragraph text-dark700_light400 mx-auto mb-8 text-center lg:mb-16 lg:w-1/2">
          เราออกแบบบทเรียนให้เข้าใจง่าย
          พร้อมตัวอย่างที่คุณสามารถทดลองแก้ไขได้ทันที
          เหมาะสำหรับผู้ที่เริ่มต้นเรียนรู้ CSS
        </p>
        <div className="mx-auto flex max-w-[410px]">
          <Link href="/docs/basics/introduction" className="btn block flex-1">
            เริ่มกันเลย
          </Link>
          <div className="ml-4 hidden grow-[2] lg:block">
            <SearchButton />
          </div>
        </div>
      </div>
      <div className="px-8 py-4">
        <h2 className="h2-banner mb-8 lg:text-start">วิธีการเรียนของเรา</h2>
        <div className="flex flex-col gap-4 lg:flex-row">
          {howToLearn.map((item) => (
            <HowToLearnCard
              key={item.title}
              title={item.title}
              description={item.descritpion}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
      <div className="px-8 py-4">
        <h2 className="h2-banner mb-8 lg:text-start">เนื้อหาบทเรียน</h2>
        <LottieAnimation />
      </div>
      <div className="px-8 py-4">
        <h2 className="mb-2 text-center text-2xl font-bold">
          พร้อมที่จะเริ่มต้นแล้วหรือยัง
        </h2>
        <p className="paragraph text-dark700_light400 mb-8 text-center">
          เริ่มต้นเรียนรู้ได้ทันทีไม่ต้องมีพื้อนฐานการเขียน CSS
          ด้วยบทเรียนที่ออกบแบบมาเพื่อผู้เริ่มต้นโดยเฉพาะ
        </p>
        <Link href="/docs/basics/introduction" className="btn mx-auto block">
          เริ่มเลยตอนนี้
        </Link>
      </div>
    </div>
  );
}
