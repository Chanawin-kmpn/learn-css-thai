export const ROUTES = [
  {
    label: "พื้นฐาน",
    path: "/docs/basics",
    children: [
      {
        label: "บทนำ",
        path: "/docs/basics/introduction",
      },
      {
        label: "Media Queries",
        path: "/docs/basics/media-queries",
      },
      {
        label: "Selectors",
        path: "/docs/basics/selectors",
      },
      {
        label: "Color",
        path: "/docs/basics/color",
      },
      {
        label: "Units",
        path: "/docs/basics/units",
      },
      {
        label: "Typography",
        path: "/docs/basics/typography",
      },
    ],
  },
  {
    label: "การแสดงผลและการแก้ไข",
    path: "/docs/rendering",
    children: [
      {
        label: "การ Debugging บน Browser",
        path: "/docs/rendering/debugging-browser",
      },
      {
        label: "พื้นฐานการแสดงผล CSS",
        path: "/docs/rendering/css-rendering-basics",
      },
      {
        label: "Block และ Inline",
        path: "/docs/rendering/block-inline",
      },
      {
        label: "Box Model",
        path: "/docs/rendering/box-model",
      },
      {
        label: "Flow Layout",
        path: "/docs/rendering/flow-layout",
      },
      {
        label: "Positioning",
        path: "/docs/rendering/positioning",
      },
      {
        label: "Containing Blocks",
        path: "/docs/rendering/containing-blocks",
      },
      {
        label: "Stacking Contexts",
        path: "/docs/rendering/stacking-contexts",
      },
      {
        label: "Overflow",
        path: "/docs/rendering/overflow",
      },
      {
        label: "Hidden Content",
        path: "/docs/rendering/hidden-content",
      },
    ],
  },
  {
    label: "ระบบ Layout สมัยใหม่",
    path: "/docs/modern-layout",
    children: [
      {
        label: "Flexbox",
        path: "/docs/modern-layout/flexbox",
        children: [
          { label: "บทนำ", path: "/docs/modern-layout/flexbox/introduction" },
          {
            label: "พื้นฐาน",
            path: "/docs/modern-layout/flexbox/fundamentals",
          },
        ],
      },
      {
        label: "CSS Grid",
        path: "/docs/modern-layout/docs-grid",
        children: [
          {
            label: "บทนำ",
            path: "/docs/modern-layout/docs-grid/introduction",
          },
          {
            label: "พื้นฐาน",
            path: "/docs/modern-layout/docs-grid/fundamentals",
          },
        ],
      },
      {
        label: "CSS Responsive",
        path: "/docs/modern-layout/responsive-design",
      },
    ],
  },
];
