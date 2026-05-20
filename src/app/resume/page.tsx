"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { ArrowLeft, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResumePage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background font-sans relative">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-orange-500/[0.03] blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-500/[0.02] blur-[80px]" />
      </div>

      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border/30">
        <div className="container mx-auto px-4 h-14 max-w-6xl flex items-center justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-orange-500 group -ml-2"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="hidden sm:inline">返回首页</span>
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-foreground">个人简历</span>
          </div>

          {/* Privacy note — replaces download button */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">仅在线浏览</span>
          </div>
        </div>
      </div>

      {/* PDF viewer */}
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-4 py-4 max-w-6xl"
        >
          <div className="rounded-xl overflow-hidden border border-border/40 shadow-sm bg-white/5">
            <iframe
              src="/resume.pdf#toolbar=0&navpanes=0"
              className="w-full"
              style={{ height: "calc(100vh - 88px)", minHeight: "700px", border: "none" }}
              title="个人简历"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}