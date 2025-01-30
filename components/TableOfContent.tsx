"use client";
import { useState, useEffect } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string; // MDX content
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // รอให้ MDX content ถูก render ก่อน
    const extractHeadings = () => {
      const elements = document.querySelectorAll(
        "article h1, article h2, article h3",
      );
      const items: TOCItem[] = Array.from(elements).map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.charAt(1)),
      }));
      setHeadings(items);

      // สร้าง Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "0% 0% -80% 0%" },
      );

      elements.forEach((elem) => observer.observe(elem));
      return () => observer.disconnect();
    };

    // ให้เวลา MDX render สักเล็กน้อย
    setTimeout(extractHeadings, 100);
  }, [content]); // เมื่อ content เปลี่ยน จะ re-run effect

  if (headings.length === 0) return null;

  return (
    <aside className="top-16 hidden p-8 jun-insetSidebar jun-insetSidebar-fixed jun-insetSidebar-w-[250px] md:block">
      <nav className="jun-insetContent max-h-[calc(100vh-4rem)] overflow-y-auto pt-24">
        <h4 className="mb-4 text-base font-medium">สารบัญ</h4>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className={`block transition-colors hover:text-primary-lime ${
                  activeId === heading.id
                    ? "font-medium text-primary-lime"
                    : "text-zinc-500"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
