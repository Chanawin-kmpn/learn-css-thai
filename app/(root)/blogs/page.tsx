import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { allBlogs } from "@/.content-collections/generated";

const page = () => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="space-y-4 lg:text-center">
        <h1 className="h1-section">
          เรียนรู้ <span className="text-gradient">CSS</span> ด้วยตัวของคุณเอง
        </h1>
        <p className="paragraph">
          รวบรวมบทความ เทคนิคและแนวทางการเรียนรู้ CSS สำหรับนักพัฒนาทุกระดับ
        </p>
      </div>
      <div>
        {allBlogs.map((blog) => (
          <div
            key={blog.slug}
            className="flex flex-col-reverse rounded-lg p-4 transition-colors duration-300 hover:bg-zinc-100/30 dark:hover:bg-zinc-800/30 lg:flex-row lg:items-center"
          >
            <div className="space-y-2">
              <Link href={`/blogs/${blog.slug}`} className="h2-section">
                {blog.title}
              </Link>
              <p className="description line-clamp-2 max-w-[80%]">
                {blog.description}
              </p>
              <div className="flex items-center space-x-2">
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="group flex items-center text-primary-lime"
                >
                  อ่านเพิ่มเติม
                  <ChevronRight
                    size={16}
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
                  />
                </Link>
              </div>
            </div>
            <div className="text-dark700_light400 text-xs lg:text-sm">
              {blog.createdDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
