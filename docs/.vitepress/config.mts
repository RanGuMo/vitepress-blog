import { defineConfig } from "vitepress";
import { nav, sidebar } from "./realConfig";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress-blog/',
  title: "RanGuMo的博客", // 标题
  description: "A VitePress Site",
  head: [
    // 将 favicon.ico 放在公共目录中，如果设置了 base，则使用 /base/favicon.ico
    ['link', { rel: 'icon', href: '/vitepress-blog/favicon.ico' }]
  ],
  themeConfig: {
    logo: "/avatar.webp", // 表示docs/public/avartar.webp
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,
    sidebar: sidebar,
    outline: {
      level: [2, 6],
      label: '目录'
    },
    //上次更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    },
    // 本地搜索
    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/RanGuMo" },
    ],
  },
  markdown: {
    lineNumbers: true // 显示行号
  }
});
