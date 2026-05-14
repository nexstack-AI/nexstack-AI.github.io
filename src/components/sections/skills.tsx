"use client";
import React from "react";
import { motion } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { SKILLS, SkillNames } from "@/data/constants";

const allSkills = Object.values(SKILLS);

const SkillsSection = () => {
  return (
    <SectionWrapper id="skills" className="w-full min-h-[150vh]">
      <SectionHeader id="skills" title="专业技能" />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center text-sm text-muted-foreground/60 -mt-1 mb-6 tracking-wide"
      >
        按下键盘，查看技能详情
      </motion.p>

      <div className="relative z-10 flex justify-end px-4 md:px-8 pt-8 md:pt-12">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="pointer-events-auto grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 md:gap-3 max-w-[480px] md:max-w-[520px] lg:max-w-[640px] xl:max-w-[720px] w-full"
        >
          {allSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: idx * 0.03,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.08,
                y: -2,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
              className="group relative flex flex-col items-center gap-1.5 p-2.5 md:p-3 rounded-xl
                bg-white/[0.02] dark:bg-white/[0.02]
                backdrop-blur-sm
                border border-white/[0.04]
                hover:border-orange-500/20
                hover:bg-white/[0.06] dark:hover:bg-white/[0.05]
                transition-all duration-300 cursor-default"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-[0.06] transition-all duration-500 blur-xl pointer-events-none"
                style={{ backgroundColor: skill.color }}
              />

              <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 transition-all duration-500 blur-lg"
                  style={{ backgroundColor: skill.color }}
                />
                <img
                  src={skill.icon}
                  alt={skill.label}
                  className="relative w-6 h-6 md:w-7 md:h-7 object-contain opacity-75 group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(249,115,22,0.25)]"
                  loading="lazy"
                />
              </div>

              <span className="text-[10px] sm:text-[11px] text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-tight font-medium max-w-[64px] truncate">
                {skill.label}
              </span>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] w-0 bg-orange-400/60 rounded-full group-hover:w-2/3 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;