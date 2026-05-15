"use client";
import React from "react";
import { motion } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { SKILLS, SkillNames } from "@/data/constants";

const allSkills = Object.values(SKILLS);
const half = Math.ceil(allSkills.length / 2);
const leftSkills = allSkills.slice(0, half);
const rightSkills = allSkills.slice(half);

// Shared grid classes for both sides
const gridClasses =
  "pointer-events-auto grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-2.5 max-w-[240px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] w-full";

const renderSkillCard = (skill: (typeof allSkills)[0], idx: number) => (
  <motion.div
    key={skill.name}
    initial={{ opacity: 0, scale: 0.7 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: idx * 0.03, ease: "easeOut" }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.08, y: -2, transition: { duration: 0.15, ease: "easeOut" } }}
    className="group relative flex flex-col items-center gap-1.5 p-2.5 md:p-3 rounded-xl
      bg-white/[0.02] dark:bg-white/[0.02] backdrop-blur-sm
      border border-white/[0.04] hover:border-orange-500/20
      hover:bg-white/[0.06] dark:hover:bg-white/[0.05]
      transition-all duration-300 cursor-default"
  >
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-[0.06] transition-all duration-500 blur-xl pointer-events-none"
      style={{ backgroundColor: skill.color }} />
    <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 transition-all duration-500 blur-lg"
        style={{ backgroundColor: skill.color }} />
      <img src={skill.icon} alt={skill.label}
        className="relative w-6 h-6 md:w-7 md:h-7 object-contain opacity-75 group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(249,115,22,0.25)]"
        loading="lazy" />
    </div>
    <span className="text-[10px] sm:text-[11px] text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-tight font-medium max-w-[64px] truncate">
      {skill.label}
    </span>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] w-0 bg-orange-400/60 rounded-full group-hover:w-2/3 transition-all duration-500" />
  </motion.div>
);

const SkillsSection = () => {
  return (
    <SectionWrapper id="skills" className="w-full min-h-[150vh]">
      <SectionHeader id="skills" title="专业技能"  desc="按下键盘，查看技能详情"/>
      {/* Two-column layout: left + right grids flanking the 3D keyboard */}
      <div className="relative z-10 flex items-start justify-between px-12 md:px-24 lg:px-36 pt-8 md:pt-12">

        {/* Left skill grid — slides in from left off-screen */}
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className={gridClasses}
        >
          {leftSkills.map((skill, idx) => renderSkillCard(skill, idx))}
        </motion.div>

        {/* Right skill grid — slides in from right off-screen */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className={gridClasses}
        >
          {rightSkills.map((skill, idx) => renderSkillCard(skill, idx))}
        </motion.div>

      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;