"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Briefcase, Calendar, Code2, GraduationCap, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { config } from "@/data/config";

const skillCategories = [
  {
    title: "前端核心",
    icon: <Code2 className="w-5 h-5" />,
    skills: ["React", "TypeScript", "Taro", "Next.js", "Tailwind CSS", "HTML5/CSS3", "JavaScript ES6+", "Vue"],
  },
  {
    title: "AI 与开发工具",
    icon: <Sparkles className="w-5 h-5" />,
    skills: ["Cursor AI", "AI Agent 开发", "ComfyUI", "Stable Diffusion", "多模型协作", "MCP 协议"],
  },
  {
    title: "后端与数据",
    icon: <Briefcase className="w-5 h-5" />,
    skills: ["Node.js", "Express", "Java", "PostgreSQL", "MongoDB", "Firebase", "RESTful API"],
  },
  {
    title: "工程化",
    icon: <GraduationCap className="w-5 h-5" />,
    skills: ["Git", "Docker", "Webpack", "Vite", "CI/CD", "ECharts", "Nginx", "Linux"],
  },
];

const experience = [
  {
    period: "2015 - 至今",
    title: "高级前端开发工程师",
    company: "某科技公司",
    desc: "主导 30+ 大型项目前端架构设计，负责三端（PC · APP · 小程序）统一代码库建设，推动 AI 辅助开发流程落地。",
  },
  {
    period: "2013 - 2015",
    title: "前端开发工程师",
    company: "某互联网公司",
    desc: "负责多个 Web 应用和小程序前端开发，参与团队工程化规范建设。",
  },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen font-sans">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-500/3 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 pt-8 pb-24 max-w-4xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-orange-500 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              返回首页
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-orange-500" />
            <span className="text-orange-500 text-sm font-medium tracking-[0.2em] uppercase">
              Resume · 简历
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight mb-6">
            {config.author}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            全栈 Web 开发者 · 10 年+ 前端经验 · 30+ 大型项目交付
            <br />
            <span className="text-orange-500">React · TypeScript · Taro · AI 驱动开发</span>
          </p>

          {/* Contact strip */}
          <div className="flex flex-wrap gap-4 md:gap-8 mt-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              中国
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-500" />
              {config.email}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" />
              可邮件联系
            </span>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl md:text-3xl mb-8 flex items-center gap-3">
            <Code2 className="w-6 h-6 text-orange-500" />
            技能
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((cat) => (
              <div
                key={cat.title}
                className="border border-border/50 rounded-xl p-6 bg-card/20 backdrop-blur-sm"
              >
                <h3 className="font-semibold text-base mb-4 flex items-center gap-2 text-orange-500">
                  {cat.icon}
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-orange-500/20 text-muted-foreground bg-orange-500/5 rounded-full px-3"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl md:text-3xl mb-8 flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-orange-500" />
            工作经历
          </h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="border border-border/50 rounded-xl p-6 bg-card/20 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500/30" />
                <div className="flex items-center gap-3 text-sm text-orange-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  {exp.period}
                </div>
                <h3 className="font-semibold text-lg mb-1">{exp.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sm text-muted-foreground border-t border-border/50 pt-8"
        >
          <p>感谢您花时间阅读我的简历。期待与您合作 🤝</p>
          <p className="mt-2">
            <Link href={`mailto:${config.email}`} className="text-orange-500 hover:underline">
              {config.email}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}