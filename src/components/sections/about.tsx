"use client";
import React from "react";
import { motion } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";
import { Code2, Layers, Palette, Zap } from "lucide-react";

const highlights = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "全栈能力",
    desc: "前端 React/Taro + 后端 Node.js/Java，能独立完成全流程项目交付",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "三端合一",
    desc: "PC · APP · 小程序统一代码库，85%+ 代码复用率，6年+ 稳定迭代",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "数据可视化",
    desc: "ECharts 大屏看板独立交付，Canvas/WebGL 3D 渲染技术探索",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "工程化思维",
    desc: "模块化 · 组件化 · 规范化，从 0 搭建前端工程体系，注重性能与可维护性",
  },
];

const AboutSection = () => {
  return (
    <SectionWrapper id="about" className="w-full min-h-screen py-20">
      <SectionHeader
        id="about"
        title="关于我"
        desc="ABOUT ME"
        className="mb-12 md:mb-20"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-12">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            13 年工作经验，10 年+ 前端开发经验。
            <br className="hidden md:block" />
            专注于
            <span className="text-orange-500 font-semibold"> React + TypeScript + Taro </span>
            技术栈，
            <br className="hidden md:block" />
            主导 30+ 大型项目，从需求分析到上线交付全流程独立负责。
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={cn(
                "group flex gap-4 p-6 rounded-2xl",
                "bg-white/[0.02] dark:bg-white/[0.02] backdrop-blur-sm",
                "border border-white/[0.04] hover:border-orange-500/15",
                "transition-all duration-300"
              )}
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500/20 transition-colors duration-300">
                {item.icon}
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-semibold text-foreground">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-white/[0.04]"
        >
          {[
            { num: "13年", label: "工作经验" },
            { num: "30+", label: "大型项目" },
            { num: "6年+", label: "核心产品迭代" },
            { num: "三端", label: "统一交付能力" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-bold text-orange-500 font-display">
                {stat.num}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;