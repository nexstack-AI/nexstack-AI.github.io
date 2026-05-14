import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiDocker,
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          查看项目
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            GitHub
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const PROJECT_SKILLS = {
  react: {
    title: "React",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  taro: {
    title: "Taro",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  echarts: {
    title: "ECharts",
    bg: "black",
    fg: "white",
    icon: (
      <span className="font-bold text-sm">EC</span>
    ),
  },
  antd: {
    title: "Ant Design",
    bg: "black",
    fg: "white",
    icon: (
      <span className="font-bold text-xs">AntD</span>
    ),
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  miniapp: {
    title: "小程序",
    bg: "black",
    fg: "white",
    icon: (
      <span className="font-bold text-xs">Mini</span>
    ),
  },
  mobile: {
    title: "移动端",
    bg: "black",
    fg: "white",
    icon: (
      <span className="font-bold text-xs">Mob</span>
    ),
  },
  java: {
    title: "Java",
    bg: "black",
    fg: "white",
    icon: (
      <span className="font-bold text-xs">Java</span>
    ),
  },
  vite: {
    title: "Vite",
    bg: "black",
    fg: "white",
    icon: (
      <span className="font-bold text-xs">Vite</span>
    ),
  },
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

const projects: Project[] = [
  {
    id: "yunzhiye",
    category: "房地产科技",
    title: "云置业",
    src: "/assets/projects-screenshots/portfolio/landing.png",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.taro,
        PROJECT_SKILLS.antd,
        PROJECT_SKILLS.miniapp,
        PROJECT_SKILLS.mobile,
      ],
      backend: [PROJECT_SKILLS.java],
    },
    live: "https://nexstack-ai.github.io",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            保利楼盘 · 三端合一 · 稳定迭代 6 年+
          </TypographyP>
          <TypographyP className="font-mono">
            云置业是公司核心产品，以保利楼盘为主的小程序项目。采用 Taro + React +
            TypeScript 技术栈，实现 PC、APP、小程序三端合一，代码库庞大且持续迭代超过 6
            年。深度参与核心页面研发、公共组件维护与性能优化，参与研发时间与工龄同步。
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">技术亮点</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>三端代码复用率达 85%+，大幅降低维护成本</li>
            <li>自定义业务组件库，沉淀 50+ 可复用组件</li>
            <li>性能优化：首屏加载时间优化 40%</li>
            <li>TypeScript 全面覆盖，类型安全护航核心业务</li>
          </ul>
        </div>
      );
    },
  },
  {
    id: "digital-board",
    category: "数据可视化",
    title: "数字化看板",
    src: "/assets/projects-screenshots/portfolio/project.png",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.taro,
        PROJECT_SKILLS.echarts,
        PROJECT_SKILLS.gsap,
      ],
      backend: [PROJECT_SKILLS.java],
    },
    live: "https://nexstack-ai.github.io",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            ECharts 大屏 · 数据驱动 · 独立交付
          </TypographyP>
          <TypographyP className="font-mono">
            数字化看板以 ECharts 和表格为主要展示形式，使用 Taro + React + ECharts 技术栈。
            独立完成核心模块研发，涵盖多维度数据可视化、实时数据刷新、交互式图表等功能。
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">技术亮点</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>ECharts 定制化图表组件封装，支持 10+ 图表类型</li>
            <li>实时数据推送，WebSocket 长连接稳定运行</li>
            <li>大屏自适应布局，兼容 1920×1080 至 4K 分辨率</li>
            <li>核心模块独立研发，从零到交付全流程负责</li>
          </ul>
        </div>
      );
    },
  },
  {
    id: "marketing-board",
    category: "数据可视化",
    title: "营销看板",
    src: "/assets/projects-screenshots/portfolio/projects.png",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.taro,
        PROJECT_SKILLS.echarts,
        PROJECT_SKILLS.antd,
      ],
      backend: [PROJECT_SKILLS.java],
    },
    live: "https://nexstack-ai.github.io",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            智慧营销 · 数据驱动决策
          </TypographyP>
          <TypographyP className="font-mono">
            营销看板是智慧营销体系的核心数据展示平台。使用 Taro + React + ECharts
            技术栈，独立完成项目交付。为业务团队提供实时营销数据洞察、转化漏斗分析、
            用户行为追踪等关键功能。
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">技术亮点</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>多维度营销数据分析与可视化呈现</li>
            <li>交互式数据筛选与钻取，支持自定义时间范围</li>
            <li>响应式设计，PC 端 + 移动端双端适配</li>
          </ul>
        </div>
      );
    },
  },
  {
    id: "golf",
    category: "运动预约平台",
    title: "高尔夫",
    src: "/assets/projects-screenshots/portfolio/skills.png",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.taro,
        PROJECT_SKILLS.antd,
        PROJECT_SKILLS.miniapp,
      ],
      backend: [PROJECT_SKILLS.java],
    },
    live: "https://nexstack-ai.github.io",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            保利高尔夫 · 带队研发 · 全流程管理
          </TypographyP>
          <TypographyP className="font-mono">
            保利高尔夫预约、支付及餐厅系统。由我带领项目团队，框架以 Taro + React +
            TypeScript 搭建，公共组件以项目内部组件形式由组员共同研发。
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">我的角色</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>项目技术负责人，带领团队完成全流程研发</li>
            <li>架构设计：Taro + React + TypeScript 技术选型与框架搭建</li>
            <li>核心模块开发：预约系统、支付集成、餐厅管理</li>
            <li>公共组件抽象：推动组员沉淀可复用组件</li>
          </ul>
        </div>
      );
    },
  },
  {
    id: "nexstack-miniapp",
    category: "开源框架",
    title: "nexstack-miniapp",
    src: "/assets/projects-screenshots/portfolio/landing.png",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.taro,
        PROJECT_SKILLS.miniapp,
      ],
      backend: [],
    },
    github: "https://github.com/nexstack-AI/nexstack-miniapp",
    live: "https://github.com/nexstack-AI/nexstack-miniapp",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Taro + React + TypeScript 小程序框架
          </TypographyP>
          <TypographyP className="font-mono">
            基于 Taro 3.x 跨端框架，深度封装 React + TypeScript 技术栈。
            提供开箱即用的小程序工程化方案：路由管理、状态管理、网络请求、
            UI 组件库集成等核心能力。已应用于公司多个核心项目。
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">框架特性</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>Taro 3.x + React 18 + TypeScript 技术栈</li>
            <li>内置公共组件库与业务 Hooks 封装</li>
            <li>小程序 · H5 双端编译，代码复用率 90%+</li>
            <li>工程化配置：ESLint + Prettier + Husky 规范化</li>
          </ul>
        </div>
      );
    },
  },
  {
    id: "vitedome",
    category: "开源框架",
    title: "vitedome",
    src: "/assets/projects-screenshots/portfolio/project.png",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.vite,
        PROJECT_SKILLS.express,
      ],
      backend: [PROJECT_SKILLS.node],
    },
    github: "https://github.com/nexstack-AI/vitedome",
    live: "https://github.com/nexstack-AI/vitedome",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            React 19 + Vite + TypeScript 前端框架
          </TypographyP>
          <TypographyP className="font-mono">
            基于 Vite 构建的现代前端工程框架，集成 React 19 + TypeScript + React Router v7。
            配套 Express 后端服务 + SQLite 数据库 + Drizzle ORM，提供完整的前后端
            分离架构方案。包含自定义 Hooks 库、渐进式图片懒加载、性能优化实践等。
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">框架特性</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>Vite 5 + React 19 + TypeScript 最新技术栈</li>
            <li>Express + SQLite + Drizzle ORM 后端方案</li>
            <li>自定义 Hooks：useRequest、useInViewRequest、useLazyImage</li>
            <li>渐进式图片懒加载：Intersection Observer + 模糊渐进 + srcSet</li>
            <li>前后端分离架构，接口层完整抽象</li>
          </ul>
        </div>
      );
    },
  },
];
export default projects;