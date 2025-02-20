const ROUTES = [
  {
    label: "พื้นฐาน",
    children: [
      {
        label: "Introduction",
        path: "/docs/basics/introduction",
      },
      {
        label: "Media queries",
        path: "/docs/basics/media-queries",
      },
      {
        label: "Selectors",
        path: "/docs/basics/selectors",
        children: [
          {
            label: "Selectors",
            path: "/docs/basics/selectors/selectors",
          },
          {
            label: "Pseudo-classes",
            path: "/docs/basics/selectors/pseudo-classes",
          },
          {
            label: "Pseudo-elements",
            path: "/docs/basics/selectors/pseudo-elements",
          },
          {
            label: "Combinators",
            path: "/docs/basics/selectors/combinators",
          },
        ],
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
    children: [
      {
        label: "Debugging",
        path: "/docs/rendering/debugging",
      },
      {
        label: "Rendering CSS",
        path: "/docs/rendering/css-rendering",
      },
      {
        label: "Block and Inline",
        path: "/docs/rendering/block-inline",
      },
      {
        label: "Box model",
        path: "/docs/rendering/box-model",
      },
      {
        label: "Flow layout",
        path: "/docs/rendering/flow-layout",
      },
      {
        label: "Positioning",
        path: "/docs/rendering/positioning",
      },
      {
        label: "Stacking contexts",
        path: "/docs/rendering/stacking-contexts",
      },
      {
        label: "Overflow",
        path: "/docs/rendering/overflow",
      },
      {
        label: "Hidden content",
        path: "/docs/rendering/hidden-content",
      },
    ],
  },
  {
    label: "Modern Layout",
    children: [
      {
        label: "Flexbox",
        path: "/docs/modern-layout/flexbox",
        children: [
          {
            label: "Introduction",
            path: "/docs/modern-layout/flexbox/flexbox-introduction",
          },
          {
            label: "Fundamentals",
            path: "/docs/modern-layout/flexbox/flexbox-fundamentals",
          },
        ],
      },
      {
        label: "CSS Grid",
        path: "/docs/modern-layout/grid",
        children: [
          {
            label: "Introduction",
            path: "/docs/modern-layout/grid/grid-introduction",
          },
          {
            label: "Fundamentals",
            path: "/docs/modern-layout/grid/grid-fundamentals",
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

export default ROUTES;
