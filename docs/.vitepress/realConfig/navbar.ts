import { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.NavItem[] = [
  {
    text: "首页",
    link: "/", // 表示docs/index.md
  },
  {
    text: "我的博客搭建",
    link: "/column/MyBlog/",
  },
  {
    text: "前端专栏",
    items: [
      {
        text: "HTML",
        link: "/column/HTML/", // 表示docs/column/HTML/index.md
      },
      {
        text: "CSS",
        link: "/column/HTML/", // 表示docs/column/CSS/index.md
      },
      {
        text: "开发工具链",
        link: "/column/DevelopmentTooling/001_pnpm",
      },
      {
        text: "TypeScript",
        link: "/column/TypeScript/001_ts_basic",
      },
      {
        text: "Vue",
        link: "/column/Vue/001_vue2",
      },
      {
        text: "UniApp",
        link: "/column/UniApp/001_uniapp",
      },
      {
        text: "Next.js 学习",
        link: "/column/Nextjs/001_start",
      },
    ],
  },
  {
    text: "关于我",
    items: [
      { text: "Github", link: "https://github.com/RanGuMo" },
      {
        text: "CSDN",
        link: "https://blog.csdn.net/qq_43322436?spm=1010.2135.3001.5343",
      },
    ],
  },
  {
    text: "其他站点",
    items: [
      { text: "VitePress文档搭建", link: "https://vitepress.yiov.top" },
      { text: "VuePress文档搭建", link: "https://vuepress.yiov.top" },
    ],
  },
];
