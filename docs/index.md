---
# 提供三种布局，doc、page和home
# 官方文档相关配置：https://vitepress.dev/reference/default-theme-layout

# 官方文档相关配置： https://vitepress.dev/reference/default-theme-home-page
layout: home

title: RanGuMo的博客
titleTemplate: Hi，终于等到你
editLink: true
lastUpdated: true # 最后更新时间 (全局开启)

hero:
  name: "RanGuMo"
  text: "Stay foolish, Stay hungry."
  tagline: /斜杠青年/人间清醒/工具控/
  # actions:
  #   - theme: brand
  #     text: Markdown Examples
  #     link: /markdown-examples
  #   - theme: alt
  #     text: API Examples
  #     link: /api-examples
  image:
    # 首页右边的图片
    src: /avatar.webp
    # 图片的描述
    alt: avatar
  # 按钮相关
  actions:
    - theme: brand
      text: 进入主页
      link: /markdown-examples
    - theme: alt
      text: 个人成长
      link: /api-examples

# 按钮下方的描述
features:
  - icon: 🤹‍♂️♂
    title: Web前端
    details: 国内某互联网厂搬砖。
    link: /column/views/guide
  - icon: 🎨
    title: 喜欢美学
    details: 热爱一切美学，喜欢用各种设计工具造图。
  - icon: 🧩
    title: 斜杆青年
    details: 是个平平无奇但是又很热爱学习的斜杆青年。
---

<!-- 自定义组件 -->
<script setup>
// import home from './components/home.vue';
// import confetti from "./components/confetti.vue";
</script>

<!-- <home /> -->
<confetti />
