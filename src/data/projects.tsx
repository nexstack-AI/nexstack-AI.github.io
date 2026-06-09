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
            保利地产数字化营销平台，三端合一（PC + App + 微信小程序），涵盖直播看房、预约到访、老带新裂变、户型楼盘展示、在线支付等核心功能，稳定运行 6 年以上持续迭代，是公司核心盈利项目。
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">技术亮点</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>主导 Taro + React + TypeScript + 自建 Hooks 工程化架构，降低 60%+ 跨端适配成本</li>
            <li>深度参与 15+ 核心页面开发，主导封装 20+ 通用业务组件，团队复用率超 80%</li>
            <li>小程序首屏加载优化、图片懒加载、分包加载，首屏加载时间缩短约 50%</li>
            <li>集成直播模块、预约到访、老带新裂变等营销工具</li>
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
            ECharts 大屏 · 数据驱动 · 核心研发
          </TypographyP>
          <TypographyP className="font-mono">
            企业数字化数据看板，以 ECharts 图表与数据表格为核心，多维度展示营销数据指标与业务分析结果，为管理层提供实时数据决策支持。
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">技术亮点</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>基于 ECharts 实现 10+ 种可视化组件，支撑 15+ 项核心业务指标实时展示</li>
            <li>封装 10+ 可复用图表组件，新看板开发周期从 5 天缩短至 2 天</li>
            <li>大屏自适应布局，兼容不同分辨率投屏展示</li>
            <li>Ant Design Table 虚拟滚动与多条件筛选，覆盖 5+ 业务线</li>
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
            营销看板是智慧营销体系的核心数据展示平台。使用 Taro + React + ECharts 技术栈，
            负责首页核心页面与详情页研发，实现数据筛选、排序、导出等交互功能，覆盖 5 个以上业务线的数据分析需求。
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">技术亮点</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>多维度营销数据分析与 ECharts 可视化呈现</li>
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
            保利高尔夫 · 主管带队 · 全流程管理
          </TypographyP>
          <TypographyP className="font-mono">
            保利高尔夫全栈项目，涵盖会员预约、在线支付、高端餐饮管理等核心业务闭环，
            多端覆盖（PC 管理后台 + 小程序用户端），项目稳定运行 2 年零重大故障。
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">我的角色</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>主导前端架构设计，统筹 3-5 人团队协作，制定编码规范与组件标准</li>
            <li>组织封装 15+ 公共组件，代码复用率提升 70%，多端一致性达 95%+</li>
            <li>对接微信支付完整链路，开发球位预约与餐饮排期系统</li>
            <li>处理并发预约等复杂逻辑，保障项目按时高质量交付</li>
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
  {
    id: "ai-agent",
    category: "AI 个人项目",
    title: "AI 智能运营 Agent",
    src: "/assets/projects-screenshots/portfolio/landing.png",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
      ],
      backend: [],
    },
    github: "https://github.com/nexstack-AI",
    live: "https://github.com/nexstack-AI",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            LLM Agent · 自动化运营 · 进行中
          </TypographyP>
          <TypographyP className="font-mono">
            基于 LLM 架构的自动化运营工具，探索 AI 在内容策略、情报采集、数据监控等业务场景的落地应用，
            替代低质灰产工具，构建安全合规的智能运营体系。
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">核心模块</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>设计并实现 Agent 核心架构，涵盖情报采集、内容策略生成、安全风控等模块</li>
            <li>集成 LLM API 实现智能内容分析与策略推荐，结合数据监控形成闭环运营</li>
            <li>研究 Agent 验证系统、记忆机制、工具调用等核心能力</li>
          </ul>
        </div>
      );
    },
  },
  {
    id: "local-ai",
    category: "AI 个人项目",
    title: "本地 AI 智能大脑",
    src: "/assets/projects-screenshots/portfolio/project.png",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
      ],
      backend: [],
    },
    github: "https://github.com/nexstack-AI",
    live: "https://github.com/nexstack-AI",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            本地 LLM · Agent 进化 · 进行中
          </TypographyP>
          <TypographyP className="font-mono">
            基于本地大模型的 AI 系统，探索多理论融合的验证引擎与 Agent 进化架构，
            实现离线环境下的智能推理与自主学习能力。
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">核心能力</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>搭建 Ollama 本地 LLM 推理环境（qwen2.5、deepseek-r1），开发 Web 端交互界面</li>
            <li>设计 Agent 验证系统（Verified Brain）与进化架构，探索 AI 自主决策能力</li>
            <li>开发语音 AI 应用，集成多理论验证引擎实现离线智能推理</li>
          </ul>
        </div>
      );
    },
  },
];
export default projects;