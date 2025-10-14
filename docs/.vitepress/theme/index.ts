import DefaultTheme from "vitepress/theme";
import confetti from "../../components/confetti.vue";
import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    const { app } = ctx;
    app.component("confetti", confetti); // 注册全局组件
  },
};
