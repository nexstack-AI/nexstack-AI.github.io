const config = {
  title: "nexstack-AI | 10年+ 经验 · Taro · React · TypeScript",
  description: {
    long: "nexstack-AI 的个人作品集，13年工作经验，10年+前端开发经验。精通 Taro + React + TypeScript 技术栈，擅长自定义 Hooks 封装、复杂业务逻辑抽象。主导 30+ 大型项目。",
    short:
      "nexstack-AI · 10年+ 经验 · Taro · React · TypeScript · ECharts",
  },
  keywords: [
    "nexstack-AI",
    "前端开发",
    "个人主页",
    "React",
    "TypeScript",
    "Taro",
    "ECharts",
    "小程序",
    "数据可视化",
    "三端合一",
    "Vite",
    "Webpack",
  ],
  author: "nexstack-AI",
  email: "462926191@qq.com",
  site: "https://nexstack-ai.github.io",

  githubUsername: "nexstack-AI",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    github: "https://github.com/nexstack-AI",
  },
};
export { config };